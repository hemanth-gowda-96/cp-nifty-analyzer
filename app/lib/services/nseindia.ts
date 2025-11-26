// app/api/shared/services/nseindia.ts

import { NSEOptionChainResponse } from "../types/nseindia/nseindiaType";
import { APIResponseType } from "../types/response/serviceResponseType";

// Service to fetch NSE India option chain indices data
async function getOptionChainIndices(): Promise<APIResponseType<any>> {
  try {
    const response = await fetch(
      "https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch from NSE");
    }
    const data = await response.json();
    return {
      code: "S001",
      message: "Data fetched successfully",
      data,
    } as APIResponseType<NSEOptionChainResponse>;
  } catch (error) {
    return {
      code: "E001",
      message: error instanceof Error ? error.message : "An error occurred",
      data: null,
    } as APIResponseType<any>;
  }
}

export { getOptionChainIndices };
