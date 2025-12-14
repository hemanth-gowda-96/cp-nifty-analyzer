package main

import (
	"backend-go-fiber/routes"
	"log"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	routes.RegisterRoutes(app)

	log.Fatal(app.Listen(":3000"))
}
