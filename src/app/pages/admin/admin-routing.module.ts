import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnergyComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { VendorsComponent } from './vendors/vendors.component';
import { CoinsComponent } from './coins/coins.component';
import { KYCComponent } from './kyc/kyc.component';
import { OrderPlaygroundComponent } from './orders/order-playground.component';
import { TicketsComponent } from './tickets/tickets.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { FAQComponent } from './faq/faq.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { DepositsComponent } from './deposits/deposits.component';
import { WithdrawalsComponent } from './withdrawals/withdrawals.component';
import { OrdersComponent } from './orders/orders.component';
import { BotsComponent } from './bots/bots.component';
import { UsersComponent } from './users/users.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionGroupsComponent } from './transaction-groups/transaction-groups.component';

const routes: Routes = [
  {
    path: '',
    component: EnergyComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'vendors',
        component: VendorsComponent
      },
      {
        path: 'coins',
        component: CoinsComponent
      },
      {
        path: 'kyc',
        component: KYCComponent
      },
      {
        path: 'orders/playground',
        component: OrderPlaygroundComponent
      },
      {
        path: 'tickets',
        component: TicketsComponent
      },
      {
        path: 'notifications',
        component: NotificationsComponent
      },
      {
        path: 'faq',
        component: FAQComponent
      },
      {
        path: 'contact-info',
        component: ContactInfoComponent
      },
      {
        path: 'deposits',
        component: DepositsComponent
      },
      {
        path: 'withdrawals',
        component: WithdrawalsComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'bots',
        component: BotsComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'invoices',
        component: InvoicesComponent
      },
      {
        path: 'transactions',
        component: TransactionsComponent
      },
      {
        path: 'transaction-groups',
        component: TransactionGroupsComponent
      },
      {
        path: '',
        redirectTo: 'forms',
        pathMatch: 'full'
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class EnergyRoutingModule {
}

