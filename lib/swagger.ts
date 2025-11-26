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
                },
              },
            },
          ],
        },
      },
    },
  },
  apis: ["./app/api/**/*.ts"], // Path to the API files
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
