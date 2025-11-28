import React from "react";


interface TitleBarProps {
  title: string;
  underlyingValue?: number;
  timestamp?: string;
  onRefresh?: () => void;
}

export const TitleBar: React.FC<TitleBarProps> = ({
  title,
  underlyingValue,
  timestamp,
  onRefresh,
}) => {
  // Format the underlying value with commas
  const formattedValue = underlyingValue
    ? underlyingValue.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "N/A";

  // Format the timestamp as "27 Nov 2025, 9:00 pm"
  const formattedTimestamp = timestamp
    ? new Date(timestamp).toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : "N/A";

  return (
    <div className="flex justify-between items-center p-5 shadow-lg rounded-b-xl border-b-4 border-blue-500 bg-gradient-to-r from-gray-900 via-gray-800 to-blue-900 text-white">
      <div className="text-2xl font-extrabold tracking-tight drop-shadow-lg">{title}</div>
      <div className="flex gap-8 items-center text-base">
        <div>
          <span className="text-gray-300 mr-2">Underlying Value:</span>
          <span className="font-bold text-green-400 text-lg">{formattedValue}</span>
        </div>
        <div>
          <span className="text-gray-300 mr-2">As on:</span>
          <span className="font-semibold text-blue-300">{formattedTimestamp}</span>
        </div>
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="ml-6 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg transition border border-blue-400"
            title="Refresh Data"
          >
            <span className="mr-1">&#x21bb;</span> Refresh
          </button>
        )}
      </div>
    </div>
  );
};
