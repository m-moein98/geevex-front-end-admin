import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin-service';
import { ToastService } from '../../../toast-service';
import { BasicResponse, Coin } from '../../admin.model';

@Component({
  selector: 'ngx-set-coin-description-dialog',
  templateUrl: './set-coin-description.component.html',
})
export class SetCoinDescriptionDialogComponent implements OnInit {
  rowData!: Coin;
  title!: string;
  text!: string;
  fieldName!: string;
  isSubmitting = false;

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required),
  });

  constructor(
    protected ref: NbDialogRef<SetCoinDescriptionDialogComponent>,
    private service: AdminService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.form.patchValue({ title: this.title, text: this.text });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.isSubmitting = true;
    const updateBody = {
      ...this.rowData,
      [this.fieldName]: this.form.value,
    };

    this.service.updateCoin(this.rowData.id, updateBody).subscribe({
      next: (res: BasicResponse) => {
        this.toastService.showToast('success', 'Success', res.detail || 'Updated successfully');
        this.ref.close(true);
      },
      error: () => {
        this.toastService.showToast('danger', 'Error', 'Update failed');
        this.isSubmitting = false;
      },
    });
  }

  closeDialog(): void {
    this.ref.close();
  }
}
