import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Vendor } from '../../admin.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../../admin-service';
import { ToastService } from '../../../toast-service';

@Component({
  selector: 'ngx-edit-vendor-metadata-dialog',
  templateUrl: 'edit-vendor-metadata.component.html',
})
export class EditVendorMetadataDialogComponent implements OnInit {
  rowData: Vendor;
  forms: { [key: string]: FormGroup } = {};

  constructor(
    protected ref: NbDialogRef<EditVendorMetadataDialogComponent>,
    private fb: FormBuilder,
    private service: AdminService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.rowData.coin_map.forEach((coin) => {
      this.forms[coin.symbol] = this.fb.group({
        price_multiplier: [coin.price_multiplier],
        omp_buy_market_id: [coin.metadata.omp_buy_market_id],
        omp_sell_market_id: [coin.metadata.omp_sell_market_id],
      });
    });
  }
  updateCoinmap(symbol: string) {
    const updated = this.forms[symbol].value;
    this.rowData.coin_map.find(coin => coin.symbol === symbol).metadata.omp_buy_market_id = updated.omp_buy_market_id;
    this.rowData.coin_map.find(coin => coin.symbol === symbol).metadata.omp_sell_market_id = updated.omp_sell_market_id;
    this.rowData.coin_map.find(coin => coin.symbol === symbol).price_multiplier = updated.price_multiplier;
    this.service.updateVendor(this.rowData).subscribe(
      (res) => {
        this.toastService.showToast('success', 'success', res.detail)
        this.ref.close();
      },
      () => {
        this.toastService.showToast('danger', 'error', 'Something went wrong')
      }
    );
  }

  deleteCoinmap(symbol: string) {
    this.rowData.coin_map = this.rowData.coin_map.filter(
      (coin) => coin.symbol !== symbol
    );
    delete this.forms[symbol];
    this.service.updateVendor(this.rowData).subscribe(
      (res) => {
        this.toastService.showToast('success', 'success', res.detail)
      },
      () => {
        this.toastService.showToast('danger', 'error', 'Something went wrong')
      }
    );
  }
}