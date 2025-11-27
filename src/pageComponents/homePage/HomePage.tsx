"use client";

import { useState, useEffect } from "react";
import { APIResponseType } from "@/app/lib/types/response/serviceResponseType";
import { DataTable } from "@/components/ui/data-table";
import { ToiRatioColumns } from "./toiRatioColumns";
import { ToiRatioChartLineDefault } from "./toiRatioChart";
import { TitleBar } from "./TitleBar";

interface responseData {
  records: Array<{
    id: string;
    ce_total_oi: number;
    pe_total_oi: number;
    underlying_value: number;
    last_fetched_date: string;
    ratio: number;
    created_date: string;
    last_updated_date: string;
  }>;
  count: number;
}

export default function HomePage() {
  const [data, setData] = useState<responseData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/get-nse-option-chain");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result: APIResponseType<responseData> = await response.json();

      if (result.code !== "S001") {
        setError(result.message);
        return;
      }

      setData(result.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Get the latest record for the title bar
  const latestRecord = data?.records?.[0];

  console.log("latestRecord", latestRecord);

    
  return (
    <div className="flex flex-col min-h-screen">
      <TitleBar
        title="CP Nifty Analyzer"
        underlyingValue={latestRecord?.underlying_value}
        timestamp={latestRecord?.last_fetched_date}
      />
      <div className="grid grid-cols-[60%_40%] gap-4 p-4">
        {/* Left section - 60% */}
        <div className="flex flex-col">
          {error && <p>Error: {error}</p>}
          {data && (
            <div>
              <DataTable
                columns={ToiRatioColumns}
                data={data.records}
              ></DataTable>
            </div>
          )}
        </div>

        {/* Right section - 40% */}
        <div className="flex flex-col">
          {data && (
            <div className="h-full">
              <ToiRatioChartLineDefault data={data.records} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
