-- CreateTable
CREATE TABLE "NSEOCTotalOIRatio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ce_total_oi" BIGINT NOT NULL,
    "pe_total_oi" BIGINT NOT NULL,
    "underlying_value" REAL NOT NULL DEFAULT 0,
    "last_fetched_date" DATETIME NOT NULL,
    "ratio" REAL NOT NULL,
    "created_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_updated_date" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "NSECallNPutOIRations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "underlying_value" REAL NOT NULL DEFAULT 0,
    "sum_oi_ce" BIGINT NOT NULL,
    "sum_oi_pe" BIGINT NOT NULL,
    "sum_change_in_oi_ce" BIGINT NOT NULL,
    "sum_change_in_oi_pe" BIGINT NOT NULL,
    "ratio_oi_ce" REAL NOT NULL,
    "ratio_oi_pe" REAL NOT NULL,
    "ratio_change_in_oi_ce" REAL NOT NULL,
    "ratio_change_in_oi_pe" REAL NOT NULL,
    "created_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_fetched_date" DATETIME NOT NULL,
    "last_updated_date" DATETIME NOT NULL
);
