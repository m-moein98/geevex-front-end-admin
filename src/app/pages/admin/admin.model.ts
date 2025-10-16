
export interface Option {
  name: string | boolean;
  placeholder: string;
}

export interface Filter {
  name: string;
  placeholder: string;
  defaultValue: string | boolean;
  options: Option[];
}

export interface Pagination {
  count: number;
  next: string;
  previous: string;
}

export interface VendorCoinmapMetadata {
  omp_buy_market_id: number;
  omp_sell_market_id: number;
}

export interface VendorCoinmap {
  symbol: string;
  price_multiplier: number;
  metadata: VendorCoinmapMetadata;
}

export interface Vendor {
  id: number;
  name: string;
  is_active: boolean;
  token: string;
  username: string;
  password: string;
  coin_map: VendorCoinmap[];
}

export interface VendorsResponse extends Pagination {
  results: Vendor[];
}
