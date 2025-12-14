package config

import "os"

var (
	AppName = getEnv("APP_NAME", "NiftyAnalyzer")
)

func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}

var (
	NESURL = getEnv("NESURL", "https://www.nseindia.com/api/option-chain-v3?type=Indices&symbol=NIFTY&expiry=")
)

// usage
// config.NESURL
