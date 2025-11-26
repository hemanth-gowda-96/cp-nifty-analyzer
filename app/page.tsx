"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";

interface OptionData {
  records?: {
    data?: any[];
  };
}

export default function Home() {
  const [data, setData] = useState<OptionData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/get-nse-option-chain");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result: OptionData = await response.json();
        setData(result);
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
      {data?.records?.data ? (
        <div className="grid grid-cols-3 gap-4">
          {data.records.data.slice(0, 12).map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>Strike: {item.strikePrice}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Expiry: {item.expiryDate}</p>
                <p>CE OI: {item.CE?.openInterest || "N/A"}</p>
                <p>PE OI: {item.PE?.openInterest || "N/A"}</p>
                <p>CE LTP: {item.CE?.lastPrice || "N/A"}</p>
                <p>PE LTP: {item.PE?.lastPrice || "N/A"}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
