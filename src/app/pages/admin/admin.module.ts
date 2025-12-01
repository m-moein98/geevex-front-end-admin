import { NgModule } from "@angular/core";
import {
  NbAccordionModule,
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbRadioModule,
  NbSearchModule,
  NbSelectModule,
  NbSpinnerModule,
  NbUserModule,
} from "@nebular/theme";

import { ThemeModule } from "../../@theme/theme.module";
import {
  FormsModule,
  FormsModule as ngFormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { EnergyRoutingModule } from "./admin-routing.module";
import { EnergyComponent } from "./admin.component";
import { NgxEchartsModule } from "ngx-echarts";
import { FiltersComponent } from './filters/filters.component';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { LoginComponent } from "./login/login.component";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { CustomButtonComponent } from "./custom-button.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { SettingsComponent } from "./settings/settings.component";
import { VendorsComponent } from "./vendors/vendors.component";
import { EditVendorMetadataDialogComponent } from "./vendors/edit-vendor-metadata/edit-vendor-metadata.component";
import { CoinsComponent } from "./coins/coins.component";
import { SetCoinVendorDialogComponent } from "./coins/set-coin-vendor/set-coin-vendor.component";
import { SetCoinLogoDialogComponent } from "./coins/set-coin-logo/set-coin-logo.component";
import { TableRowImageComponent } from "./table-row-image.component";
import { VideoPreviewComponent } from "./video-preview/video-preview.component";
import { ImagePreviewComponent } from "./image-preview/image-preview.component";
import { KYCComponent } from "./kyc/kyc.component";
import { SetCoinDescriptionDialogComponent } from "./coins/set-coin-description/set-coin-description.component";
import { SetCoinSimilarCoinsDialogComponent } from "./coins/set-coin-similar-coins/set-coin-similar-coins.component";
import { ManageCoinDepositNetworksDialogComponent } from "./coins/manage-coin-deposit-networks/manage-coin-deposit-networks.component";
import { ManageCoinWithdrawalNetworksDialogComponent } from "./coins/manage-coin-withdrawal-networks/manage-coin-withdrawal-networks.component";
import { OrderPlaygroundComponent } from "./orders/order-playground.component";
import { TicketsComponent } from "./tickets/tickets.component";
import { TicketResponseDialogComponent } from "./tickets/ticket-response-dialog/ticket-response-dialog.component";
import { TicketActionComponent } from "./tickets/ticket-action/ticket-action.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { FAQComponent } from "./faq/faq.component";
import { ContactInfoComponent } from "./contact-info/contact-info.component";
import { DepositsComponent } from "./deposits/deposits.component";
import { WithdrawalsComponent } from "./withdrawals/withdrawals.component";
import { OrdersComponent } from "./orders/orders.component";
import { BotsComponent } from "./bots/bots.component";
import { UsersComponent } from "./users/users.component";
import { WalletDialogComponent } from "./users/wallet-dialog/wallet-dialog.component";
import { UserOrdersDialogComponent } from "./users/user-orders-dialog/user-orders-dialog.component";
import { UserWithdrawalsDialogComponent } from "./users/user-withdrawals-dialog/user-withdrawals-dialog.component";
import { UserDepositsDialogComponent } from "./users/user-deposits-dialog/user-deposits-dialog.component";
import { InvoicesComponent } from "./invoices/invoices.component";
import { InvoiceTransactionsDialogComponent } from "./invoices/invoice-transactions-dialog/invoice-transactions-dialog.component";
import { TransactionsComponent } from "./transactions/transactions.component";
import { TransactionGroupsComponent } from "./transaction-groups/transaction-groups.component";
import { TransactionGroupTransactionsDialogComponent } from "./transaction-groups/transaction-group-transactions-dialog/transaction-group-transactions-dialog.component";

@NgModule({
  imports: [
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbFormFieldModule,
    EnergyRoutingModule,
    NbSelectModule,
    NbIconModule,
    ngFormsModule,
    FormsModule,
    ReactiveFormsModule,
    NbListModule,
    NbAccordionModule,
    NgxEchartsModule,
    NgPersianDatepickerModule,
    Ng2SmartTableModule,
    NbSpinnerModule,
    DragDropModule,
    NbSearchModule,
  ],
  declarations: [
    EnergyComponent,
    SettingsComponent,
    FiltersComponent,
    LoginComponent,
    CustomButtonComponent,
    TableRowImageComponent,
    VendorsComponent,
    EditVendorMetadataDialogComponent,
    CoinsComponent,
    SetCoinVendorDialogComponent,
    SetCoinLogoDialogComponent,
    KYCComponent,
    VideoPreviewComponent,
    ImagePreviewComponent,
    SetCoinDescriptionDialogComponent,
    SetCoinSimilarCoinsDialogComponent,
    ManageCoinDepositNetworksDialogComponent,
    ManageCoinWithdrawalNetworksDialogComponent,
    OrderPlaygroundComponent,
    TicketsComponent,
    TicketResponseDialogComponent,
    TicketActionComponent,
    NotificationsComponent,
    FAQComponent,
    ContactInfoComponent,
    DepositsComponent,
    WithdrawalsComponent,
    OrdersComponent,
    BotsComponent,
    UsersComponent,
    WalletDialogComponent,
    UserOrdersDialogComponent,
    UserWithdrawalsDialogComponent,
    UserDepositsDialogComponent,
    InvoicesComponent,
    InvoiceTransactionsDialogComponent,
    TransactionsComponent,
    TransactionGroupsComponent,
    TransactionGroupTransactionsDialogComponent,
  ],
})
export class AdminModule { }

