// Base option data structure for both CE (Call) and PE (Put)
export type OptionData = {
  strikePrice: number;
  expiryDate: string;
  underlying: string;
  identifier: string;
  openInterest: number;
  changeinOpenInterest: number;
  pchangeinOpenInterest: number;
  totalTradedVolume: number;
  impliedVolatility: number;
  lastPrice: number;
  change: number;
  pChange: number;
  totalBuyQuantity: number;
  totalSellQuantity: number;
  bidQty: number;
  bidprice: number;
  askQty: number;
  askPrice: number;
  underlyingValue: number;
};

// Strike price data structure
export type StrikePriceData = {
  strikePrice: number;
  expiryDate: string;
  CE?: OptionData; // Call option (optional)
  PE?: OptionData; // Put option (optional)
};

// Index information structure
export type IndexInfo = {
  key: string;
  index: string;
  indexSymbol: string;
  last: number;
  variation: number;
  percentChange: number;
  open: number;
  high: number;
  low: number;
  previousClose: number;
  yearHigh: number;
  yearLow: number;
  indicativeClose: number;
  pe: string;
  pb: string;
  dy: string;
  declines: string;
  advances: string;
  unchanged: string;
  perChange365d: number;
  perChange30d: number;
  date365dAgo: string;
  date30dAgo: string;
  previousDay: string;
  oneWeekAgo: string;
  oneMonthAgoVal: number;
  oneWeekAgoVal: number;
  oneYearAgoVal: number;
  previousDayVal: number;
  chart365dPath: string;
  chart30dPath: string;
  chartTodayPath: string;
};

// Total OI and Volume for CE/PE
export type TotalOIVolume = {
  totOI: number;
  totVol: number;
};

// Complete NSE Option Chain Response
export type NSEOptionChainResponse = {
  records: {
    expiryDates: string[];
    data: StrikePriceData[];
    timestamp: string;
    underlyingValue: number;
    strikePrices: number[];
    index: IndexInfo;
  };
  filtered: {
    data: StrikePriceData[];
    CE: TotalOIVolume;
    PE: TotalOIVolume;
  };
};

