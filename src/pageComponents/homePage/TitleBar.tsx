import React from "react";

interface TitleBarProps {
  title: string;
  underlyingValue?: number;
  timestamp?: string;
}

export const TitleBar: React.FC<TitleBarProps> = ({
  title,
  underlyingValue,
  timestamp,
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
    <div className="flex justify-between items-center bg-gray-900 text-white p-4 shadow-md">
      <div className="text-xl font-bold">{title}</div>
      <div className="flex gap-6 text-sm">
        <div>
          <span className="text-gray-400 mr-2">Underlying Value:</span>
          <span className="font-semibold text-green-400">{formattedValue}</span>
        </div>
        <div>
          <span className="text-gray-400 mr-2">Last Fetched:</span>
          <span className="font-semibold text-blue-400">{formattedTimestamp}</span>
        </div>
      </div>
    </div>
  );
};
