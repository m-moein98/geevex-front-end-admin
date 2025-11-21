import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin-service';
import { NbDialogService } from '@nebular/theme';
import { ToastService } from '../../toast-service';
import { BasicResponse } from '../admin.model';

@Component({
    selector: 'ngx-order-playground',
    templateUrl: './order-playground.component.html',
})
export class OrderPlaygroundComponent {
    submittedData: any = null;

    form = new FormGroup({
        coinFrom: new FormControl('', Validators.required),
        coinTo: new FormControl('', Validators.required),
        destinationAmount: new FormControl('', [Validators.required, Validators.min(0.0000001)]),
        destinationPrice: new FormControl(''),
    });

    constructor(
        private service: AdminService,
        private dialogService: NbDialogService,
        private toastService: ToastService,
    ) { }

    submit() {
        if (this.form.valid) {
            this.submittedData = this.form.value;
            this.service.createOrder({
                type: 'MARKET',
                action: 'buy',
                source_coin_symbol: this.submittedData.coinFrom,
                destination_coin_symbol: this.submittedData.coinTo,
                destination_amount: this.submittedData.destinationAmount,
                destination_price: this.submittedData.destinationPrice,
            }).subscribe({
                next: (res: BasicResponse) => {
                    this.toastService.showToast('success', 'Success', res.detail || 'Order created successfully');
                },
                error: () => {
                    this.toastService.showToast('danger', 'Error', 'Failed to create order');
                },
            });
        }
    }
}
