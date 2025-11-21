let baseurl = 'https://api-dev.tplift.ir:2083/api';

export const apiEndpoints = {
    upload: `${baseurl}/form/upload/`,
    login: `${baseurl}/accounts/login/`,
    user: `${baseurl}/accounts/user/`,
    vendors: `${baseurl}/vendors/`,
    getCoins: `${baseurl}/coins/`,
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
}