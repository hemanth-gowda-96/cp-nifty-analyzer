package main

import (
	sqlite "backend-go-fiber/lib/Sqlite"
	"backend-go-fiber/routes"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	// Initialize database
	_, err := sqlite.InitDB()
	if err != nil {
		log.Fatal("failed to initialize database: ", err)
	}

	app := fiber.New()

	// Configure CORS
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000,http://localhost:3005",
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
		AllowMethods: "GET, POST, PUT, DELETE, OPTIONS",
	}))

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	routes.RegisterRoutes(app)

	log.Fatal(app.Listen(":3005"))
}
