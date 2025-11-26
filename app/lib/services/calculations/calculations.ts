import { NSEOptionChainResponse } from "../../types/nseindia/nseindiaType";

function getTotOIRatio(data: NSEOptionChainResponse): { totOIRatio: number } {
  // get
  const totOICE = data.filtered.CE.totOI;
  const totOIPE = data.filtered.PE.totOI;

  const totOIRatio = parseFloat((totOICE / totOIPE).toFixed(2));

  return { totOIRatio };
}

export { getTotOIRatio };
