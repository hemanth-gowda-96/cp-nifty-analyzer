import { APIResponseType } from "@/app/lib/types/response/serviceResponseType";
import { serializePrismaRecord } from "@/lib/utils/serialization";
import prisma from "@/lib/prisma";

async function getNseOptionChainDbService(): Promise<APIResponseType<any>> {
  let result = [];
  try {
    result = await prisma.nSEOCTotalOIRatio.findMany({
      take: 10,
      orderBy: {
        last_fetched_date: "desc",
      },
    });

    // Convert BigInt values to numbers for JSON serialization
    const serializedResult = result.map((record) =>
      serializePrismaRecord(record)
    );

    return {
      code: "S001",
      message: "NSE Option Chain data retrieved successfully from database",
      data: {
        records: serializedResult,
        count: serializedResult.length,
      },
    };
  } catch (error) {
    console.error("Database query error:", error);
    return {
      code: "E001",
      message: "Failed to fetch NSE Option Chain data from database",
      data: null,
    };
  }
}

export const getNseOptionChainService = {
  getNseOptionChainDbService,
};
