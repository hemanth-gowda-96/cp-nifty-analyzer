package routes

import (
	sharedTypes "backend-go-fiber/shared/types"

	nseIntegration "backend-go-fiber/lib/NSEIntegration"

	"github.com/gofiber/fiber/v2"
)

func RegisterRoutes(app *fiber.App) {
	app.Get("/get-call-put-ratios", func(c *fiber.Ctx) error {
		resp := sharedTypes.ApiResponse{
			Code:    "200",
			Message: "Success",
			Data:    "get-call-put-ratios endpoint",
		}
		return c.JSON(resp)
	})

	app.Get("/get-nse-option-chain", func(c *fiber.Ctx) error {
		resp := sharedTypes.ApiResponse{
			Code:    "200",
			Message: "Success",
			Data:    "get-nse-option-chain endpoint",
		}
		return c.JSON(resp)
	})

	app.Get("/get-nse-option-chain-live", func(c *fiber.Ctx) error {

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
