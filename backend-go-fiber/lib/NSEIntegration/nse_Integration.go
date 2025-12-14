package NSEIntegration

import (
	"backend-go-fiber/config"
	resty "backend-go-fiber/lib/HttpHelper/Resty"
	sharedTypes "backend-go-fiber/shared/types"
	"encoding/json"
	"fmt"
	"time"
)

func GetNesOptionChainLive() sharedTypes.ServiceResponse {

	url := config.NESURL + getExpiryDateParam()

	// Here you would typically make an HTTP GET request to the URL
	nesResponse, err := resty.Get(url, nil, nil)

	if err != nil {
		return sharedTypes.ServiceResponse{
			Code:    "E001",
			Message: err.Error(),
			Data:    err,
			Error:   err,
		}
	}

	if nesResponse.StatusCode() != 200 {
		return sharedTypes.ServiceResponse{
			Code:    fmt.Sprintf("E%d", nesResponse.StatusCode()),
			Message: "Failed to fetch data from NSE",
			Data:    nesResponse.String(),
			Error:   fmt.Errorf("HTTP Status Code: %d", nesResponse.StatusCode()),
		}
	}

	// get response body as type NSEResponse
	var nseResp NSEResponse
	if err := json.Unmarshal(nesResponse.Body(), &nseResp); err != nil {
		return sharedTypes.ServiceResponse{
			Code:    "E002",
			Message: "Failed to parse NSE response",
			Data:    nesResponse.String(),
			Error:   err,
		}
	}

	fmt.Println("NSE Option Chain Live Data fetched successfully")
	fmt.Println("Expiry Date:", getExpiryDateParam())
	fmt.Println("Data Timestamp:", nseResp.Records.Timestamp)

	return sharedTypes.ServiceResponse{
		Code:    "200",
		Message: "Success",
		Data:    nseResp,
		Error:   nil,
	}
}

func getExpiryDateParam() string {
	// Calculate next Tuesday in IST (UTC+5:30)
	loc, _ := time.LoadLocation("Asia/Kolkata")
	nowIST := time.Now().In(loc)
	dayOfWeek := nowIST.Weekday()
	daysUntilNextTuesday := (time.Tuesday - dayOfWeek + 7) % 7
	// If today is Tuesday, use today
	if dayOfWeek == time.Tuesday {
		daysUntilNextTuesday = 0
	}
	expiry := nowIST.AddDate(0, 0, int(daysUntilNextTuesday))
	day := expiry.Day()
	year := expiry.Year()
	monthNames := []string{
		"Jan", "Feb", "Mar", "Apr", "May", "Jun",
		"Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
	}
	month := monthNames[expiry.Month()-1]
	return fmt.Sprintf("%02d-%s-%d", day, month, year)
}
