import { getOptionChainIndices } from "../shared/services/nseindia";
import { APIResponseType } from "../shared/types/response/serviceResponseType";

/**
 * @swagger
 * /api/get-nse-option-chain:
 *   get:
 *     summary: Get NSE Option Chain Data
 *     description: Fetches option chain data for NIFTY index from NSE India
 *     tags:
 *       - NSE Data
 *     responses:
 *       200:
 *         description: Successfully fetched option chain data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NSEOptionChainResponse'
 *             example:
 *               code: "S001"
 *               message: "Data fetched successfully"
 *               data:
 *                 records:
 *                   expiryDates: ["26-Dec-2024", "02-Jan-2025"]
 *                   data: []
 *                 filtered:
 *                   data: []
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NSEOptionChainResponse'
 *             example:
 *               code: "E001"
 *               message: "Failed to fetch from NSE"
 *               data: null
 */
export async function GET(): Promise<Response> {
  // get data from getOptionChainIndices
  const response: APIResponseType<any> = await getOptionChainIndices();

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
