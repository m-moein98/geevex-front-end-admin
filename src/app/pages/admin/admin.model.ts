
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

export interface BaseCoin {
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

export interface BaseCoinDetail {
  highest_daily_irr_price: number;
  highest_daily_usdt_price: number;
  lowest_daily_irr_price: number;
  lowest_daily_usdt_price: number;
  market_cap_rating: number;
  market_cap: number;
  total_supply: number;
  circulating_supply: string;
  description: CoinDescription;
  secondary_description: CoinDescription;
  vendor: Vendor;
}

export interface Coin extends BaseCoin, BaseCoinDetail {
  id: number;
  similar_coins: Coin[];
}

export interface CoinsResponse extends Pagination {
  results: Coin[];
}

export interface CreateCoin extends BaseCoin {
}

export interface CoinDescription {
  title: string;
  text: string;
}

export interface UpdateCoin extends BaseCoin, BaseCoinDetail {
  similar_coin_ids?: number[];
}

export interface KYCUser {
  id: number;
  email: string;
}

export interface KYC {
  id: number;
  user: KYCUser;
  status: string;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  father_name: string;
  national_code: string;
  date_of_birth: string;
  birth_place: string;
  bank_account_number: string;
  front_id_image: string;
  back_id_image: string;
  selfie_video: string;
}

export interface KYCsResponse extends Pagination {
  results: KYC[];
}
