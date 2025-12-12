// function to convert 26-Nov-2025 15:30:00 to ISO string

function convertToISOString(dateTimeStr: string): string {
  const [datePart, timePart] = dateTimeStr.split(" ");
  const [day, monthStr, year] = datePart.split("-");
  const [hours, minutes, seconds] = timePart.split(":").map(Number);

  const monthMap: Record<string, number> = {
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
    Date.UTC(+year, monthIndex, +day, hours, minutes, seconds)
  );

  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${dateTimeStr}`);
  }

  return date.toISOString();
}

// get postgres Datetime format - keep as ISO string for Prisma compatibility
function getPostgresDatetime(date: Date): string {
  return date.toISOString();
}

// Test function to validate date parsing

export const DateTimeUtils = {
  convertToISOString,
  getPostgresDatetime,
};
