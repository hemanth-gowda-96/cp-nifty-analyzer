package sqlite

import (
	"backend-go-fiber/models"
	"time"
)

// SaveTotalOIRatio saves the total OI ratio data to the database
func SaveTotalOIRatio(ceTotalOI, peTotalOI, underlyingValue float64, lastFetchedDate time.Time, ratio float64) error {
	db := GetDB()

	record := models.NSEOCTotalOIRatio{
		CETotalOI:       int64(ceTotalOI),
		PETotalOI:       int64(peTotalOI),
		UnderlyingValue: underlyingValue,
		LastFetchedDate: lastFetchedDate,
		Ratio:           ratio,
	}

	result := db.Create(&record)
	return result.Error
}

// SaveCallPutOIRatios saves the call and put OI ratios data to the database
func SaveCallPutOIRatios(record *models.NSECallNPutOIRations) error {
	db := GetDB()
	result := db.Create(record)
	return result.Error
}

// GetLatestTotalOIRatio retrieves the latest total OI ratio record
func GetLatestTotalOIRatio() (*models.NSEOCTotalOIRatio, error) {
	db := GetDB()
	var record models.NSEOCTotalOIRatio

	result := db.Order("created_date DESC").First(&record)
	if result.Error != nil {
		return nil, result.Error
	}

	return &record, nil
}

// GetLatestCallPutOIRatios retrieves the latest call and put OI ratios record
func GetLatestCallPutOIRatios() (*models.NSECallNPutOIRations, error) {
	db := GetDB()
	var record models.NSECallNPutOIRations

	result := db.Order("created_date DESC").First(&record)
	if result.Error != nil {
		return nil, result.Error
	}

	return &record, nil
}

// GetTotalOIRatiosByDateRange retrieves total OI ratio records within a date range
func GetTotalOIRatiosByDateRange(startDate, endDate time.Time) ([]models.NSEOCTotalOIRatio, error) {
	db := GetDB()
	var records []models.NSEOCTotalOIRatio

	result := db.Where("created_date BETWEEN ? AND ?", startDate, endDate).
		Order("created_date DESC").
		Find(&records)

	if result.Error != nil {
		return nil, result.Error
	}

	return records, nil
}

// GetCallPutOIRatiosByDateRange retrieves call and put OI ratios records within a date range
func GetCallPutOIRatiosByDateRange(startDate, endDate time.Time) ([]models.NSECallNPutOIRations, error) {
	db := GetDB()
	var records []models.NSECallNPutOIRations

	result := db.Where("created_date BETWEEN ? AND ?", startDate, endDate).
		Order("created_date DESC").
		Find(&records)

	if result.Error != nil {
		return nil, result.Error
	}

	return records, nil
}

// DeleteOldRecords deletes records older than the specified number of days
func DeleteOldRecords(daysToKeep int) error {
	db := GetDB()
	cutoffDate := time.Now().AddDate(0, 0, -daysToKeep)

	// Delete old NSEOCTotalOIRatio records
	if err := db.Where("created_date < ?", cutoffDate).Delete(&models.NSEOCTotalOIRatio{}).Error; err != nil {
		return err
	}

	// Delete old NSECallNPutOIRations records
	if err := db.Where("created_date < ?", cutoffDate).Delete(&models.NSECallNPutOIRations{}).Error; err != nil {
		return err
	}

	return nil
}

// HealthCheck performs a database health check
func HealthCheck() error {
	db := GetDB()
	var healthCheck models.HealthCheck

	result := db.First(&healthCheck)
	return result.Error
}
