// lib/swagger.ts
import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CP Nifty Analyzer API",
      version: "1.0.0",
      description:
        "API documentation for CP Nifty Analyzer - NSE Option Chain Analysis",
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? "https://your-domain.com"
            : "http://localhost:3000",
        description:
          process.env.NODE_ENV === "production"
            ? "Production server"
            : "Development server",
      },
    ],
    components: {
      schemas: {
        APIResponse: {
          type: "object",
          properties: {
            code: {
              type: "string",
              description: "Response code (S001 for success, E001 for error)",
            },
            message: {
              type: "string",
              description: "Human-readable response message",
            },
            data: {
              type: "object",
              nullable: true,
              description: "Response data or null if error",
            },
          },
          required: ["code", "message", "data"],
        },
        NSEOptionChainResponse: {
          allOf: [
            { $ref: "#/components/schemas/APIResponse" },
            {
              type: "object",
              properties: {
                data: {
                  type: "object",
                  nullable: true,
                  description: "NSE Option Chain data",
                  properties: {
                    records: {
                      type: "object",
                      properties: {
                        expiryDates: {
                          type: "array",
                          items: { type: "string" },
                          description: "Available expiry dates",
                        },
                        data: {
                          type: "array",
                          items: {
                            $ref: "#/components/schemas/StrikePriceData",
                          },
                          description: "Strike price data",
                        },
                        timestamp: {
                          type: "string",
                          description: "Data timestamp",
                        },
                        underlyingValue: {
                          type: "number",
                          description: "Current underlying value",
                        },
                        strikePrices: {
                          type: "array",
                          items: { type: "number" },
                          description: "Available strike prices",
                        },
                        index: { $ref: "#/components/schemas/IndexInfo" },
                      },
                    },
                    filtered: {
                      type: "object",
                      properties: {
                        data: {
                          type: "array",
                          items: {
                            $ref: "#/components/schemas/StrikePriceData",
                          },
                        },
                        CE: { $ref: "#/components/schemas/TotalOIVolume" },
                        PE: { $ref: "#/components/schemas/TotalOIVolume" },
                      },
                    },
                  },
                },
              },
            },
          ],
        },
        StrikePriceData: {
          type: "object",
          properties: {
            strikePrice: { type: "number" },
            expiryDate: { type: "string" },
            CE: { $ref: "#/components/schemas/OptionData" },
            PE: { $ref: "#/components/schemas/OptionData" },
          },
        },
        OptionData: {
          type: "object",
          properties: {
            strikePrice: { type: "number" },
            expiryDate: { type: "string" },
            underlying: { type: "string" },
            identifier: { type: "string" },
            openInterest: { type: "number" },
            changeinOpenInterest: { type: "number" },
            pchangeinOpenInterest: { type: "number" },
            totalTradedVolume: { type: "number" },
            impliedVolatility: { type: "number" },
            lastPrice: { type: "number" },
            change: { type: "number" },
            pChange: { type: "number" },
            totalBuyQuantity: { type: "number" },
            totalSellQuantity: { type: "number" },
            bidQty: { type: "number" },
            bidprice: { type: "number" },
            askQty: { type: "number" },
            askPrice: { type: "number" },
            underlyingValue: { type: "number" },
          },
        },
        IndexInfo: {
          type: "object",
          properties: {
            key: { type: "string" },
            index: { type: "string" },
            indexSymbol: { type: "string" },
            last: { type: "number" },
            variation: { type: "number" },
            percentChange: { type: "number" },
            open: { type: "number" },
            high: { type: "number" },
            low: { type: "number" },
            previousClose: { type: "number" },
            yearHigh: { type: "number" },
            yearLow: { type: "number" },
            pe: { type: "string" },
            pb: { type: "string" },
            dy: { type: "string" },
          },
        },
        TotalOIVolume: {
          type: "object",
          properties: {
            totOI: { type: "number", description: "Total Open Interest" },
            totVol: { type: "number", description: "Total Volume" },
          },
        },
      },
    },
  },
  apis: ["./app/api/**/*.ts"], // Path to the API files
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
