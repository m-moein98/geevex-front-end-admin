import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin-service';
import { ContactInfo } from '../admin.model';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss'],
})
export class ContactInfoComponent implements OnInit {
  
  contactInfo: ContactInfo | null = null;
  isLoading = false;

  constructor(
    private adminService: AdminService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.loadContactInfo();
  }

  loadContactInfo(): void {
    this.isLoading = true;
    this.adminService.getContactInfo().subscribe({
      next: (data) => {
        this.contactInfo = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.toastrService.danger('Failed to load contact information', 'Error');
        this.isLoading = false;
      }
    });
  }

  updateContactInfo(): void {
    if (!this.contactInfo) return;
    
    this.isLoading = true;
    this.adminService.updateContactInfo(this.contactInfo).subscribe({
      next: (data) => {
        this.contactInfo = data;
        this.toastrService.success('Contact information updated successfully', 'Success');
        this.isLoading = false;
      },
      error: (error) => {
        this.toastrService.danger('Failed to update contact information', 'Error');
        this.isLoading = false;
      }
    });
  }

  onFieldChange(field: keyof ContactInfo, value: string): void {
    if (this.contactInfo) {
      this.contactInfo[field] = value;
    }
  }

  resetForm(): void {
    this.loadContactInfo();
  }
}