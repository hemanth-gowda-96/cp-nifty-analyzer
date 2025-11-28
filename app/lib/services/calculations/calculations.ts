import { CallPutsRatiosType } from "../../types/calculations/calculationType";
import {
  NSEOptionChainResponse,
  StrikePriceData,
} from "../../types/nseindia/nseindiaType";

function getTotOIRatio(data: NSEOptionChainResponse): { totOIRatio: number } {
  // get
  const totOICE = data.filtered.CE.totOI;
  const totOIPE = data.filtered.PE.totOI;

  const totOIRatio = parseFloat((totOICE / totOIPE).toFixed(2));

  return { totOIRatio };
}

// get 8 Strick object

function get8StrickObjects(data: NSEOptionChainResponse): StrikePriceData[] {
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

  // remove least obj.strikePrice to make it 8 objects

  // console.log("strikePrices:", strikePrices);
  // console.log("roundedStrikePrice:", roundedStrikePrice);
  // // console.log("nearest8:", nearest8);
  // console.log("cleaned to 8:", cleaned);

  return nearest8;
}

function getCallPutsRatios(data: StrikePriceData[]): CallPutsRatiosType {
  let sum_oi_ce = 0;
  let sum_oi_pe = 0;

  let sum_change_in_oi_ce = 0;
  let sum_change_in_oi_pe = 0;

  data.forEach((obj) => {
    if (obj.CE && obj.CE.openInterest) {
      sum_oi_ce += obj.CE.openInterest;
    }
    if (obj.PE && obj.PE.openInterest) {
      sum_oi_pe += obj.PE.openInterest;
    }
    if (obj.CE && obj.CE.changeinOpenInterest) {
      sum_change_in_oi_ce += obj.CE.changeinOpenInterest;
    }
    if (obj.PE && obj.PE.changeinOpenInterest) {
      sum_change_in_oi_pe += obj.PE.changeinOpenInterest;
    }
  });

  let grandtotal_oi = sum_oi_ce + sum_oi_pe;
  let grandtotal_change_in_oi = sum_change_in_oi_ce + sum_change_in_oi_pe;

  let ratio_oi_ce = (sum_oi_ce / grandtotal_oi) * 100;
  let ratio_oi_pe = (sum_oi_pe / grandtotal_oi) * 100;

  let ratio_change_in_oi_ce =
    (sum_change_in_oi_ce / grandtotal_change_in_oi) * 100;
  let ratio_change_in_oi_pe =
    (sum_change_in_oi_pe / grandtotal_change_in_oi) * 100;
  const response: CallPutsRatiosType = {
    sum_oi_ce: sum_oi_ce,
    sum_oi_pe: sum_oi_pe,
    sum_change_in_oi_ce: sum_change_in_oi_ce,
    sum_change_in_oi_pe: sum_change_in_oi_pe,
    ratio_oi_ce: ratio_oi_ce,
    ratio_oi_pe: ratio_oi_pe,
    ratio_change_in_oi_ce: ratio_change_in_oi_ce,
    ratio_change_in_oi_pe: ratio_change_in_oi_pe,
  };

  return response;
}

// {
//   sum_oi_ce: 522228,
//   sum_oi_pe: 435135,
//   sum_change_in_oi_ce: 142802,
//   sum_change_in_oi_pe: 21204,
//   ratio_oi_ce: 0.54548588153083,
//   ratio_oi_pe: 0.45451411846917,
//   ratio_change_in_oi_ce: 0.8707120471202273,
//   ratio_change_in_oi_pe: 0.12928795287977268
// }

function getStrickPriceRoundoff(strikePrice: number): number {
  // round off to nearest 50
  return Math.round(strikePrice / 50) * 50;
}

export { getTotOIRatio, get8StrickObjects, getCallPutsRatios };
