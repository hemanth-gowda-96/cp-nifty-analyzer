package main

import (
	sqlite "backend-go-fiber/lib/Sqlite"
	"backend-go-fiber/routes"
	"backend-go-fiber/utils/scheduler"
	"embed"
	"log"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/filesystem"
)

//go:embed all:static
var embedDirStatic embed.FS

func main() {
	// Initialize database
	_, err := sqlite.InitDB()
	if err != nil {
		log.Fatal("failed to initialize database: ", err)
	}

	// Initialize and start the scheduler
	schedulerConfig := scheduler.SchedulerConfig{
		IntervalSeconds: 30,   // Configurable interval in seconds
		RunOnStart:      true, // Run immediately on start
	}
	nseScheduler := scheduler.NewScheduler(schedulerConfig)
	nseScheduler.Start()
	log.Println("NSE data scheduler initialized and started")

	app := fiber.New()

	// Configure CORS
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000,http://localhost:3005",
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
		AllowMethods: "GET, POST, PUT, DELETE, OPTIONS",
	}))

	// Register API routes first (they take precedence)
	routes.RegisterRoutes(app)

	// Serve static files from embedded fs
	app.Use("/", filesystem.New(filesystem.Config{
		Root:       http.FS(embedDirStatic),
		PathPrefix: "static",
		Browse:     false,
	}))

	// Fallback to index.html for client-side routing (SPA)
	app.Use(func(c *fiber.Ctx) error {
		// If the route is not found and doesn't start with /api, serve index.html from embed
		if c.Path() != "/" && !fiber.IsChild() {
			file, err := embedDirStatic.ReadFile("static/index.html")
			if err != nil {
				return c.Status(500).SendString("Index not found")
			}
			c.Set("Content-Type", "text/html")
			return c.Send(file)
		}
		return c.Next()
	})

	log.Println("Serving bundled Next.js static files")
	log.Fatal(app.Listen(":3005"))
}
