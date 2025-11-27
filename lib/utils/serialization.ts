// lib/utils/serialization.ts

/**
 * Convert BigInt values to numbers and handle Date objects properly in an object recursively
 * This is needed for JSON serialization as JSON.stringify() cannot handle BigInt
 */
export function serializeBigInt<T>(obj: T): T {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === "bigint") {
    return Number(obj) as T;
  }

  // Handle Date objects properly
  if (obj instanceof Date) {
    return obj.toISOString() as T;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => serializeBigInt(item)) as T;
  }

  if (typeof obj === "object") {
    const result = {} as T;
    for (const [key, value] of Object.entries(obj)) {
      (result as any)[key] = serializeBigInt(value);
    }
    return result;
  }

  return obj;
}

/**
 * Enhanced JSON.stringify that handles BigInt values
 */
export function stringifyWithBigInt(obj: any, space?: string | number): string {
  return JSON.stringify(serializeBigInt(obj), null, space);
}

/**
 * Prisma record serializer specifically for database records with BigInt fields
 */
export function serializePrismaRecord<T extends Record<string, any>>(
  record: T
): T {
  const serialized = { ...record } as any;

  // Convert known BigInt fields
  const bigIntFields = [
    "ce_total_oi",
    "pe_total_oi",
    "sum_oi_ce",
    "sum_oi_pe",
    "sum_change_in_oi_ce",
    "sum_change_in_oi_pe",
  ];
  const dateFields = ["last_fetched_date", "created_date", "last_updated_date"];

  const floatFields = [
    "underlying_value",
    "ratio",
    "ratio_oi_ce",
    "ratio_oi_pe",
    "ratio_change_in_oi_ce",
    "ratio_change_in_oi_pe",
  ];

  for (const field of bigIntFields) {
    if (field in serialized && typeof serialized[field] === "bigint") {
      serialized[field] = Number(serialized[field]);
    }
  }

  // Convert known Float fields rounded to 2 decimal places
  for (const field of floatFields) {
    if (field in serialized && typeof serialized[field] === "number") {
      serialized[field] = parseFloat(serialized[field].toFixed(2));
    }
  }

  // Convert Date fields to formatted strings
  for (const field of dateFields) {
    if (field in serialized && serialized[field] instanceof Date) {
      const date = serialized[field] as Date;
      // For last_fetched_date, format as "27 Nov 2025, 9:00 pm"
      if (field === "last_fetched_date") {
        serialized[field] = date.toLocaleString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
      } else {
        serialized[field] = date.toISOString();
      }
    }
  }

  return serialized as T;
}
