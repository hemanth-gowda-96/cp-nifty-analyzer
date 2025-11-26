"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { APIResponseType } from "./lib/types/response/serviceResponseType";

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

export default function Home() {
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
    <div>
      {error && <p>Error: {error}</p>}
      {data && (
        <Card className="m-4">
          <CardHeader>
            <CardTitle>NSE Option Chain Data</CardTitle>
          </CardHeader>
          <CardContent>
            {JSON.stringify(data, null, 2)}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
