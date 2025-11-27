import {
  get8StrickObjects,
  getCallPutsRatios,
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
  // get last saved record from database
  const lastSavedRecord: NSEOCTotalOIRatio | null =
    await prisma.nSEOCTotalOIRatio.findFirst({
      orderBy: {
        created_date: "desc",
      },
    });

  // get last fetched date
  const lastFetchedDateFromDB = lastSavedRecord
    ? lastSavedRecord.last_fetched_date
    : null;

  // get data from getOptionChainIndices
  const response: APIResponseType<NSEOptionChainResponse> =
    await getOptionChainIndices();

  if (response.code !== "S001" || !response.data) {
    return response;
  }

  const NSEOptionChainData: NSEOptionChainResponse = response.data;

  // If last fetched date from DB matches the current fetched data, skip saving or less than current
  if (lastFetchedDateFromDB) {
    const fetchedDate = DateTimeUtils.convertToISOString(
      NSEOptionChainData.records.timestamp
    );

    if (fetchedDate <= lastFetchedDateFromDB) {
      console.log(
        "ℹ️ Fetched data is not newer than the last saved record. Skipping database save."
      );
      return {
        code: "S001",
        message: "Data fetched successfully - No new data to save to database",
        data: undefined,
      } as APIResponseType<any>;
    }
  }

  // get totratio
  const totRatio = getTotOIRatio(response.data);

  const nearest8StrickObjects = get8StrickObjects(response.data);

  const allRations = getCallPutsRatios(nearest8StrickObjects);

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

  try {
    // Try to save directly - this will test the connection in real-time
    const resp = await prisma.nSEOCTotalOIRatio.create({
      data: {
        ce_total_oi: NSEOptionChainData.filtered.CE.totOI,
        pe_total_oi: NSEOptionChainData.filtered.PE.totOI,
        underlying_value: NSEOptionChainData.records.underlyingValue,
        last_fetched_date: lastFetchedDate, // Use Date object directly
        ratio: totRatio.totOIRatio,
        // created_date and last_updated_date will be handled by Prisma defaults
      },
    });
    console.log("✅ Successfully saved NSEOCTotalOIRatio:", resp.id);

    // save call puts ratios as well
    const respRatios = await prisma.nSECallNPutOIRations.create({
      data: {
        sum_oi_ce: allRations.sum_oi_ce,
        sum_oi_pe: allRations.sum_oi_pe,
        sum_change_in_oi_ce: allRations.sum_change_in_oi_ce,
        sum_change_in_oi_pe: allRations.sum_change_in_oi_pe,
        ratio_oi_ce: allRations.ratio_oi_ce,
        ratio_oi_pe: allRations.ratio_oi_pe,
        ratio_change_in_oi_ce: allRations.ratio_change_in_oi_ce,
        ratio_change_in_oi_pe: allRations.ratio_change_in_oi_pe,
        last_fetched_date: lastFetchedDate,
        underlying_value: NSEOptionChainData.records.underlyingValue,
      },
    });
    console.log("✅ Successfully saved NSEOCCallPutsRatios:", respRatios.id);

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
