package main

import (
	"backend-go-fiber/models"
	"backend-go-fiber/routes"
	"log"

	"github.com/gofiber/fiber/v2"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	_ "modernc.org/sqlite" // Pure Go SQLite driver
)

func main() {

	// Use pure Go SQLite driver (modernc.org/sqlite) instead of CGO-based driver
	db, err := gorm.Open(sqlite.Dialector{
		DriverName: "sqlite",
		DSN:        "gorm.db",
	}, &gorm.Config{})
	if err != nil {
		log.Fatal("failed to connect database: ", err)
	}

	db.AutoMigrate(&models.NSEOCTotalOIRatio{}, &models.NSECallNPutOIRations{}, &models.HealthCheck{})

	// create health check record
	db.Create(&models.HealthCheck{})

	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	routes.RegisterRoutes(app)

	log.Fatal(app.Listen(":3000"))
}
