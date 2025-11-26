// function to convert 26-Nov-2025 15:30:00 to ISO string
function convertToISOString(dateTimeStr: string): Date {
  const [datePart, timePart] = dateTimeStr.split(" ");
  const [day, monthStr, year] = datePart.split("-");
  const [hours, minutes, seconds] = timePart.split(":").map(Number);

  // Month mapping for NSE format
  const monthMap: { [key: string]: number } = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  const monthIndex = monthMap[monthStr];
  if (monthIndex === undefined) {
    throw new Error(`Invalid month: ${monthStr}`);
  }

  const date = new Date(
    Date.UTC(parseInt(year), monthIndex, parseInt(day), hours, minutes, seconds)
  );

  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${dateTimeStr}`);
  }

  return date;
}

// get postgres Datetime format - keep as ISO string for Prisma compatibility
function getPostgresDatetime(date: Date): string {
  return date.toISOString();
}

// Test function to validate date parsing
function testDateParsing(): void {
  const testDates = [
    "26-Nov-2025 15:30:00",
    "02-Dec-2025 09:15:00",
    "31-Jan-2026 16:45:30",
  ];

  testDates.forEach((dateStr) => {
    try {
      const parsed = convertToISOString(dateStr);
      console.log(`✓ Parsed ${dateStr} → ${parsed.toISOString()}`);
    } catch (error) {
      console.error(`✗ Failed to parse ${dateStr}:`, error);
    }
  });
}

export const DateTimeUtils = {
  convertToISOString,
  getPostgresDatetime,
  testDateParsing,
};
