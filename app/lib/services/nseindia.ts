// app/api/shared/services/nseindia.ts

import { CONFIG } from "@/app/config/config";
import { NSEOptionChainResponse } from "../types/nseindia/nseindiaType";
import { APIResponseType } from "../types/response/serviceResponseType";

// Service to fetch NSE India option chain indices data
async function getOptionChainIndices(): Promise<APIResponseType<any>> {
  const url = CONFIG.NESURL + getExpiryDateParam();

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
  // Calculate next Tuesday in IST (UTC+5:30)
  const nowUTC = new Date();
  // Convert to IST
  const nowIST = new Date(nowUTC.getTime() + 5.5 * 60 * 60 * 1000);

  const dayOfWeek = nowIST.getDay();
  let daysUntilNextTuesday = (2 - dayOfWeek + 7) % 7;
  // If today is Tuesday, use today
  if (dayOfWeek === 2) {
    daysUntilNextTuesday = 0;
  }
  const expiry = new Date(nowIST);
  expiry.setDate(nowIST.getDate() + daysUntilNextTuesday);

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
