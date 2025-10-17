
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

export interface BasicResponse {
  detail: string;
}

export interface Coin {
  id: number;
  name: string;
  fa_name: string;
  symbol: string;
  daily_starting_irr_price: number;
  daily_starting_usdt_price: number;
  irr_price: number;
  usdt_price: number;
  logo_url: string;
  is_sellable: boolean;
  is_buyable: boolean;
  amount_precision: number;
  price_precision: number;
  minimum_buy_amount: number;
  minimum_sell_amount: number;
  maximum_buy_amount: number;
  maximum_sell_amount: number;
  vendor: Vendor;
}

export interface CoinsResponse extends Pagination {
  results: Coin[];
}

export interface CreateCoin {
  name: string;
  fa_name: string;
  symbol: string;
  daily_starting_irr_price: number;
  daily_starting_usdt_price: number;
  irr_price: number;
  usdt_price: number;
  is_sellable: boolean;
  is_buyable: boolean;
  amount_precision: number;
  price_precision: number;
  minimum_buy_amount: number;
  minimum_sell_amount: number;
  maximum_buy_amount: number;
  maximum_sell_amount: number;
}