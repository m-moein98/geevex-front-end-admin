import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NbDialogRef, NbDialogService } from "@nebular/theme";
import { ToastService } from "../../../../pages/toast-service";
import { AdminService } from "../../../../pages/admin/admin-service";

@Component({
  styleUrls: ["change-password.component.scss"],
  templateUrl: "change-password.component.html",
  selector: "change-password",
})
export class ChangePasswordComponent implements OnInit {
  constructor(
    protected ref: NbDialogRef<ChangePasswordComponent>,
    private service: AdminService,
    private toastService: ToastService,
    private dialogService: NbDialogService,
  ) { }
  user = JSON.parse(localStorage.getItem("user"));
  passwordForm = new FormGroup({
    new_password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    confirm_password: new FormControl("", [Validators.required, Validators.minLength(6)]),
  }, {
    validators: this.checkPasswords
  });

  checkPasswords(group: FormGroup) {
    const pass = group.get('new_password').value;
    const confirmPass = group.get('confirm_password').value;
    return pass === confirmPass ? null : { notSame: true }
  }

  ngOnInit(): void {
    document.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        if (this.passwordForm.valid) {
          this.onSubmit()
        }
      }
    })
  }

  onSubmit() {
    this.service.changePassword(this.passwordForm.value).subscribe((res) => {
      this.toastService.showToast("success", "success", "Password changed successfully");
      this.ref.close();
    }, (err) => {
      this.toastService.showToast("danger", "error", "This password cannot be used");
    });
  }
}
