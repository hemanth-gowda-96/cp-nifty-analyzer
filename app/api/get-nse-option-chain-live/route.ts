import { APIResponseType } from "../../lib/types/response/serviceResponseType";
import { NSEOptionChainResponse } from "../../lib/types/nseindia/nseindiaType";
import { getOptionChainIndicesService } from "./service";

/**
 * @swagger
 * /api/get-nse-option-chain-live:
 *   get:
 *     summary: Get Live NSE Option Chain Data
 *     description: Fetches real-time option chain data for NIFTY index from NSE India with live updates
 *     tags:
 *       - NSE Data
 *       - Live Data
 *     responses:
 *       200:
 *         description: Successfully fetched live option chain data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NSEOptionChainResponse'
 *             example:
 *               code: "S001"
 *               message: "Data fetched successfully"
 *               data:
 *                 records:
 *                   expiryDates: ["02-Dec-2025", "09-Dec-2025", "16-Dec-2025"]
 *                   data: []
 *                   timestamp: "26-Nov-2025 15:30:00"
 *                   underlyingValue: 26205.3
 *                   strikePrices: [24000, 24050, 24100]
 *                   index:
 *                     indexSymbol: "NIFTY 50"
 *                     last: 26205.3
 *                     variation: 320.5
 *                     percentChange: 1.24
 *                 filtered:
 *                   data: []
 *                   CE:
 *                     totOI: 1392755
 *                     totVol: 26156564
 *                   PE:
 *                     totOI: 2163298
 *                     totVol: 21728172
 *       500:
 *         description: Server error - Failed to fetch live data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NSEOptionChainResponse'
 *             example:
 *               code: "E001"
 *               message: "Failed to fetch live data from NSE"
 *               data: null
 */
export async function GET(): Promise<Response> {
  // get data from getOptionChainIndices
  const response: APIResponseType<NSEOptionChainResponse> =
    await getOptionChainIndicesService();

  // Determine HTTP status based on response code
  const getHttpStatus = (code: string): number => {
    if (code.startsWith("S")) return 200; // Success codes
    if (code.startsWith("E")) return 500; // Error codes
    return 200; // Default to success
  };

  return new Response(JSON.stringify(response), {
    status: getHttpStatus(response.code),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
