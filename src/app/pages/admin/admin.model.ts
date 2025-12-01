export interface MinifedUser {
  id: number;
  email: string;
  phone: string;
}

// User interfaces
export interface User {
  id: number;
  created_at: string;
  first_name: string | null;
  last_name: string | null;
  father_name: string | null;
  birth_place: string | null;
  national_code: string | null;
  date_of_birth: string | null;
  email: string | null;
  phone: string | null;
  referral_code: string | null;
  custom_referral_code: string | null;
  balance: number;
  total_referral_count: number;
  withdrawal_security_methods: string[];
  totp_enabled: boolean | null;
  kyc_status: KYCStatusResponse | null;
  kyc_level: number | null;
  avatar_url: string | null;
  devices: DeviceInfo[];
  email_notifications: boolean | null;
  require_order_confirmation: boolean | null;
  require_cancel_confirmation: boolean | null;
}

export interface KYCStatusResponse {
  status: string;
  level: number | null;
  rejection_reason: string | null;
  uploaded_files: UploadedFiles | null;
  data: KYCTextData | null;
}

export interface KYCTextData {
  first_name: string | null;
  last_name: string | null;
  father_name: string | null;
  national_code: string | null;
  date_of_birth: string | null;
  bank_account_number: string | null;
  birth_place: string | null;
  residence_province: string | null;
}

export interface UploadedFiles {
  front_id: string | null;
  back_id: string | null;
  selfie: string | null;
}

export interface DeviceInfo {
  serial: string | null;
  brand: string | null;
  model: string | null;
  ip: string | null;
  last_login: string | null;
  access_token: string | null;
}

export interface UsersResponse {
  count: number;
  next: number | null;
  previous: number | null;
  results: User[];
}

export interface UserListFilter {
  phone?: string | null;
  email?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  father_name?: string | null;
}

export type UserListOrderBy = 'id' | 'phone' | 'email' | 'first_name' | 'last_name';

// Wallet interfaces
export interface Wallet {
  id: number;
  coin: BaseCoin;
  total_usdt_amount: number;
  total_irr_amount: number;
  usdt_amount: number;
  irr_amount: number;
  amount: number;
  frozen_bot_amount: number;
  frozen_bot_usdt_amount: number;
  frozen_bot_irr_amount: number;
  frozen_investment_amount: number;
  frozen_investment_usdt_amount: number;
  frozen_investment_irr_amount: number;
  frozen_order_irr_amount: number;
  frozen_order_usdt_amount: number;
}

export interface WalletsResponse {
  results: Wallet[];
}

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
  vendor_id: number;
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
  phone: string;
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

export interface CreateOrder {
  type: string;
  action: string;
  source_coin_symbol: string;
  destination_coin_symbol: string;
  destination_amount: number;
  destination_price: number;
}

// Ticket interfaces
export interface Ticket {
  id: number;
  title: string;
  created_at: string;
  description: string;
  response: string | null;
  attachment: string | null;
  status: TicketStatus;
  score: number | null;
  comment: string | null;
}

export type TicketStatus = 'open' | 'closed' | 'waiting_response';

export interface TicketCreateRequest {
  title: string;
  description: string;
}

export interface TicketUpdateRequest {
  response: string;
  status: string;
}

export interface TicketRateRequest {
  score: number;
  comment?: string | null;
}

export interface TicketsResponse {
  results: Ticket[];
}

// Notification interfaces
export interface Notification {
  id: number;
  title: string;
  body: string;
  type: NotificationType;
  is_read: boolean;
  user: number | null;
  created_at: string;
}

export type NotificationType = 'security' | 'transactional' | 'announcement';

export interface NotificationCreate {
  title: string;
  body: string;
  type: NotificationType;
  user_id?: number | null;
}

export interface NotificationsResponse {
  results: Notification[];
}

// FAQ interfaces
export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: FAQCategory;
}

export type FAQCategory = 'all' | 'auth' | 'trading' | 'gives' | 'registration_kyc' | 'withdrawal' | 'digital_currency' | 'bug_report' | 'system_error' | 'service' | 'operational' | 'other';

export interface FAQCreate {
  question: string;
  answer: string;
  category: FAQCategory;
}

export interface FAQUpdate {
  question?: string | null;
  answer?: string | null;
  category?: FAQCategory | null;
}

export interface FAQResponse {
  count: number;
  next: number | null;
  previous: number | null;
  results: FAQ[];
}

// Contact Info interfaces
export interface ContactInfo {
  support_email?: string | null;
  phone_number?: string | null;
  address?: string | null;
  telegram_link?: string | null;
  instagram_link?: string | null;
  Eita_link?: string | null;
  Bale_link?: string | null;
  whatsapp_link?: string | null;
  youtube_link?: string | null;
  rubika_link?: string | null;
  neshan_link?: string | null;
}

