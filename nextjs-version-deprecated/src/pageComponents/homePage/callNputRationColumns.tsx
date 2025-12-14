import { ColumnDef } from "@tanstack/react-table";

export type CallPutsRatiosType = {
  sum_oi_ce: bigint;
  sum_oi_pe: bigint;
  sum_change_in_oi_ce: bigint;
  sum_change_in_oi_pe: bigint;
  ratio_oi_ce: number;
  ratio_oi_pe: number;
  ratio_change_in_oi_ce: number;
  ratio_change_in_oi_pe: number;
  last_fetched_date: string;
  last_fetched_date_str: string;
};

export const CallNputRationColumns: ColumnDef<CallPutsRatiosType>[] = [
  {
    accessorKey: "last_fetched_date_str",
    header: "Last Fetched Date",
  },
  {
    accessorKey: "ratio_oi_ce",
    header: "CE OI",
  },
  {
    accessorKey: "ratio_change_in_oi_ce",
    header: "CE Change in OI",
  },
  {
    accessorKey: "underlying_value",
    header: "Underlying Value",
  },
  {
    accessorKey: "ratio_oi_pe",
    header: "PE OI",
  },
  {
    accessorKey: "ratio_change_in_oi_pe",
    header: "PE Change in OI",
  },
];
