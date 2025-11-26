import { getTotOIRatio } from "@/app/lib/services/calculations/calculations";
import { getOptionChainIndices } from "@/app/lib/services/nseindia";
import { NSEOptionChainResponse } from "@/app/lib/types/nseindia/nseindiaType";
import { APIResponseType } from "@/app/lib/types/response/serviceResponseType";
import { NSEOCTotalOIRatio } from "@/lib/generated/prisma/client";
import prisma from "@/lib/prisma";

async function getOptionChainIndicesService(): Promise<APIResponseType<any>> {
  // get data from getOptionChainIndices
  const response: APIResponseType<NSEOptionChainResponse> =
    await getOptionChainIndices();

  if (response.code !== "S001" || !response.data) {
    return response;
  }

  const NSEOptionChainData: NSEOptionChainResponse = response.data;
  // get totratio
  const totRatio = getTotOIRatio(response.data);

  // save to database

  const resp = await prisma.nSEOCTotalOIRatio.create({
    data: {
      ce_total_oi: NSEOptionChainData.filtered.CE.totOI,
      pe_total_oi: NSEOptionChainData.filtered.PE.totOI,
      last_fetched_date: NSEOptionChainData.records.timestamp,
      ratio: totRatio.totOIRatio,
      created_date: new Date(),
      last_updated_date: new Date(),
    },
  });

  console.log("Saved NSEOCTotalOIRatio:", resp);

  return {
    code: "S001",
    message: "Data fetched successfully",
    data: totRatio,
  } as APIResponseType<any>;
}

export { getOptionChainIndicesService };
