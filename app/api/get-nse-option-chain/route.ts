export async function GET() {
  try {
    const response = await fetch(
      "https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch from NSE");
    }
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'An error occurred' }, { status: 500 });
  }
}