export interface HPresponseDataInterface {
  id: string;
  underlying_value: number;
  sum_oi_ce: number;
  sum_oi_pe: number;
  sum_change_in_oi_ce: number;
  sum_change_in_oi_pe: number;
  ratio_oi_ce: number;
  ratio_oi_pe: number;
  ratio_change_in_oi_ce: number;
  ratio_change_in_oi_pe: number;
  created_date: string;
  last_fetched_date: string;
  last_updated_date: string;
}

export interface HPresponseDataResponse {
  code: string;
  message: string;
  data: HPresponseDataInterface[];
}

export interface HPresponseDataInterfaceTwo {
  records: Array<{
    id: string;
    underlying_value: number;
    sum_oi_ce: bigint;
    sum_oi_pe: bigint;
    sum_change_in_oi_ce: bigint;
    sum_change_in_oi_pe: bigint;
    ratio_oi_ce: number;
    ratio_oi_pe: number;
    ratio_change_in_oi_ce: number;
    ratio_change_in_oi_pe: number;
    created_date: string;
    last_fetched_date: string;
    last_updated_date: string;
  }>;
  count: number;
}
