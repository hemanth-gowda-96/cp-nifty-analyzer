package NSEIntegration

type NSEOptionLeg struct {
	StrikePrice           float64 `json:"strikePrice"`
	ExpiryDate            string  `json:"expiryDate"`
	Underlying            string  `json:"underlying"`
	Identifier            string  `json:"identifier"`
	OpenInterest          float64 `json:"openInterest"`
	ChangeInOpenInterest  float64 `json:"changeinOpenInterest"`
	PChangeInOpenInterest float64 `json:"pchangeinOpenInterest"`
	TotalTradedVolume     float64 `json:"totalTradedVolume"`
	ImpliedVolatility     float64 `json:"impliedVolatility"`
	LastPrice             float64 `json:"lastPrice"`
	Change                float64 `json:"change"`
	TotalBuyQuantity      float64 `json:"totalBuyQuantity"`
	TotalSellQuantity     float64 `json:"totalSellQuantity"`
	BuyPrice1             float64 `json:"buyPrice1"`
	BuyQuantity1          float64 `json:"buyQuantity1"`
	SellPrice1            float64 `json:"sellPrice1"`
	SellQuantity1         float64 `json:"sellQuantity1"`
	UnderlyingValue       float64 `json:"underlyingValue"`
	OptionType            *string `json:"optionType"`
	PChange               float64 `json:"pchange"`
}

type NSEOptionData struct {
	ExpiryDates string        `json:"expiryDates"`
	CE          *NSEOptionLeg `json:"CE"`
	PE          *NSEOptionLeg `json:"PE"`
	StrikePrice float64       `json:"strikePrice"`
}

type NSECurrentRecords struct {
	Timestamp       string          `json:"timestamp"`
	UnderlyingValue float64         `json:"underlyingValue"`
	Data            []NSEOptionData `json:"data"`
	ExpiryDates     []string        `json:"expiryDates"`
	StrikePrices    []string        `json:"strikePrices"`
}

type NSEFilteredLegTotals struct {
	TotOI  float64 `json:"totOI"`
	TotVol float64 `json:"totVol"`
}

type NSEFiltered struct {
	Data []NSEOptionData      `json:"data"`
	CE   NSEFilteredLegTotals `json:"CE"`
	PE   NSEFilteredLegTotals `json:"PE"`
}

type NSEResponse struct {
	Records  NSECurrentRecords `json:"records"`
	Filtered NSEFiltered       `json:"filtered"`
}
