-- CreateTable
CREATE TABLE "NSEOCTotalOIRatio" (
    "id" TEXT NOT NULL,
    "ce_total_oi" BIGINT NOT NULL,
    "pe_total_oi" BIGINT NOT NULL,
    "last_fetched_date" TIMESTAMP(3) NOT NULL,
    "ratio" DOUBLE PRECISION NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_updated_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NSEOCTotalOIRatio_pkey" PRIMARY KEY ("id")
);
