import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Vendor } from '../../admin.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-edit-vendor-metadata-dialog',
  templateUrl: 'edit-vendor-metadata.component.html',
})
export class EditVendorMetadataDialogComponent implements OnInit {
  rowData: Vendor;
  forms: { [key: string]: FormGroup } = {};

  constructor(
    protected ref: NbDialogRef<EditVendorMetadataDialogComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.rowData.coin_map.forEach((coin) => {
      this.forms[coin.symbol] = this.fb.group({
        price_multiplier: [coin.price_multiplier],
        omp_buy_market_id: [coin.metadata.omp_buy_market_id],
        omp_sell_market_id: [coin.metadata.omp_sell_market_id],
      });
    });
  }
}