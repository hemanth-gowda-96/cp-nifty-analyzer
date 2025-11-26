import { APIResponseType } from "@/app/lib/types/response/serviceResponseType";
import { stringifyWithBigInt } from "@/lib/utils/serialization";
import { getNseOptionChainService } from "./service";

/**
 * @swagger
 * /api/get-nse-option-chain:
 *   get:
 *     summary: Get NSE Option Chain Data from Database
 *     description: Fetches stored NSE option chain data and calculations from the database
 *     tags:
 *       - NSE Data
 *       - Database
 *     responses:
 *       200:
 *         description: Successfully retrieved option chain data from database
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/APIResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         totOIRatio:
 *                           type: number
 *                           format: float
 *                           description: Total Open Interest Ratio (PE/CE)
 *                           example: 0.64
 *                         records:
 *                           type: array
 *                           description: Historical OI ratio records from database
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                                 description: Record ID
 *                               ce_total_oi:
 *                                 type: integer
 *                                 format: int64
 *                                 description: Total Call Option Open Interest
 *                               pe_total_oi:
 *                                 type: integer
 *                                 format: int64
 *                                 description: Total Put Option Open Interest
 *                               ratio:
 *                                 type: number
 *                                 format: float
 *                                 description: PE/CE OI Ratio
 *                               last_fetched_date:
 *                                 type: string
 *                                 format: date-time
 *                                 description: When the data was originally fetched from NSE
 *                               created_date:
 *                                 type: string
 *                                 format: date-time
 *                                 description: When the record was created in database
 *             example:
 *               code: "S001"
 *               message: "Data retrieved successfully from database"
 *               data:
 *                 totOIRatio: 0.64
 *                 records:
 *                   - id: "clxyz123abc"
 *                     ce_total_oi: 1392755
 *                     pe_total_oi: 2163298
 *                     ratio: 0.64
 *                     last_fetched_date: "2025-11-26T15:30:00.000Z"
 *                     created_date: "2025-11-26T15:36:17.943Z"
 *       500:
 *         description: Server error - Database query failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/APIResponse'
 *             example:
 *               code: "E001"
 *               message: "Database query failed"
 *               data: null
 */
export async function GET(): Promise<Response> {
  // get data from getOptionChainIndices
  const response: APIResponseType<any> =
    await getNseOptionChainService.getNseOptionChainDbService();

  // Determine HTTP status based on response code
  const getHttpStatus = (code: string): number => {
    if (code.startsWith("S")) return 200; // Success codes
    if (code.startsWith("E")) return 500; // Error codes
    return 200; // Default to success
  };

  return new Response(stringifyWithBigInt(response), {
    status: getHttpStatus(response.code),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
