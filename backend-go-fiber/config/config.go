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
	DOCUMENTS_PATH = getDocumentsFolderPath()

	// NESURL is the URL for fetching Nifty option chain data
	NESURL = getEnv("NESURL", "https://www.nseindia.com/api/option-chain-v3?type=Indices&symbol=NIFTY&expiry=")
)

func getDocumentsFolderPath() string {
	homeDir, err := os.UserHomeDir()
	if err != nil {
		return ""
	}
	return homeDir + string(os.PathSeparator) + "Documents"
}

// usage
// config.NESURL
