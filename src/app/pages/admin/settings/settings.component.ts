import { Component, OnInit } from "@angular/core";
import { AdminService } from "../admin-service";
import { ToastService } from "../../toast-service";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "ngx-settings",
  styleUrls: ["./settings.component.scss"],
  templateUrl: "./settings.component.html",
})
export class SettingsComponent implements OnInit {
  constructor(
    private service: AdminService,
    private toastService: ToastService,
    private router: Router,
  ) { }
  files = []
  form = new FormGroup({
    name: new FormControl("", Validators.required),
    file: new FormControl("", Validators.required),
  });
  ngOnInit() {
    this.getSettings()
  }
  getSettings() { }
  fileName(formControlName: any) {
    if (this.files.find(file => file.id === formControlName)) {
      return this.files.find(file => file.id === formControlName).name;
    }
    const file = this.form.get(formControlName.toString()).value;
    const proccessedFile = new File([file], file);
    this.files.push(
      {
        "id": formControlName,
        "name": proccessedFile.name.split("\\").pop()
      }
    )
    return proccessedFile.name.split("\\").pop();
  }
  selectFile() {
    const fileSelector = document.querySelector(
      '[id="file"]'
    ) as HTMLElement;
    fileSelector.click();
  }
  uploadFile(event: any, id: any) {
    const control = this.form.get(id.toString());
    if (event.target.files.length === 0) {
      return;
    }
    if (event.target.files[0].size > 50000000) {
      this.toastService.showToast(
        "danger",
        "error",
        "File size is greater than 50 MB"
      );
      control.setValue("");
      return;
    }
    if (
      event.target.files[0].type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
      event.target.files[0].type !== "application/vnd.ms-excel"
    ) {
      this.toastService.showToast(
        "danger",
        "error",
        "File format must be excel"
      );
      control.setValue("");
      return;
    }
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    this.service.uploadFile(formData).subscribe(
      (res: any) => {
        control.setValue(res);
      },
      () => {
        this.toastService.showToast("danger", "error", "file upload error");
      }
    );
  }
  add() {

  }
  replace() {

  }
  delete() {

  }
}
