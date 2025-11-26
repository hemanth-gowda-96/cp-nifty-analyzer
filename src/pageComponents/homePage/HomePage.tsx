"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { APIResponseType } from "@/app/lib/types/response/serviceResponseType";
import { DataTable } from "@/components/ui/data-table";
import { ToiRatioColumns } from "./toiRatioColumns";
import { ToiRatioChartLineDefault } from "./toiRatioChart";

interface responseData {
  records: Array<{
    id: string;
    ce_total_oi: number;
    pe_total_oi: number;
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

  useEffect(() => {
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

    fetchData();
    const interval = setInterval(fetchData, 100000); // 100 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-[60%_40%] gap-4 h-screen p-4">
      {/* Left section - 60% */}
      <div className="flex flex-col min-h-0">
        {error && <p>Error: {error}</p>}
        {data && (
          <div className="flex-1 min-h-0 overflow-auto">
            <DataTable columns={ToiRatioColumns} data={data.records}></DataTable>
          </div>
        )}
      </div>

      {/* Right section - 40% */}
      <div className="flex flex-col min-h-0">
        <div className="flex-1 min-h-0">
          <ToiRatioChartLineDefault data={data?.records || []} />
        </div>
      </div>
    </div>
  );
}