import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService,
} from "@nebular/theme";
import { Observable } from "rxjs";
import { BasicResponse, Coin, CoinsResponse, CreateCoin, CreateOrderRequest, KYCsResponse, UpdateCoin, Vendor, VendorsResponse,
  Ticket, TicketCreateRequest, TicketUpdateRequest, TicketRateRequest, TicketsResponse,
  Notification, NotificationCreate, NotificationsResponse,
  FAQ, FAQCreate, FAQUpdate, FAQResponse,
  ContactInfo,
  Order, OrderResponse, UpdateOrder,
  Deposit, CreateDeposit, UpdateDeposit, DepositsResponse,
  Withdrawal, CreateWithdrawal, UpdateWithdrawal, WithdrawalsResponse,
  DCATradeBot, CreateDCATradeBot, UpdateDCATradeBot,
  MartingaleTradeBot, CreateMartingaleTradeBot, UpdateTradeBot,
  CustomTradeBot, CreateCustomTradeBot,
  Investment, CreateInvestment, UpdateInvestment, InvestmentsResponse,
  CoinDepositNetwork, CoinDepositNetworksResponse, CreateCoinDepositNetwork, UpdateCoinDepositNetwork,
  CoinWithdrawalNetwork, CoinWithdrawalNetworksResponse, CreateCoinWithdrawalNetwork, UpdateCoinWithdrawalNetwork,
  User, UsersResponse, UserListFilter, UserListOrderBy, Wallet, WalletsResponse,
  Invoice, InvoiceFilter, InvoiceOrderBy, InvoicePaginatedResponse,
  Transaction, TransactionFilter, TransactionsOrderBy, TransactionPaginatedResponse,
  TransactionGroup, TransactionGroupFilter, TransactionGroupOrderBy, TransactionGroupPaginatedResponse } from "./admin.model";

import { catchError, tap } from "rxjs/operators";
import { apiEndpoints } from "../constants/apiendpoints";
import { Router } from "@angular/router";

function decodeJwt(token: string): any {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );

  return JSON.parse(jsonPayload);
}

@Injectable({
  providedIn: "root",
})
export class AdminService {
  constructor(
    private http: HttpClient,
    private toastrService: NbToastrService,
    private router: Router
  ) { }
  config: NbToastrConfig;

  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = "primary";
  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `. ${title}` : "";

