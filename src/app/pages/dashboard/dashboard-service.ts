import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from "@nebular/theme";
import { Observable } from "rxjs";
import { apiEndpoints } from "../constants/apiendpoints";
@Injectable({
    providedIn: 'root'
})
export class ExposeService {
    constructor(
        private http: HttpClient,
        private toastrService: NbToastrService
    ) { }
    config: NbToastrConfig;
    index = 1;
    destroyByClick = true;
    duration = 2000;
    hasIcon = true;
    position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
    preventDuplicates = false;
    status: NbComponentStatus = 'primary';
    private showToast(type: NbComponentStatus, title: string, body: string) {
        const config = {
            status: type,
            destroyByClick: this.destroyByClick,
            duration: this.duration,
            hasIcon: this.hasIcon,
            position: this.position,
            preventDuplicates: this.preventDuplicates,
        };
        const titleContent = title ? `. ${title}` : '';

        this.index += 1;
        this.toastrService.show(
            body,
            `Toast ${this.index}${titleContent}`,
            config);
    }

}