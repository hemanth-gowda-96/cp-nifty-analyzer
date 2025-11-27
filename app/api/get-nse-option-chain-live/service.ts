import {
  get8StrickObjects,
  getTotOIRatio,
} from "@/app/lib/services/calculations/calculations";
import { getOptionChainIndices } from "@/app/lib/services/nseindia";
import { NSEOptionChainResponse } from "@/app/lib/types/nseindia/nseindiaType";
import { APIResponseType } from "@/app/lib/types/response/serviceResponseType";
import { DateTimeUtils } from "@/lib/datetime/datetimeUtils";
import { NSEOCTotalOIRatio } from "@/lib/generated/prisma/client";
import { DatabaseHealth } from "@/lib/database/health";
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

  const nearest8StrickObjects = get8StrickObjects(response.data);

  console.log("Nearest 8 Strike Objects:", nearest8StrickObjects);

  // save to database

  let lastFetched = NSEOptionChainData.records.timestamp;

  // convert lastFetched to Date object with error handling
  let lastFetchedDate: Date;
  try {
    lastFetchedDate = DateTimeUtils.convertToISOString(lastFetched);
  } catch (error) {
    console.error("Error parsing timestamp:", lastFetched, error);
    // Fallback to current date if parsing fails
    lastFetchedDate = new Date();
  }

  // Save to database with real-time connection check
  console.log("🔍 Attempting to save to database...");

  try {
    // Try to save directly - this will test the connection in real-time
    const resp = await prisma.nSEOCTotalOIRatio.create({
      data: {
        ce_total_oi: NSEOptionChainData.filtered.CE.totOI,
        pe_total_oi: NSEOptionChainData.filtered.PE.totOI,
        last_fetched_date: lastFetchedDate, // Use Date object directly
        ratio: totRatio.totOIRatio,
        // created_date and last_updated_date will be handled by Prisma defaults
      },
    });
    console.log("✅ Successfully saved NSEOCTotalOIRatio:", resp.id);

    // Update health status to connected on successful save
    DatabaseHealth.checkConnection();
  } catch (dbError) {
    console.error("❌ Database save failed:", dbError);

    // Check if it's a connection error
    if (dbError instanceof Error) {
      if (
        dbError.message.includes("ECONNREFUSED") ||
        dbError.message.includes("connect") ||
        dbError.message.includes("timeout")
      ) {
        console.warn(
          "🔌 Database connection issue detected. Please ensure PostgreSQL is running:"
        );
        console.warn("   Run: docker-compose up -d postgres");
        console.warn("   Or: npm run db:start");
      }
    }

    // Trigger a health check to update status
    await DatabaseHealth.checkConnection();

    // Continue execution - don't fail the API call due to DB issues
    console.log("📡 Continuing API execution without database save");
  }

  return {
    code: "S001",
    message: "Data fetched successfully",
    data: totRatio,
  } as APIResponseType<any>;
}

export { getOptionChainIndicesService };