    this.index += 1;
    this.toastrService.show(body, `message ${this.index}${titleContent}`, config);
  }
  getCurrentUser(): Observable<any> {
    return this.http.get<any>(apiEndpoints.user).pipe(
      catchError((err) => {
        localStorage.clear()
        throw err
      })
    )
  }
  changePassword(data: any) {
    return this.http.patch(apiEndpoints.user, data)
  }
  login(username: number, password: string) {
    return this.http.post(apiEndpoints.login, { "phone": username, password }).pipe(
      tap((res) => {
        if (decodeJwt(res["access"])["is_superuser"]) {
          this.showToast('success', 'success', 'Successfully logged in')
          localStorage.setItem('accessToken', res["access"])
          localStorage.setItem('decodedToken', JSON.stringify(decodeJwt(res["access"])))
          localStorage.setItem('refreshToken', res["refresh"])
          this.router.navigate(['pages/admin/coins'])
        } else {
          this.showToast('danger', 'error', 'Invalid username or password')
          throw new Error('Invalid username or password')
        }
      }
      ),
      catchError((err) => {
        this.showToast('danger', 'error', 'Invalid username or password')
        throw err
      })
    )
  }
  uploadFile(data: FormData): Observable<any> {
    return this.http.post<any>(apiEndpoints.upload, data);
  }
  addVendor(data: Vendor): Observable<any> {
    return this.http.post<any>(apiEndpoints.vendors, data)
  }
  getVendors(): Observable<VendorsResponse> {
    return this.http.get<VendorsResponse>(apiEndpoints.vendors)
  }
  updateVendor(data: Vendor): Observable<BasicResponse> {
    return this.http.patch<BasicResponse>(apiEndpoints.vendors + data.id, data)
  }
  getCoins(): Observable<Coin[]> {
    return this.http.get<Coin[]>(apiEndpoints.getCoins)
  }
  setCoinVendor(vendorId: number, coinId: number): Observable<BasicResponse> {
    return this.http.patch<BasicResponse>(`${apiEndpoints.vendors}${vendorId}/coins/${coinId}/`, {})
  }
  setCoinLogo(coinId: number, data: FormData): Observable<BasicResponse> {
    return this.http.patch<BasicResponse>(`${apiEndpoints.coins}${coinId}/update-coin/`, data)
  }
  createCoin(data: CreateCoin): Observable<BasicResponse> {
    return this.http.post<BasicResponse>(apiEndpoints.coins, data)
  }
  updateCoin(coinId: number, data: UpdateCoin): Observable<BasicResponse> {
    return this.http.patch<BasicResponse>(`${apiEndpoints.coins}${coinId}/`, data)
  }
  getKYCs(): Observable<KYCsResponse> {
    return this.http.get<KYCsResponse>(apiEndpoints.kyc)
  }
  updateKYCStatus(kycId: number, status: string): Observable<BasicResponse> {
    return this.http.patch<BasicResponse>(`${apiEndpoints.kyc}${kycId}/`, { status })
  }
  createOrder(data: CreateOrderRequest): Observable<BasicResponse> {
    return this.http.post<BasicResponse>(apiEndpoints.orders, data)
  }

  // Tickets API methods
  getTickets(status?: string): Observable<TicketsResponse> {
    const url = status ? `${apiEndpoints.tickets}?status=${status}` : apiEndpoints.tickets;
    return this.http.get<TicketsResponse>(url);
  }

  getTicket(ticketId: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${apiEndpoints.tickets}${ticketId}`);
  }

  createTicket(data: TicketCreateRequest): Observable<Ticket> {
    return this.http.post<Ticket>(`${apiEndpoints.tickets}create/`, data);
  }

  updateTicket(ticketId: number, data: TicketUpdateRequest): Observable<Ticket> {
    return this.http.post<Ticket>(`${apiEndpoints.tickets}${ticketId}/response/`, data);
  }

  deleteTicket(ticketId: number): Observable<BasicResponse> {
    return this.http.delete<BasicResponse>(`${apiEndpoints.tickets}${ticketId}/`);
  }

  rateTicket(ticketId: number, data: TicketRateRequest): Observable<Ticket> {
    return this.http.post<Ticket>(`${apiEndpoints.tickets}${ticketId}/rate/`, data);
  }

  // Notifications API methods
  getNotifications(tab?: string): Observable<NotificationsResponse> {
    const url = tab ? `${apiEndpoints.notifications}?tab=${tab}` : apiEndpoints.notifications;
    return this.http.get<NotificationsResponse>(url);
  }

  createNotification(data: NotificationCreate): Observable<Notification> {
    return this.http.post<Notification>(`${apiEndpoints.notifications}create`, data);
  }

  markNotificationAsRead(notificationId: number): Observable<BasicResponse> {
    return this.http.post<BasicResponse>(`${apiEndpoints.notifications}mark-read/${notificationId}`, {});
  }

  deleteNotification(notificationId: number): Observable<BasicResponse> {
    return this.http.delete<BasicResponse>(`${apiEndpoints.notifications}${notificationId}`);
  }

  // FAQ API methods
  getFAQs(category?: string, page?: number, pageSize?: number): Observable<FAQResponse> {
    let url = apiEndpoints.faq;
    const params = [];
    if (category && category !== 'all') params.push(`category=${category}`);
    if (page) params.push(`page=${page}`);
    if (pageSize) params.push(`page_size=${pageSize}`);
    if (params.length > 0) url += '?' + params.join('&');
    return this.http.get<FAQResponse>(url);
  }

  createFAQ(data: FAQCreate): Observable<FAQ> {
    return this.http.post<FAQ>(apiEndpoints.faq, data);
  }

  updateFAQ(faqId: number, data: FAQUpdate): Observable<FAQ> {
    return this.http.put<FAQ>(`${apiEndpoints.faq}${faqId}/`, data);
  }

  deleteFAQ(faqId: number): Observable<BasicResponse> {
    return this.http.delete<BasicResponse>(`${apiEndpoints.faq}${faqId}/`);
  }

  // Contact Info API methods
  getContactInfo(): Observable<ContactInfo> {
    return this.http.get<ContactInfo>(apiEndpoints.contactInfo);
  }

  updateContactInfo(data: ContactInfo): Observable<ContactInfo> {
    return this.http.put<ContactInfo>(apiEndpoints.contactInfo, data);
  }

  // Orders API methods
  getOrders(params?: any): Observable<OrderResponse> {
    let url = apiEndpoints.orders;
    if (params) {
      const queryParams = new URLSearchParams();
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          if (Array.isArray(params[key])) {
            params[key].forEach((value: any) => queryParams.append(key, value));
          } else {
            queryParams.append(key, params[key]);
          }
        }
      });
      url += '?' + queryParams.toString();
    }
    return this.http.get<OrderResponse>(url);
  }

  getOrder(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${apiEndpoints.orders}${orderId}`);
  }

  updateOrder(orderId: number, data: UpdateOrder): Observable<Order> {
    return this.http.patch<Order>(`${apiEndpoints.orders}${orderId}`, data);
  }

  // Deposits API methods
  getDeposits(params?: any): Observable<DepositsResponse> {
    let url = apiEndpoints.deposits;
    if (params) {
      const queryParams = new URLSearchParams();
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          if (Array.isArray(params[key])) {
            params[key].forEach((value: any) => queryParams.append(key, value));
          } else {
            queryParams.append(key, params[key]);
          }
        }
      });
      url += '?' + queryParams.toString();
    }
    return this.http.get<DepositsResponse>(url);
  }

  getDeposit(depositId: number): Observable<Deposit> {
    return this.http.get<Deposit>(`${apiEndpoints.deposits}${depositId}/`);
  }

  createDeposit(data: CreateDeposit): Observable<Deposit> {
    return this.http.post<Deposit>(apiEndpoints.deposits, data);
  }

  updateDeposit(depositId: number, data: UpdateDeposit): Observable<Deposit> {
    return this.http.patch<Deposit>(`${apiEndpoints.deposits}${depositId}/`, data);
  }

  // Withdrawals API methods
  getWithdrawals(params?: any): Observable<WithdrawalsResponse> {
    let url = apiEndpoints.withdrawals;
    if (params) {
      const queryParams = new URLSearchParams();
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          if (Array.isArray(params[key])) {
            params[key].forEach((value: any) => queryParams.append(key, value));
          } else {
            queryParams.append(key, params[key]);
          }
        }
      });
      url += '?' + queryParams.toString();
    }
    return this.http.get<WithdrawalsResponse>(url);
  }

  getWithdrawal(withdrawalId: number): Observable<Withdrawal> {
    return this.http.get<Withdrawal>(`${apiEndpoints.withdrawals}${withdrawalId}/`);
  }

  createWithdrawal(data: CreateWithdrawal): Observable<Withdrawal> {
    return this.http.post<Withdrawal>(apiEndpoints.withdrawals, data);
  }

  updateWithdrawal(withdrawalId: number, data: UpdateWithdrawal): Observable<Withdrawal> {
    return this.http.patch<Withdrawal>(`${apiEndpoints.withdrawals}${withdrawalId}/`, data);
  }

  // Trade Bots API methods
  getDCATradeBots(): Observable<DCATradeBot[]> {
    return this.http.get<DCATradeBot[]>(apiEndpoints.dcaTradeBots);
  }

  createDCATradeBot(data: CreateDCATradeBot): Observable<BasicResponse> {
    return this.http.post<BasicResponse>(apiEndpoints.dcaTradeBots, data);
  }

  updateDCATradeBot(botId: number, data: UpdateDCATradeBot): Observable<BasicResponse> {
    return this.http.patch<BasicResponse>(`${apiEndpoints.dcaTradeBots}${botId}`, data);
  }

  getMartingaleTradeBots(): Observable<MartingaleTradeBot[]> {
    return this.http.get<MartingaleTradeBot[]>(apiEndpoints.martingaleTradeBots);
  }

  createMartingaleTradeBot(data: CreateMartingaleTradeBot): Observable<BasicResponse> {
    return this.http.post<BasicResponse>(apiEndpoints.martingaleTradeBots, data);
  }

  updateMartingaleTradeBot(botId: number, data: UpdateTradeBot): Observable<BasicResponse> {
    return this.http.patch<BasicResponse>(`${apiEndpoints.martingaleTradeBots}${botId}`, data);
  }

  getCustomTradeBots(): Observable<CustomTradeBot[]> {
    return this.http.get<CustomTradeBot[]>(apiEndpoints.customTradeBots);
  }

  createCustomTradeBot(data: CreateCustomTradeBot): Observable<BasicResponse> {
    return this.http.post<BasicResponse>(apiEndpoints.customTradeBots, data);
  }

  updateCustomTradeBot(botId: number, data: UpdateTradeBot): Observable<BasicResponse> {
    return this.http.patch<BasicResponse>(`${apiEndpoints.customTradeBots}${botId}`, data);
  }

  getInvestments(isPlus?: boolean): Observable<InvestmentsResponse> {
    const url = isPlus !== undefined ? `${apiEndpoints.investments}?is_plus=${isPlus}` : apiEndpoints.investments;
    return this.http.get<InvestmentsResponse>(url);
  }

  createInvestment(data: CreateInvestment): Observable<BasicResponse> {
    return this.http.post<BasicResponse>(apiEndpoints.investments, data);
  }

  updateInvestment(investmentId: number, data: UpdateInvestment): Observable<BasicResponse> {
    return this.http.patch<BasicResponse>(`${apiEndpoints.investments}${investmentId}`, data);
  }

  // Coin Deposit Networks API methods
  getCoinDepositNetworks(params?: any): Observable<CoinDepositNetworksResponse> {
    let url = apiEndpoints.coinDepositNetworks;
    if (params) {
      const queryParams = new URLSearchParams();
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          if (Array.isArray(params[key])) {
            params[key].forEach((value: any) => queryParams.append(key, value));
          } else {
            queryParams.append(key, params[key]);
          }
        }
      });
      url += '?' + queryParams.toString();
    }
    return this.http.get<CoinDepositNetworksResponse>(url);
  }

  getCoinDepositNetwork(depositNetworkId: number): Observable<CoinDepositNetwork> {
    return this.http.get<CoinDepositNetwork>(`${apiEndpoints.coinDepositNetworks}${depositNetworkId}/`);
  }

  createCoinDepositNetwork(data: CreateCoinDepositNetwork): Observable<CoinDepositNetwork> {
    return this.http.post<CoinDepositNetwork>(apiEndpoints.coinDepositNetworks, data);
  }

  updateCoinDepositNetwork(depositNetworkId: number, data: UpdateCoinDepositNetwork): Observable<CoinDepositNetwork> {
    return this.http.patch<CoinDepositNetwork>(`${apiEndpoints.coinDepositNetworks}${depositNetworkId}/`, data);
  }

  deleteCoinDepositNetwork(depositNetworkId: number): Observable<BasicResponse> {
    return this.http.delete<BasicResponse>(`${apiEndpoints.coinDepositNetworks}${depositNetworkId}/`);
  }

  // Coin Withdrawal Networks API methods
  getCoinWithdrawalNetworks(params?: any): Observable<CoinWithdrawalNetworksResponse> {
    let url = apiEndpoints.coinWithdrawalNetworks;
    if (params) {
      const queryParams = new URLSearchParams();
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          if (Array.isArray(params[key])) {
            params[key].forEach((value: any) => queryParams.append(key, value));
          } else {
            queryParams.append(key, params[key]);
          }
        }
      });
      url += '?' + queryParams.toString();
    }
    return this.http.get<CoinWithdrawalNetworksResponse>(url);
  }

  getCoinWithdrawalNetwork(withdrawalNetworkId: number): Observable<CoinWithdrawalNetwork> {
    return this.http.get<CoinWithdrawalNetwork>(`${apiEndpoints.coinWithdrawalNetworks}${withdrawalNetworkId}/`);
  }

  createCoinWithdrawalNetwork(data: CreateCoinWithdrawalNetwork): Observable<CoinWithdrawalNetwork> {
    return this.http.post<CoinWithdrawalNetwork>(apiEndpoints.coinWithdrawalNetworks, data);
  }

  updateCoinWithdrawalNetwork(withdrawalNetworkId: number, data: UpdateCoinWithdrawalNetwork): Observable<CoinWithdrawalNetwork> {
    return this.http.patch<CoinWithdrawalNetwork>(`${apiEndpoints.coinWithdrawalNetworks}${withdrawalNetworkId}/`, data);
  }

  deleteCoinWithdrawalNetwork(withdrawalNetworkId: number): Observable<BasicResponse> {
    return this.http.delete<BasicResponse>(`${apiEndpoints.coinWithdrawalNetworks}${withdrawalNetworkId}/`);
  }

  // Users API methods
  getUsers(params?: any): Observable<UsersResponse> {
    let url = apiEndpoints.users;
    if (params) {
      const queryParams = new URLSearchParams();
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          if (Array.isArray(params[key])) {
            params[key].forEach((value: any) => queryParams.append(key, value));
          } else {
            queryParams.append(key, params[key]);
          }
        }
      });
      url += '?' + queryParams.toString();
    }
    return this.http.get<UsersResponse>(url);
  }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${apiEndpoints.user}${userId}/`);
  }

  // Wallet API methods
  getWallets(params?: any): Observable<WalletsResponse> {
    let url = apiEndpoints.wallet;
    if (params) {
      const queryParams = new URLSearchParams();
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          queryParams.append(key, params[key]);
        }
      });
      url += '?' + queryParams.toString();
    }
    return this.http.get<WalletsResponse>(url);
  }

  getWallet(coinSymbol: string): Observable<Wallet> {
    return this.http.get<Wallet>(`${apiEndpoints.wallet}${coinSymbol}/`);
  }

  // Invoices API methods
  getInvoices(params?: any): Observable<InvoicePaginatedResponse> {
    let url = apiEndpoints.invoices;
    if (params) {
      const queryParams = new URLSearchParams();
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          if (Array.isArray(params[key])) {
            params[key].forEach((value: any) => queryParams.append(key, value));
          } else {
            queryParams.append(key, params[key]);
          }
        }
      });
      url += '?' + queryParams.toString();
    }
    return this.http.get<InvoicePaginatedResponse>(url);
  }

  getTransactions(params?: any): Observable<TransactionPaginatedResponse> {
    let url = apiEndpoints.transactions;
    const queryParams = new URLSearchParams();
    queryParams.append('admin_view', 'true');
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          if (Array.isArray(params[key])) {
            params[key].forEach((value: any) => queryParams.append(key, value));
          } else {
            queryParams.append(key, params[key]);
          }
        }
      });
      url += '?' + queryParams.toString();
    }
    return this.http.get<TransactionPaginatedResponse>(url);
  }

  getTransactionGroups(params?: any): Observable<TransactionGroupPaginatedResponse> {
    let url = apiEndpoints.transactionGroups;
    const queryParams = new URLSearchParams();
    queryParams.append('admin_view', 'true');
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          if (Array.isArray(params[key])) {
            params[key].forEach((value: any) => queryParams.append(key, value));
          } else {
            queryParams.append(key, params[key]);
          }
        }
      });
      url += '?' + queryParams.toString();
    }
    return this.http.get<TransactionGroupPaginatedResponse>(url);
  }
}