// {
//   "records": {
//     "expiryDates": [
//       "02-Dec-2025",
//       "09-Dec-2025",
//       "16-Dec-2025",
//       "23-Dec-2025",
//       "30-Dec-2025",
//       "27-Jan-2026",
//       "24-Feb-2026",
//       "31-Mar-2026",
//       "30-Jun-2026",
//       "29-Sep-2026",
//       "29-Dec-2026",
//       "29-Jun-2027",
//       "28-Dec-2027",
//       "27-Jun-2028",
//       "26-Dec-2028",
//       "26-Jun-2029",
//       "24-Dec-2029",
//       "25-Jun-2030"
//     ],
//     "data": [
//       {
//         "strikePrice": 12000,
//         "expiryDate": "30-Jun-2026",
//         "PE": {
//           "strikePrice": 12000,
//           "expiryDate": "30-Jun-2026",
//           "underlying": "NIFTY",
//           "identifier": "OPTIDXNIFTY30-06-2026PE12000.00",
//           "openInterest": 4.333333333333333,
//           "changeinOpenInterest": 0,
//           "pchangeinOpenInterest": 0,
//           "totalTradedVolume": 0,
//           "impliedVolatility": 0,
//           "lastPrice": 20,
//           "change": 0,
//           "pChange": 0,
//           "totalBuyQuantity": 5475,
//           "totalSellQuantity": 0,
//           "bidQty": 75,
//           "bidprice": 4,
//           "askQty": 0,
//           "askPrice": 0,
//           "underlyingValue": 26205.3
//         }
//       }
//     ],
//     "timestamp": "26-Nov-2025 15:30:00",
//     "underlyingValue": 26205.3,
//     "strikePrices": [
//       12000, 13000, 14000, 15000, 16000, 16500, 17000, 18000, 19000, 19500,
//       20000, 21000, 22000, 22850, 22900, 22950, 23000, 23050, 23100, 23150,
//       23200, 23250, 23300, 23350, 23400, 23450, 23500, 23550, 23600, 23650,
//       23700, 23750, 23800, 23850, 23900, 23950, 24000, 24050, 24100, 24150,
//       24200, 24250, 24300, 24350, 24400, 24450, 24500, 24550, 24600, 24650,
//       24700, 24750, 24800, 24850, 24900, 24950, 25000, 25050, 25100, 25150,
//       25200, 25250, 25300, 25350, 25400, 25450, 25500, 25550, 25600, 25650,
//       25700, 25750, 25800, 25850, 25900, 25950, 26000, 26050, 26100, 26150,
//       26200, 26250, 26300, 26350, 26400, 26450, 26500, 26550, 26600, 26650,
//       26700, 26750, 26800, 26850, 26900, 26950, 27000, 27050, 27100, 27150,
//       27200, 27250, 27300, 27350, 27400, 27450, 27500, 27550, 27600, 27650,
//       27700, 27750, 27800, 27850, 27900, 27950, 28000, 29000, 30000, 31000
//     ],
//     "index": {
//       "key": "INDICES ELIGIBLE IN DERIVATIVES",
//       "index": "NIFTY 50",
//       "indexSymbol": "NIFTY 50",
//       "last": 26205.3,
//       "variation": 320.5,
//       "percentChange": 1.24,
//       "open": 25842.95,
//       "high": 26215.15,
//       "low": 25842.95,
//       "previousClose": 25884.8,
//       "yearHigh": 26246.65,
//       "yearLow": 21743.65,
//       "indicativeClose": 0,
//       "pe": "22.82",
//       "pb": "3.56",
//       "dy": "1.28",
//       "declines": "6",
//       "advances": "44",
//       "unchanged": "0",
//       "perChange365d": 8.19,
//       "perChange30d": 1.59,
//       "date365dAgo": "25-Nov-2024",
//       "date30dAgo": "24-Oct-2025",
//       "previousDay": "26-Nov-2025",
//       "oneWeekAgo": "19-Nov-2025",
//       "oneMonthAgoVal": 25795.15,
//       "oneWeekAgoVal": 26052.65,
//       "oneYearAgoVal": 24221.9,
//       "previousDayVal": 26205.3,
//       "chart365dPath": "https://nsearchives.nseindia.com/365d/NIFTY-50.svg",
//       "chart30dPath": "https://nsearchives.nseindia.com/30d/NIFTY-50.svg",
//       "chartTodayPath": "https://nsearchives.nseindia.com/today/NIFTY-50.svg"
//     }
//   },
//   "filtered": {
//     "data": [
//       {
//         "strikePrice": 23750,
//         "expiryDate": "02-Dec-2025",
//         "CE": {
//           "strikePrice": 23750,
//           "expiryDate": "02-Dec-2025",
//           "underlying": "NIFTY",
//           "identifier": "OPTIDXNIFTY02-12-2025CE23750.00",
//           "openInterest": 11,
//           "changeinOpenInterest": 0,
//           "pchangeinOpenInterest": 0,
//           "totalTradedVolume": 0,
//           "impliedVolatility": 0,
//           "lastPrice": 2170.5,
//           "change": 0.15000000000009095,
//           "pChange": 0.006911327666048839,
//           "totalBuyQuantity": 5175,
//           "totalSellQuantity": 4725,
//           "bidQty": 75,
//           "bidprice": 2424.2,
//           "askQty": 375,
//           "askPrice": 2540,
//           "underlyingValue": 26205.3
//         },
//         "PE": {
//           "strikePrice": 23750,
//           "expiryDate": "02-Dec-2025",
//           "underlying": "NIFTY",
//           "identifier": "OPTIDXNIFTY02-12-2025PE23750.00",
//           "openInterest": 41160,
//           "changeinOpenInterest": 28864,
//           "pchangeinOpenInterest": 234.74300585556279,
//           "totalTradedVolume": 160627,
//           "impliedVolatility": 31.01,
//           "lastPrice": 1.9,
//           "change": 0.34999999999999987,
//           "pChange": 22.580645161290313,
//           "totalBuyQuantity": 553050,
//           "totalSellQuantity": 49275,
//           "bidQty": 4275,
//           "bidprice": 1.85,
//           "askQty": 1800,
//           "askPrice": 1.9,
//           "underlyingValue": 26205.3
//         }
//       }
//     ],
//     "CE": { "totOI": 1392755, "totVol": 26156564 },
//     "PE": { "totOI": 2163298, "totVol": 21728172 }
//   }
// }
