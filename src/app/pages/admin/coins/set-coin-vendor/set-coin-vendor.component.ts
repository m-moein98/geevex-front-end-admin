import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { BasicResponse, Coin, Vendor, VendorsResponse } from '../../admin.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin-service';
import { ToastService } from '../../../toast-service';

@Component({
  selector: 'ngx-set-coin-vendor-dialog',
  templateUrl: 'set-coin-vendor.component.html',
})
export class SetCoinVendorDialogComponent implements OnInit {
  rowData: Coin;
  vendors: Vendor[]
  isLoading = true
  isSubmitting = false;
  form: FormGroup = new FormGroup({
    vendor_id: new FormControl(null, [Validators.required]),
  });

  constructor(
    protected ref: NbDialogRef<SetCoinVendorDialogComponent>,
    private service: AdminService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.getVendors()
  }

  getVendors() {
    this.service.getVendors().subscribe(
      (res: VendorsResponse) => {
        this.vendors = res.results
        this.isLoading = false
      }
    );
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.isSubmitting = true;

    const vendorId = this.form.value.vendor_id;
    const coinId = this.rowData.id;

    this.service.setCoinVendor(vendorId, coinId).subscribe({
      next: (res: BasicResponse) => {
        this.toastService.showToast('success', 'Success', res.detail || 'Vendor set successfully');
        this.ref.close(true);
      },
      error: () => {
        this.toastService.showToast('danger', 'Error', 'Failed to set vendor');
        this.isSubmitting = false;
      },
    });
  }

}