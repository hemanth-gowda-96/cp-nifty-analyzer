-- CreateTable
CREATE TABLE "NSECallNPutOIRations" (
    "id" TEXT NOT NULL,
    "underlying_value" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "sum_oi_ce" BIGINT NOT NULL,
    "sum_oi_pe" BIGINT NOT NULL,
    "sum_change_in_oi_ce" BIGINT NOT NULL,
    "sum_change_in_oi_pe" BIGINT NOT NULL,
    "ratio_oi_ce" DOUBLE PRECISION NOT NULL,
    "ratio_oi_pe" DOUBLE PRECISION NOT NULL,
    "ratio_change_in_oi_ce" DOUBLE PRECISION NOT NULL,
    "ratio_change_in_oi_pe" DOUBLE PRECISION NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_fetched_date" TIMESTAMP(3) NOT NULL,
    "last_updated_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NSECallNPutOIRations_pkey" PRIMARY KEY ("id")
);
