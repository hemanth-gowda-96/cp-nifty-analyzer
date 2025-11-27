import { APIResponseType } from "@/app/lib/types/response/serviceResponseType";
import { stringifyWithBigInt } from "@/lib/utils/serialization";
import { getNseCallNPutServices } from "./service";

export async function GET(): Promise<Response> {
  // get data from getOptionChainIndices
  const response: APIResponseType<any> =
    await getNseCallNPutServices.getNseCallNPutService();

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
