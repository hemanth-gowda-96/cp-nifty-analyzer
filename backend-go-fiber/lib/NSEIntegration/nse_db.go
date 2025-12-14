package NSEIntegration

import (
	"backend-go-fiber/models"
	"time"

	"gorm.io/gorm"
)

func SaveTotOIRatio(db *gorm.DB, ce_total_oi, pe_total_oi, underlying_value float64, last_fetched_date time.Time, ratio float64) error {
	record := models.NSEOCTotalOIRatio{
		CETotalOI:       int64(ce_total_oi),
		PETotalOI:       int64(pe_total_oi),
		UnderlyingValue: underlying_value,
		LastFetchedDate: last_fetched_date,
		Ratio:           ratio,
	}

	result := db.Create(&record)
	return result.Error
}

func SaveCallPutsRatios(db *gorm.DB, data NSEResponse) error {
	// Extract the necessary data from NSEResponse
	// TODO: Implement the calculation logic based on your NSEResponse structure
	// to calculate the sums and ratios for OI and Change in OI

	record := models.NSECallNPutOIRations{
		UnderlyingValue: data.Records.UnderlyingValue,
		LastFetchedDate: time.Now(), // Use current time or parse data.Records.Timestamp if needed
		// TODO: Add calculations for these fields:
		// SumOICe:           calculateSumOICe(data),
		// SumOIPe:           calculateSumOIPe(data),
		// SumChangeInOICe:   calculateSumChangeInOICe(data),
		// SumChangeInOIPe:   calculateSumChangeInOIPe(data),
		// RatioOICe:         calculateRatioOICe(data),
		// RatioOIPe:         calculateRatioOIPe(data),
		// RatioChangeInOICe: calculateRatioChangeInOICe(data),
		// RatioChangeInOIPe: calculateRatioChangeInOIPe(data),
	}

	result := db.Create(&record)
	return result.Error
}
