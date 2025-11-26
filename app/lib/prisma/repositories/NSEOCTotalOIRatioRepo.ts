import { NSEOCTotalOIRatio } from "@/lib/generated/prisma/client";
import prisma from "@/lib/prisma";

function getAll() {
  // from NSEOCTotalOIRatio table
  return prisma.nSEOCTotalOIRatio.findMany();
}

export const NSEOCTotalOIRatioRepo = {
  getAll,
};
