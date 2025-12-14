package main

import (
	sqlite "backend-go-fiber/lib/Sqlite"
	"backend-go-fiber/routes"
	"log"

	"github.com/gofiber/fiber/v2"
)

func main() {
	// Initialize database
	_, err := sqlite.InitDB()
	if err != nil {
		log.Fatal("failed to initialize database: ", err)
	}

	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	routes.RegisterRoutes(app)

	log.Fatal(app.Listen(":3000"))
}
