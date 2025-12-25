let baseurl = 'https://api.ipharkat.ir/api';

if (process.env.NODE_ENV === 'development') {
    baseurl = 'http://localhost:8000/api';
}

export const apiEndpoints = {
    upload: `${baseurl}/form/upload/`,
    login: `${baseurl}/accounts/login/`,
    user: `${baseurl}/accounts/user/`,
    users: `${baseurl}/accounts/user/list`,
    wallet: `${baseurl}/accounts/wallet/`,
    vendors: `${baseurl}/vendors/`,
    getCoins: `${baseurl}/coins/`,
    dataExport: `${baseurl}/administration/data_export/`,
    coins: `${baseurl}/administration/coins/`,
    kyc: `${baseurl}/administration/kyc/`,
    orders: `${baseurl}/orders/`,
    tickets: `${baseurl}/accounts/ticket/`,
    notifications: `${baseurl}/accounts/notification/`,
    faq: `${baseurl}/administration/FAQ/`,
    contactInfo: `${baseurl}/administration/contact_info/`,
    deposits: `${baseurl}/orders/deposits/`,
    withdrawals: `${baseurl}/orders/withdrawals/`,
    dcaTradeBots: `${baseurl}/trade-bot/dca-trade-bot/`,
    martingaleTradeBots: `${baseurl}/trade-bot/martingle-trade-bot/`,
    customTradeBots: `${baseurl}/trade-bot/custom-trade-bot/`,
    investments: `${baseurl}/trade-bot/investment/`,
    coinDepositNetworks: `${baseurl}/coins/deposit-networks/`,
    coinWithdrawalNetworks: `${baseurl}/coins/withdrawal-networks/`,
    invoices: `${baseurl}/accounting/invoices/invoices/`,
    transactions: `${baseurl}/accounting/invoices/transactions/`,
    transactionGroups: `${baseurl}/accounting/invoices/transactionsgroups/`,
}