// Order interfaces
export interface Order {
  id: number;
  action: OrderAction;
  created_at: string;
  source_coin: BaseCoin | null;
  destination_coin: BaseCoin | null;
  source_amount: number;
  destination_amount: number;
  source_price: number;
  destination_price: number;
  fee: number;
  status: OrderStatus;
}

export type OrderAction = 'buy' | 'sell' | 'swap';
export type OrderStatus = 'CREATED' | 'CANCELLED' | 'IN_PROGRESS' | 'FAILED' | 'COMPLETED';

export interface OrderResponse {
  count: number;
  next: number | null;
  previous: number | null;
  results: Order[];
}

export interface CreateOrderRequest {
  type: 'LIMIT' | 'MARKET';
  action: OrderAction;
  source_coin_symbol: string;
  destination_coin_symbol: string;
  destination_amount: number;
  destination_price?: number | null;
}

export interface UpdateOrder {
  status: 'CANCELLED';
}

// Deposit interfaces
export interface Deposit {
  id: number;
  created_at: string;
  updated_at: string;
  coin: BaseCoin | null;
  network: string;
  address: string;
  memo?: string | null;
  status: DepositStatus;
  type: DepositType;
  source_card_number?: string | null;
  image_url?: string | null;
  link?: string | null;
  user: MinifedUser;
}

export type DepositStatus = 'INCOMPLETE' | 'CHECKING' | 'COMPLETED' | 'CANCELLED' | 'REJECTED';
export type DepositType = 'CRYPTO' | 'CARD_PAYMENT' | 'IBAN_PAYMENT' | 'SHETAB_PAYMENT';

export interface DepositsResponse {
  results: Deposit[];
}

export interface CreateDeposit {
  coin_symbol: string;
  type: DepositType;
  network: string;
  address: string;
  memo?: string | null;
  source_card_number?: string | null;
}

export interface UpdateDeposit {
  status: DepositStatus;
  link?: string | null;
}

// Withdrawal interfaces
export interface Withdrawal {
  id: number;
  created_at: string;
  updated_at: string;
  coin: BaseCoin | null;
  network: string;
  address: string;
  memo?: string | null;
  status: WithdrawalStatus;
  type: WithdrawalType;
  title: string;
  user: MinifedUser;
}

export type WithdrawalStatus = 'INCOMPLETE' | 'APPROVED' | 'CHECKING' | 'COMPLETED' | 'CANCELLED' | 'REJECTED';
export type WithdrawalType = 'CRYPTO' | 'CARD_PAYMENT';

export interface WithdrawalsResponse {
  results: Withdrawal[];
}

export interface CreateWithdrawal {
  coin_symbol: string;
  type: WithdrawalType;
  network: string;
  address: string;
  memo?: string | null;
  title: string;
}

export interface UpdateWithdrawal {
  status: WithdrawalStatus;
  link?: string | null;
}

// Trade Bot interfaces
export interface DCATradeBot {
  id: number;
  created_at: string;
  name: string;
  source_coin_symbol: string;
  source_coin_fa_name: string;
  destination_coin_symbol: string;
  source_coin_logo_url?: string | null;
  destination_amount: number;
  destination_purchased_amount: number;
  days: number;
  period: DCAPeriod;
  status: TradeBotStatus;
  remaining_periods: number;
  current_value_irr: number;
  total_value_irr: number;
  total_value_usdt: number;
  average_purchase_price_irr: number;
  profit_percentage: number;
}

export type DCAPeriod = 'day' | 'week' | 'month';
export type TradeBotStatus = 'active' | 'paused' | 'cancelled' | 'completed';

export interface CreateDCATradeBot {
  name: string;
  source_coin_symbol: string;
  destination_coin_symbol: string;
  destination_amount: number;
  days: number;
  period: DCAPeriod;
  status: TradeBotStatus;
  otp: number;
}

export interface UpdateDCATradeBot {
  status?: TradeBotStatus | null;
}

export interface MartingaleTradeBot {
  id: number;
  created_at: string;
  name: string;
  source_coin_symbol: string;
  destination_coin_symbol: string;
  destination_coin_logo_url?: string | null;
  destination_coin_fa_name: string;
  destination_amount: number;
  target_profit_percentage: number;
  status: TradeBotStatus;
  is_experimental: boolean;
  total_value_irr: number;
  total_value_usdt: number;
  investment_ratio_percentage: number;
  investment_count: number;
  price_reduction_percentage: number;
}

export interface CreateMartingaleTradeBot {
  name: string;
  source_coin_symbol: string;
  destination_coin_symbol: string;
  destination_amount: number;
  investment_ratio_percentage: number;
  investment_count: number;
  price_reduction_percentage: number;
  target_profit_percentage: number;
  otp: number;
  is_experimental?: boolean;
}

