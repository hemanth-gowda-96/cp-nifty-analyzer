package sqlite

import (
	"backend-go-fiber/config"
	"backend-go-fiber/models"
	"log"
	"os"
	"sync"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	_ "modernc.org/sqlite" // Pure Go SQLite driver
)

var (
	db   *gorm.DB
	once sync.Once
)

// InitDB initializes the database connection and performs migrations
func InitDB() (*gorm.DB, error) {
	var err error

	once.Do(func() {
		// Use pure Go SQLite driver (modernc.org/sqlite) instead of CGO-based driver
		db, err = gorm.Open(sqlite.Dialector{
			DriverName: "sqlite",
			DSN:        config.DOCUMENTS_PATH + string(os.PathSeparator) + config.AppName + ".db",
		}, &gorm.Config{})

		if err != nil {
			log.Printf("failed to connect database: %v", err)
			return
		}

		// Auto migrate all models
		err = db.AutoMigrate(
			&models.NSEOCTotalOIRatio{},
			&models.NSECallNPutOIRations{},
			&models.HealthCheck{},
		)

		if err != nil {
			log.Printf("failed to migrate database: %v", err)
			return
		}

		// Create health check record if it doesn't exist
		if db.Select("1=1").Find(&models.HealthCheck{}).RowsAffected < 1 {
			db.Create(&models.HealthCheck{})
		}

		// Verify database connection
		if db.Select("1=1").Find(&models.HealthCheck{}).RowsAffected < 1 {
			log.Printf("failed to verify database connection")
			err = gorm.ErrInvalidDB
			return
		}

		log.Println("Database initialized successfully")
	})

	return db, err
}

// GetDB returns the database instance
// If the database is not initialized, it will initialize it
func GetDB() *gorm.DB {
	if db == nil {
		var err error
		db, err = InitDB()
		if err != nil {
			log.Fatal("failed to get database instance: ", err)
		}
	}
	return db
}

// CloseDB closes the database connection
func CloseDB() error {
	if db != nil {
		sqlDB, err := db.DB()
		if err != nil {
			return err
		}
		return sqlDB.Close()
	}
	return nil
}
