package routes

import (
	sharedTypes "backend-go-fiber/shared/types"

	nseIntegration "backend-go-fiber/lib/NSEIntegration"
	sqlite "backend-go-fiber/lib/Sqlite"

	"github.com/gofiber/fiber/v2"
)

func RegisterRoutes(app *fiber.App) {
	app.Get("/api/get-call-put-ratios", func(c *fiber.Ctx) error {

		result, err := sqlite.GetLast8TotalOIRatios()
		if err != nil {
			return c.JSON(sharedTypes.ApiResponse{
				Code:    "500",
				Message: "Internal Server Error",
				Data:    "Error fetching call and put ratios",
			})
		}

		response := map[string]interface{}{
			"records": result,
			"count":   len(result),
		}

		resp := sharedTypes.ApiResponse{
			Code:    "S001",
			Message: "Success",
			Data:    response,
		}
		return c.JSON(resp)
	})

	app.Get("/api/get-nse-option-chain", func(c *fiber.Ctx) error {

		result, err := sqlite.GetLatestCallPutOIRatios()
		if err != nil {
			return c.JSON(sharedTypes.ApiResponse{
				Code:    "500",
				Message: "Internal Server Error",
				Data:    "Error fetching call and put ratios",
			})
		}

		response := map[string]interface{}{
			"records": result,
			"count":   len(result),
		}

		resp := sharedTypes.ApiResponse{
			Code:    "S001",
			Message: "Success",
			Data:    response,
		}
		return c.JSON(resp)
	})

	app.Get("/api/get-nse-option-chain-live", func(c *fiber.Ctx) error {

		result := nseIntegration.GetNesOptionChainLive()

		resp := sharedTypes.ApiResponse{
			Code:    result.Code,
			Message: result.Message,
			Data:    result.Data,
		}
		return c.JSON(resp)
	})

	app.Get("/health", func(c *fiber.Ctx) error {
		resp := sharedTypes.ApiResponse{
			Code:    "200",
			Message: "Success",
			Data:    "health endpoint",
		}
		return c.JSON(resp)
	})
}
