// app/api/health/route.ts

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health Check
 *     description: Returns the API health status
 *     tags:
 *       - System
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/APIResponse'
 *             example:
 *               code: "S001"
 *               message: "API is healthy"
 *               data:
 *                 status: "ok"
 *                 timestamp: "2024-11-26T12:00:00Z"
 */
export async function GET(): Promise<Response> {
  const response = {
    code: "S001",
    message: "API is healthy",
    data: {
      status: "ok",
      timestamp: new Date().toISOString(),
    },
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
