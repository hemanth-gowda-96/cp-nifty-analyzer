package NSEIntegration

import (
	sqlite "backend-go-fiber/lib/Sqlite"
	"backend-go-fiber/models"
	"time"
)

// SaveTotOIRatio saves the total OI ratio data to the database
func SaveTotOIRatio(ce_total_oi, pe_total_oi, underlying_value float64, last_fetched_date time.Time, ratio float64) error {
	return sqlite.SaveTotalOIRatio(ce_total_oi, pe_total_oi, underlying_value, last_fetched_date, ratio)
}

// SaveCallPutsRatios saves the call and put OI ratios data to the database
func SaveCallPutsRatios(data NSEResponse) error {
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

	return sqlite.SaveCallPutOIRatios(&record)
}
