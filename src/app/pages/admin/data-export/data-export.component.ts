import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiEndpoints } from '../../constants/apiendpoints';

@Component({
  selector: 'app-data-export',
  templateUrl: './data-export.component.html',
  styleUrls: ['./data-export.component.scss']
})
export class DataExportComponent {
  loading = false;
  responseDetail: any = null;

  constructor(private http: HttpClient) {}

  onExport() {
    this.loading = true;
    this.responseDetail = null;

    // POST request to dataExport endpoint (empty body)
    this.http.post(apiEndpoints.dataExport, {}).subscribe({
      next: (response: any) => {
        this.loading = false;
        // Show the 'detail' key from the response
        this.responseDetail = response.detail;
      },
      error: (error) => {
        this.loading = false;
        this.responseDetail = { error: error.message };
      }
    });
  }
}
