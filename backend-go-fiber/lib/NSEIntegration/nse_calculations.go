package NSEIntegration

import (
	"math"
	"sort"
)

func GetTotOIRatio(data NSEResponse) (float64, error) {

	totOICE := data.Filtered.CE.TotOI
	totOIPE := data.Filtered.PE.TotOI

	totOIRatio := float64(totOIPE) / float64(totOICE)

	return totOIRatio, nil
}

func Get8StrickObjects(data NSEResponse) ([]StrikePriceData, error) {
	strikePrices := data.Records.UnderlyingValue
	roundedStrikePrice := getStrikePriceRoundoff(strikePrices)
	strickObjects := data.Filtered.Data

	type strikeWithDiff struct {
		StrikePriceData
		Diff float64
	}

	var strikeObjectsWithDiff []strikeWithDiff
	for _, obj := range strickObjects {
		diff := math.Abs(obj.StrikePrice - roundedStrikePrice)

		// Convert NSEOptionData to StrikePriceData
		strikePriceData := StrikePriceData{
			StrikePrice: obj.StrikePrice,
			ExpiryDate:  obj.ExpiryDates,
			CE:          convertNSEOptionLegToOptionData(obj.CE),
			PE:          convertNSEOptionLegToOptionData(obj.PE),
		}

		strikeObjectsWithDiff = append(strikeObjectsWithDiff, strikeWithDiff{
			StrikePriceData: strikePriceData,
			Diff:            diff,
		})
	}

	sort.Slice(strikeObjectsWithDiff, func(i, j int) bool {
		return strikeObjectsWithDiff[i].Diff < strikeObjectsWithDiff[j].Diff
	})

	numToTake := 9 // Return 9 objects to match frontend implementation
	if len(strikeObjectsWithDiff) < numToTake {
		numToTake = len(strikeObjectsWithDiff)
	}

	nearestStrikes := make([]StrikePriceData, numToTake)
	for i := 0; i < numToTake; i++ {
		nearestStrikes[i] = strikeObjectsWithDiff[i].StrikePriceData
	}

	return nearestStrikes, nil
}

func GetCallPutsRatios(data []StrikePriceData) (CallPutsRatios, error) {
	var sumOiCe float64
	var sumOiPe float64
	var sumChangeInOiCe float64
	var sumChangeInOiPe float64

	for _, obj := range data {
		if obj.CE != nil {
			sumOiCe += obj.CE.OpenInterest
			sumChangeInOiCe += obj.CE.ChangeInOpenInterest
		}
		if obj.PE != nil {
			sumOiPe += obj.PE.OpenInterest
			sumChangeInOiPe += obj.PE.ChangeInOpenInterest
		}
	}

	grandtotalOi := sumOiCe + sumOiPe
	grandtotalChangeInOi := sumChangeInOiCe + sumChangeInOiPe

	var ratioOiCe float64
	var ratioOiPe float64
	if grandtotalOi != 0 {
		ratioOiCe = (float64(sumOiCe) / float64(grandtotalOi)) * 100
		ratioOiPe = (float64(sumOiPe) / float64(grandtotalOi)) * 100
	}

	var ratioChangeInOiCe float64
	var ratioChangeInOiPe float64
	if grandtotalChangeInOi != 0 {
		ratioChangeInOiCe = (float64(sumChangeInOiCe) / float64(grandtotalChangeInOi)) * 100
		ratioChangeInOiPe = (float64(sumChangeInOiPe) / float64(grandtotalChangeInOi)) * 100
	}

	return CallPutsRatios{
		SumOiCe:           sumOiCe,
		SumOiPe:           sumOiPe,
		SumChangeInOiCe:   sumChangeInOiCe,
		SumChangeInOiPe:   sumChangeInOiPe,
		RatioOiCe:         ratioOiCe,
		RatioOiPe:         ratioOiPe,
		RatioChangeInOiCe: ratioChangeInOiCe,
		RatioChangeInOiPe: ratioChangeInOiPe,
	}, nil
}

// Helper methods

func getStrikePriceRoundoff(price float64) float64 {
	// round off to nearest 50
	return math.Round(price/50) * 50
}

// convertNSEOptionLegToOptionData converts NSEOptionLeg to OptionData
func convertNSEOptionLegToOptionData(leg *NSEOptionLeg) *OptionData {
	if leg == nil {
		return nil
	}

	return &OptionData{
		StrikePrice:           leg.StrikePrice,
		ExpiryDate:            leg.ExpiryDate,
		Underlying:            leg.Underlying,
		Identifier:            leg.Identifier,
		OpenInterest:          leg.OpenInterest,
		ChangeInOpenInterest:  leg.ChangeInOpenInterest,
		PChangeInOpenInterest: leg.PChangeInOpenInterest,
		TotalTradedVolume:     leg.TotalTradedVolume,
		ImpliedVolatility:     leg.ImpliedVolatility,
		LastPrice:             leg.LastPrice,
		Change:                leg.Change,
		PChange:               leg.PChange,
		TotalBuyQuantity:      leg.TotalBuyQuantity,
		TotalSellQuantity:     leg.TotalSellQuantity,
		BidQty:                leg.BuyQuantity1,
		BidPrice:              leg.BuyPrice1,
		AskQty:                leg.SellQuantity1,
		AskPrice:              leg.SellPrice1,
		UnderlyingValue:       leg.UnderlyingValue,
	}
}
