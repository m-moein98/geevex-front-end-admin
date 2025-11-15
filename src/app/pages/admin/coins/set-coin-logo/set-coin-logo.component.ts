import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { AdminService } from '../../admin-service';
import { ToastService } from '../../../toast-service';
import { Coin } from '../../admin.model';

@Component({
  selector: 'ngx-set-coin-logo-dialog',
  templateUrl: 'set-coin-logo.component.html',
})
export class SetCoinLogoDialogComponent implements OnInit {
  rowData: Coin;

  form = new FormGroup({
    file: new FormControl("", Validators.required),
  });

  constructor(
    protected ref: NbDialogRef<SetCoinLogoDialogComponent>,
    private service: AdminService,
    private toastService: ToastService
  ) { }

  ngOnInit() { }

  fileName(): string {
    const fileControl = this.form.get('file');
    const file = fileControl?.value;
    if (!file) return '';

    if (typeof file === 'object' && file && 'name' in file) {
      return (file as File).name;
    }

    return file.toString();
  }

  selectFile() {
    const fileSelector = document.getElementById('file') as HTMLElement;
    fileSelector.click();
  }

  uploadFile(event: any) {
    const control = this.form.get('file');
    if (event.target.files.length === 0) return;

    const file = event.target.files[0];
    console.log(file.type)
    if (file.type !== 'image/svg+xml') {
      this.toastService.showToast("danger", "error", "File must be a .svg image with image/svg+xml type");
      control?.setValue("");
      return;
    }

    const formData = new FormData();
    formData.append("logo", file);

    this.service.setCoinLogo(this.rowData.id, formData).subscribe({
      next: (res: any) => {
        console.log(res)
        this.toastService.showToast('success', 'success', res.detail)
        this.ref.close()
      },
      error: () => {
        this.toastService.showToast("danger", "error", "File upload error");
      }
    });
  }
}
