import { getTotOIRatio } from "@/app/lib/services/calculations/calculations";
import { getOptionChainIndices } from "@/app/lib/services/nseindia";
import { NSEOptionChainResponse } from "@/app/lib/types/nseindia/nseindiaType";
import { APIResponseType } from "@/app/lib/types/response/serviceResponseType";

async function getOptionChainIndicesService(): Promise<APIResponseType<any>> {
  // get data from getOptionChainIndices
  const response: APIResponseType<NSEOptionChainResponse> =
    await getOptionChainIndices();

  if (response.code !== "S001" || !response.data) {
    return response;
  }
  // get totratio
  const totRatio = getTotOIRatio(response.data);

  console.log("TOT OI RATIO:", totRatio.totOIRatio);

  // save to database

  return {
    code: "S001",
    message: "Data fetched successfully",
    data: totRatio,
  } as APIResponseType<any>;
}

export { getOptionChainIndicesService };
