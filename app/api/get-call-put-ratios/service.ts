import { APIResponseType } from "@/app/lib/types/response/serviceResponseType";
import { prisma } from "@/lib/prisma";
import { serializePrismaRecord } from "@/lib/utils/serialization";

async function getNseCallNPutService(): Promise<APIResponseType<any>> {
  let result = [];
  try {
    result = await prisma.nSECallNPutOIRations.findMany({
      take: 8,
      orderBy: {
        created_date: "desc",
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

export const getNseCallNPutServices = {
  getNseCallNPutService,
};
