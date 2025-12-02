"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An area chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ToiRatioChartLineDefault({
  data,
}: {
  data: Array<{
    id: string;
    ce_total_oi: number;
    pe_total_oi: number;
    last_fetched_date: string;
    ratio: number;
    created_date: string;
    last_updated_date: string;
  }>;
}) {
  // Transform data to fit chartData structure
  const chartData = data
    .map((item) => {
      // Extract time from "27 Nov 2025, 9:00 pm" format
      const parts = item.last_fetched_date.split(", ");
      const time = parts.length > 1 ? parts[1] : item.last_fetched_date;
      return {
        time: time,
        ratio: item.ratio,
      };
    })
    .reverse();

  return (
    <Card className="flex flex-col h-full">
      <CardContent className="flex-1 flex flex-col">
        <ChartContainer config={chartConfig} className="flex-1">
          <AreaChart
            data={chartData}
            margin={{
              left: 12,
              right: 36,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <YAxis
              domain={[0, "dataMax + 0.2"]}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Area
              dataKey="ratio"
              type="linear"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              dot={{
                r: 4,
                stroke: "var(--color-desktop)",
                strokeWidth: 2,
                fill: "#fff",
              }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
}
