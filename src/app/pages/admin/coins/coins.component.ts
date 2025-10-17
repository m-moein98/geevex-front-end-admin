import { Component } from "@angular/core";
import { AdminService } from "../admin-service";
import { NbDialogService } from "@nebular/theme";
import { BaseTableComponent } from "../base-table/base-table.component";
import { Coin, CoinsResponse, Vendor } from "../admin.model";
import { SetCoinVendorDialogComponent } from "./set-coin-vendor/set-coin-vendor.component";
import { SetCoinLogoDialogComponent } from "./set-coin-logo/set-coin-logo.component";

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
  }
  coins: Coin[]

  settingsFactory = () => ({
    ...this.defaultSettings,
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      ...this.defaultColumns,
      name: {
        title: 'Name',
        width: '15%',
      },
      fa_name: {
        title: 'Fa Name',
        width: '15%',
      },
      symbol: {
        title: 'Symbol',
        width: '15%',
      },
      daily_starting_price: {
        title: 'Daily Starting Price',
        width: '15%',
      },
      price: {
        title: 'Price',
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
      vendor: {
        title: 'Vendor',
        width: '15%',
        valuePrepareFunction: (value: Vendor) => {
          return value.name;
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
      logo_url: {
        title: 'Logo',
        width: '15%',
        ...this.imageColumnParams,
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
    },
  });

  ngOnInit() {
    this.getCoins()
  }

  getCoins() {
    this.service.getCoins().subscribe(
      (res: CoinsResponse) => {
        this.coins = res.results
        this.pagination = {
          count: res.count, next: res.next, previous: res.previous
        }
        this.isLoading = false
        this.source.load(this.coins)
        this.settings = this.settingsFactory()
      }
    );
  }
}
