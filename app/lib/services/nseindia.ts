// app/api/shared/services/nseindia.ts

import { NSEOptionChainResponse } from "../types/nseindia/nseindiaType";
import { APIResponseType } from "../types/response/serviceResponseType";

// Service to fetch NSE India option chain indices data
async function getOptionChainIndices(): Promise<APIResponseType<any>> {
  const url =
    "https://www.nseindia.com/api/option-chain-v3?type=Indices&symbol=NIFTY&expiry=" +
    getExpiryDateParam();

  try {
    const response = await fetch(url);
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

function getExpiryDateParam(): string {
  // output format: "dd-MMM-yyyy" ex: "29-Jan-2026"
  const now = new Date();

  // add 30 days
  const expiry = new Date(now);
  expiry.setDate(now.getDate() + 30);

  const day = String(expiry.getDate()).padStart(2, "0");
  const year = expiry.getFullYear();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[expiry.getMonth()];

  return `${day}-${month}-${year}`;
}

export { getOptionChainIndices };
