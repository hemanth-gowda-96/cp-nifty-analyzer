"use client";

import { useState, useEffect } from "react";
import { APIResponseType } from "@/app/lib/types/response/serviceResponseType";
import { DataTable } from "@/components/ui/data-table";
import { ToiRatioColumns } from "./toiRatioColumns";
import { ToiRatioChartLineDefault } from "./charts/toiRatioChart";
import { TitleBar } from "./TitleBar";
import { CallNputRationColumns } from "./callNputRationColumns";
import {
  HPresponseDataInterface,
  HPresponseDataInterfaceTwo,
  HPresponseDataResponse,
  HPresponseDataTwoResp,
} from "./interfaces/homePageInterface";

export default function HomePage() {
  const [data, setData] = useState<HPresponseDataInterface | null>(null);
  const [callPutData, setCallPutData] =
    useState<HPresponseDataInterfaceTwo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3005/api/get-call-put-ratios"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result: APIResponseType<HPresponseDataResponse> =
        await response.json();

      console.log("result", result.code);

      if (result.code !== "S001") {
        setError(result.message);
        return;
      }

      // convert result.data to HPresponseDataInterface[]
      const data: HPresponseDataInterface =
        result.data as unknown as HPresponseDataInterface;

      setData(data);

      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  const fetchCallPutData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3005/api/get-nse-option-chain"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch call-put data");
      }
      const result: APIResponseType<HPresponseDataTwoResp> =
        await response.json();

      if (result.code !== "S001") {
        setError(result.message);
        return;
      }

      // convert result.data to HPresponseDataInterfaceTwo[]
      const data: HPresponseDataInterfaceTwo =
        result.data as unknown as HPresponseDataInterfaceTwo;

      setCallPutData(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  useEffect(() => {
    fetchData();
    fetchCallPutData();
    const interval = setInterval(() => {
      fetchData();
      fetchCallPutData();
    }, 30000); // 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Get the latest record for the title bar
  const latestRecord = data?.records[0];

  const handleRefresh = () => {
    fetchData();
    fetchCallPutData();
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-linear-to-br from-blue-50 via-white to-blue-100">
      <TitleBar
        title="NSE Option Chain Total OI Ratio"
        underlyingValue={latestRecord?.underlying_value}
        timestamp={latestRecord?.last_updated_date}
        onRefresh={handleRefresh}
      />
      <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-4 p-4">
        <div className="flex flex-col bg-white/95 rounded-xl shadow p-3 border border-gray-200 hover:shadow-lg transition duration-200">
          <h2 className="text-base font-bold text-blue-900 mb-2 tracking-wide">
            Total OI Ratio Table
          </h2>
          {error && (
            <p className="text-red-600 font-semibold mb-1 text-xs">
              Error: {error}
            </p>
          )}
          {data && (
            <div className="overflow-x-auto">
              <DataTable columns={ToiRatioColumns} data={data.records} />
            </div>
          )}
        </div>

        <div className="flex flex-col">
          {data && (
            <div className="h-full bg-white/95 rounded-xl shadow p-3 border border-gray-200 hover:shadow-lg transition duration-200">
              <ToiRatioChartLineDefault data={data.records} />
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-4 p-4">
        <div className="flex flex-col bg-white/95 rounded-xl shadow p-3 border border-gray-200 hover:shadow-lg transition duration-200">
          <h2 className="text-base font-bold text-blue-900 mb-2 tracking-wide">
            Call/Put OI Ratio Table
          </h2>
          {error && (
            <p className="text-red-600 font-semibold mb-1 text-xs">
              Error: {error}
            </p>
          )}
          {data && (
            <div className="overflow-x-auto">
              <DataTable
                columns={CallNputRationColumns}
                data={callPutData?.records || []}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col"></div>
      </div>
    </div>
  );
}
