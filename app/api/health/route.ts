// app/api/health/route.ts
import { getAppHealth } from "@/lib/startup/init";

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health Check
 *     description: Returns the API and database health status
 *     tags:
 *       - System
 *     responses:
 *       200:
 *         description: API health status
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/APIResponse'
 *             example:
 *               code: "S001"
 *               message: "API is healthy"
 *               data:
 *                 api:
 *                   status: "ok"
 *                   timestamp: "2024-11-26T12:00:00Z"
 *                 database:
 *                   isConnected: true
 *                   lastChecked: "2024-11-26T12:00:00Z"
 *       503:
 *         description: Service unavailable - Database issues
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/APIResponse'
 *             example:
 *               code: "E002"
 *               message: "Database connection failed"
 *               data:
 *                 api:
 *                   status: "degraded"
 *                   timestamp: "2024-11-26T12:00:00Z"
 *                 database:
 *                   isConnected: false
 *                   lastChecked: "2024-11-26T12:00:00Z"
 */
export async function GET(): Promise<Response> {
  const health = getAppHealth();

  const isHealthy = health.database.isConnected;

  const response = {
    code: isHealthy ? "S001" : "E002",
    message: isHealthy ? "API is healthy" : "Database connection failed",
    data: {
      api: {
        status: isHealthy ? "ok" : "degraded",
        timestamp: health.timestamp.toISOString(),
      },
      database: {
        isConnected: health.database.isConnected,
        lastChecked: health.database.lastChecked?.toISOString() || null,
      },
    },
  };

  return new Response(JSON.stringify(response), {
    status: isHealthy ? 200 : 503,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
