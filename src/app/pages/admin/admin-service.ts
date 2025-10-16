import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService,
} from "@nebular/theme";
import { Observable } from "rxjs";
import { BasicResponse, Vendor, VendorsResponse } from "./admin.model";

import { catchError, tap } from "rxjs/operators";
import { apiEndpoints } from "../constants/apiendpoints";
import { Router } from "@angular/router";

function decodeJwt(token: string): any {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );

  return JSON.parse(jsonPayload);
}

@Injectable({
  providedIn: "root",
})
export class AdminService {
  constructor(
    private http: HttpClient,
    private toastrService: NbToastrService,
    private router: Router
  ) { }
  config: NbToastrConfig;

  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = "primary";
  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `. ${title}` : "";

    this.index += 1;
    this.toastrService.show(body, `message ${this.index}${titleContent}`, config);
  }
  getUser(): Observable<any> {
    return this.http.get<any>(apiEndpoints.user).pipe(
      catchError((err) => {
        localStorage.clear()
        throw err
      })
    )
  }
  changePassword(data: any) {
    return this.http.patch(apiEndpoints.user, data)
  }
  login(username: number, password: string) {
    return this.http.post(apiEndpoints.login, { "phone": username, password }).pipe(
      tap((res) => {
        if (decodeJwt(res["access"])["is_superuser"]) {
          this.showToast('success', 'success', 'Successfully logged in')
          localStorage.setItem('accessToken', res["access"])
          localStorage.setItem('decodedToken', JSON.stringify(decodeJwt(res["access"])))
          localStorage.setItem('refreshToken', res["refresh"])
          this.router.navigate(['pages/admin/dashboard'])
        } else {
          this.showToast('danger', 'error', 'Invalid username or password')
          throw new Error('Invalid username or password')
        }
      }
      ),
      catchError((err) => {
        this.showToast('danger', 'error', 'Invalid username or password')
        throw err
      })
    )
  }
  uploadFile(data: FormData): Observable<any> {
    return this.http.post<any>(apiEndpoints.upload, data);
  }
  addVendor(data: Vendor): Observable<any> {
    return this.http.post<any>(apiEndpoints.vendors, data)
  }
  getVendors(): Observable<VendorsResponse> {
    return this.http.get<VendorsResponse>(apiEndpoints.vendors)
  }
  updateVendor(data: Vendor): Observable<BasicResponse> {
    return this.http.patch<BasicResponse>(apiEndpoints.vendors + data.id, data)
  }
}