export interface CustomTradeBot {
  id: number;
  created_at: string;
  name: string;
  source_coin_symbol: string;
  destination_coin_symbol: string;
  destination_coin_logo_url?: string | null;
  destination_coin_fa_name: string;
  destination_amount: number;
  target_profit_percentage: number;
  status: TradeBotStatus;
  is_experimental: boolean;
  total_value_irr: number;
  total_value_usdt: number;
  type: TradeBotType;
  period: TradeBotPeriod;
  period_count: number;
  days?: number | null;
  market_change_percentage: number;
  target_loss_amount: number;
  market_type: TradeBotMarketType;
  destination_price?: number | null;
}

export type TradeBotType = 'buy' | 'sell';
export type TradeBotPeriod = 'hour' | 'day' | 'week' | 'month';
export type TradeBotMarketType = 'market' | 'limit';

export interface CreateCustomTradeBot {
  name: string;
  source_coin_symbol: string;
  destination_coin_symbol: string;
  destination_amount: number;
  destination_price: number;
  type: TradeBotType;
  period: TradeBotPeriod;
  period_count: number;
  days: number;
  market_change_percentage: number;
  target_profit_percentage: number;
  target_loss_amount: number;
  market_type: TradeBotMarketType;
  otp: number;
  is_experimental?: boolean;
}

export interface UpdateTradeBot {
  status: TradeBotStatus;
}

export interface Investment {
  id: number;
  created_at: string;
  is_plus: boolean;
  usdt_amount: number;
  months: number;
  profit: number;
  status: TradeBotStatus;
}

export interface CreateInvestment {
  is_plus: boolean;
  usdt_amount: number;
  months: number;
}

export interface UpdateInvestment {
  status: TradeBotStatus;
}

export interface BotsResponse {
  results: (DCATradeBot | MartingaleTradeBot | CustomTradeBot)[];
}

export interface InvestmentsResponse {
  results: Investment[];
}

// Coin Deposit Network interfaces
export interface CoinDepositNetwork {
  id: number;
  created_at: string;
  updated_at: string;
  coin: BaseCoin | null;
  type: string;
  network: string;
  address: string;
  is_active: boolean;
}

export interface CoinDepositNetworksResponse {
  results: CoinDepositNetwork[];
}

export interface CreateCoinDepositNetwork {
  coin_id: number;
  type: string;
  network: string;
  address: string;
  is_active?: boolean;
}

export interface UpdateCoinDepositNetwork {
  coin_id?: number | null;
  type?: string | null;
  network?: string | null;
  address?: string | null;
  is_active?: boolean | null;
}

// Coin Withdrawal Network interfaces
export interface CoinWithdrawalNetwork {
  id: number;
  created_at: string;
  updated_at: string;
  coin: BaseCoin | null;
  network: string;
  is_active: boolean;
}

export interface CoinWithdrawalNetworksResponse {
  results: CoinWithdrawalNetwork[];
}

export interface CreateCoinWithdrawalNetwork {
  coin_id: number;
  network: string;
  is_active?: boolean;
}

export interface UpdateCoinWithdrawalNetwork {
  coin_id?: number | null;
  network?: string | null;
  is_active?: boolean | null;
}

// Invoice interfaces
export interface Invoice {
  id: number;
  created_at: string;
  user_id: number;
  is_finalized: boolean;
  price: number;
  transactions: Transaction[];
}

export interface InvoiceFilter {
  user_id?: number | null;
  is_finalized?: boolean | null;
}

export type InvoiceOrderBy = 'id' | 'created_at' | 'user_id' | 'is_finalized';

export interface InvoicePaginatedResponse {
  count: number;
  next: number | null;
  previous: number | null;
  results: Invoice[];
}

// Transaction interfaces
export interface Transaction {
  created_at: string;
  user_id: number;
  doc_id: number;
  title: string;
  debt: number;
  claim: number;
  balance: number;
}

export interface TransactionFilter {
  id?: number | null;
  created_at?: string | null;
  user_id?: number | null;
  group_id?: number | null;
}

export type TransactionsOrderBy = 'id' | 'created_at';

export interface TransactionPaginatedResponse {
  count: number;
  next: number | null;
  previous: number | null;
  results: Transaction[];
}

// Transaction Group interfaces
export interface TransactionGroup {
  id: number;
  created_at: string;
  user_id: number;
  doc_id: number;
  title: string;
  debt: number;
  claim: number;
  balance: number;
  is_editable: boolean;
}

export interface TransactionGroupFilter {
  user_id?: number | null;
  doc_id?: number | null;
  title?: string | null;
}

export type TransactionGroupOrderBy = 'id' | 'created_at';

export interface TransactionGroupPaginatedResponse {
  count: number;
  next: number | null;
  previous: number | null;
  results: TransactionGroup[];
}
