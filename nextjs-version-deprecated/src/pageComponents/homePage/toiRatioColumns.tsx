"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ToiRatioColumnsType = {
  id: string;
  ce_total_oi: number;
  pe_total_oi: number;
  last_fetched_date: string;
  ratio: number;
  created_date: string;
  last_updated_date: string;
  last_fetched_date_str: string;
  created_date_str: string;
  last_updated_date_str: string;
};

export const ToiRatioColumns: ColumnDef<ToiRatioColumnsType>[] = [
  {
    accessorKey: "last_fetched_date_str",
    header: "Last Fetched Date",
  },
  {
    accessorKey: "ce_total_oi",
    header: "CE Total OI",
  },
  {
    accessorKey: "pe_total_oi",
    header: "PE Total OI",
  },
  {
    accessorKey: "ratio",
    header: "Ratio",
  },
  // {
  //     accessorKey: "created_date",
  //     header: "Created Date",
  // },
  // {
  //     accessorKey: "last_updated_date",
  //     header: "Last Updated Date",
  // },
];
