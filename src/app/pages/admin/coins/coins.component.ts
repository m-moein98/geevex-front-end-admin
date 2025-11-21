import { Component } from "@angular/core";
import { AdminService } from "../admin-service";
import { NbDialogService } from "@nebular/theme";
import { BaseTableComponent } from "../base-table/base-table.component";
import { Coin, Vendor } from "../admin.model";
import { SetCoinVendorDialogComponent } from "./set-coin-vendor/set-coin-vendor.component";
import { SetCoinLogoDialogComponent } from "./set-coin-logo/set-coin-logo.component";
import { concatMap, tap } from 'rxjs/operators';
import { SetCoinDescriptionDialogComponent } from "./set-coin-description/set-coin-description.component";
import { SetCoinSimilarCoinsDialogComponent } from "./set-coin-similar-coins/set-coin-similar-coins.component";
import { ManageCoinDepositNetworksDialogComponent } from "./manage-coin-deposit-networks/manage-coin-deposit-networks.component";
import { ManageCoinWithdrawalNetworksDialogComponent } from "./manage-coin-withdrawal-networks/manage-coin-withdrawal-networks.component";

@Component({
  selector: "ngx-coins",
  styleUrls: ["./coins.component.scss"],
  templateUrl: "./coins.component.html",
})
export class CoinsComponent extends BaseTableComponent {

  constructor(
    private service: AdminService,
    private dialogService: NbDialogService
  ) {
    super()
    this.source.onAdded().pipe(
      tap(() => { }),
      concatMap(payload => this.service.createCoin(payload)),
    ).subscribe(this.updateObserver)
  }
  coins: Coin[]

  settingsFactory = () => ({
    ...this.defaultSettings,
    actions: {
      add: true,
      edit: false,
      delete: false,
    },
    columns: {
      ...this.defaultColumns,
      name: {
        title: 'Name',
        width: '15%',
      },
      logo_url: {
        title: 'Logo',
        width: '15%',
        ...this.imageColumnParams,
      },
      symbol: {
        title: 'Symbol',
        width: '10%',
      },
      fa_name: {
        title: 'Fa Name',
        width: '15%',
      },
      irr_price: {
        title: 'IRR Price',
        width: '15%',
      },
      usdt_price: {
        title: 'USDT Price',
        width: '15%',
      },
      is_sellable: {
        title: 'Is Sellable',
        ...this.boolColumnParams,
      },
      is_buyable: {
        title: 'Is Buyable',
        ...this.boolColumnParams,
      },
      amount_precision: {
        title: 'Amount Precision',
        width: '15%',
      },
      price_precision: {
        title: 'Price Precision',
        width: '15%',
      },
      minimum_buy_amount: {
        title: 'Minimum Buy Amount',
        width: '15%',
      },
      minimum_sell_amount: {
        title: 'Minimum Sell Amount',
        width: '15%',
      },
      maximum_buy_amount: {
        title: 'Maximum Buy Amount',
        width: '15%',
      },
      maximum_sell_amount: {
        title: 'Maximum Sell Amount',
        width: '15%',
      },
      similar_coins: {
        title: 'Similar Coins',
        width: '15%',
        ...this.customColumnParams,
        onComponentInitFunction: (instance) => {
          instance.buttonClick.subscribe((rowData: Coin) => {
            this.dialogService.open(SetCoinSimilarCoinsDialogComponent, {
              context: { rowData }
            })
          })
        },
      },
      description: {
        title: 'Description',
        ...this.customColumnParams,
        onComponentInitFunction: (instance) => {
          instance.buttonClick.subscribe((rowData: Coin) => {
            this.dialogService.open(SetCoinDescriptionDialogComponent, {
              context: { rowData, fieldName: 'description', title: rowData.description?.title, text: rowData.description?.text }
            })
          })
        },
      },
      secondary_description: {
        title: 'Secondary Description',
        ...this.customColumnParams,
        onComponentInitFunction: (instance) => {
          instance.buttonClick.subscribe((rowData: Coin) => {
            this.dialogService.open(SetCoinDescriptionDialogComponent, {
              context: { rowData, fieldName: 'secondary_description' }
            })
          })
        },

      },
      changeVendor: {
        title: 'Change Vendor',
        ...this.customColumnParams,
        onComponentInitFunction: (instance) => {
          instance.buttonClick.subscribe((rowData: Coin) => {
            this.dialogService.open(SetCoinVendorDialogComponent, {
              context: { rowData }
            }).onClose.subscribe(() => this.getCoins())
          })
        },
      },
      changeLogo: {
        title: 'Change Logo',
        ...this.customColumnParams,
        onComponentInitFunction: (instance) => {
          instance.buttonClick.subscribe((rowData: Coin) => {
            this.dialogService.open(SetCoinLogoDialogComponent, {
              context: { rowData }
            }).onClose.subscribe(() => this.getCoins())
          })
        },
      },
      manageDepositNetworks: {
        title: 'Manage Deposit Networks',
        ...this.customColumnParams,
        onComponentInitFunction: (instance) => {
          instance.buttonClick.subscribe((rowData: Coin) => {
            this.dialogService.open(ManageCoinDepositNetworksDialogComponent, {
              context: { rowData }
            }).onClose.subscribe(() => this.getCoins())
          })
        },
      },
      manageWithdrawalNetworks: {
        title: 'Manage Withdrawal Networks',
        ...this.customColumnParams,
        onComponentInitFunction: (instance) => {
          instance.buttonClick.subscribe((rowData: Coin) => {
            this.dialogService.open(ManageCoinWithdrawalNetworksDialogComponent, {
              context: { rowData }
            }).onClose.subscribe(() => this.getCoins())
          })
        },
      },
    },
  });

  ngOnInit() {
    this.getCoins()
  }

  getCoins() {
    this.service.getCoins().subscribe(
      (res: Coin[]) => {
        this.coins = res
        this.isLoading = false
        this.source.load(this.coins)
        this.settings = this.settingsFactory()
      }
    );
  }
}
