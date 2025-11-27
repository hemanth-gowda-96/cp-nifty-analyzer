import { NSEOptionChainResponse } from "../../types/nseindia/nseindiaType";

function getTotOIRatio(data: NSEOptionChainResponse): { totOIRatio: number } {
  // get
  const totOICE = data.filtered.CE.totOI;
  const totOIPE = data.filtered.PE.totOI;

  const totOIRatio = parseFloat((totOICE / totOIPE).toFixed(2));

  return { totOIRatio };
}

// get 8 Strick object

function get8StrickObjects(data: NSEOptionChainResponse) {
  const strikePrices = data.records.underlyingValue;

  const roundedStrikePrice = getStrickPriceRoundoff(strikePrices);

  const strickObjects = data.filtered.data;

  const sortedByDiff = strickObjects
    .map((obj) => ({
      ...obj,
      diff: Math.abs(obj.strikePrice - roundedStrikePrice),
    }))
    .sort((a, b) => a.diff - b.diff);

  const nearest8 = sortedByDiff.slice(0, 9);

  const lowest = Math.min(...nearest8.map((o) => o.strikePrice));

  const cleaned = nearest8.filter((o) => o.strikePrice !== lowest);

  // remove least obj.strikePrice to make it 8 objects

  // console.log("strikePrices:", strikePrices);
  // console.log("roundedStrikePrice:", roundedStrikePrice);
  // // console.log("nearest8:", nearest8);
  // console.log("cleaned to 8:", cleaned);

  return cleaned;
}

function getStrickPriceRoundoff(strikePrice: number): number {
  // round off to nearest 50
  return Math.round(strikePrice / 50) * 50;
}

export { getTotOIRatio, get8StrickObjects };
