import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { AdminService } from '../../admin-service';
import { Deposit, DepositsResponse, Pagination } from '../../admin.model';

@Component({
  selector: 'ngx-user-deposits-dialog',
  templateUrl: './user-deposits-dialog.component.html',
  styleUrls: ['./user-deposits-dialog.component.scss'],
})
export class UserDepositsDialogComponent implements OnInit {
  
  userId: number;
  userPhone: string;
  deposits: Deposit[] = [];
  isLoading = true;
  pagination: Pagination | null = null;

  filters = {
    page: 1,
    page_size: 10,
    user_id: null as number | null,
    status: '',
    type: '',
    admin_view: true,
  };

  constructor(
    protected dialogRef: NbDialogRef<UserDepositsDialogComponent>,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.filters.user_id = this.userId;
    this.loadDeposits();
  }

  loadDeposits(): void {
    this.isLoading = true;
    
    const params: any = { ...this.filters };
    
    // Remove empty string values
    Object.keys(params).forEach(key => {
      if (params[key] === '') {
        delete params[key];
      }
    });

    this.adminService.getDeposits(params).subscribe({
      next: (data: DepositsResponse) => {
        this.deposits = data.results;
        this.pagination = {
          count: data.results.length,
          next: null,
          previous: null,
        };
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load deposits:', error);
        this.isLoading = false;
      }
    });
  }

  getDepositStatusBadge(status: string): string {
    switch (status) {
      case 'INCOMPLETE':
        return 'basic';
      case 'CHECKING':
        return 'warning';
      case 'COMPLETED':
        return 'success';
      case 'CANCELLED':
        return 'danger';
      case 'REJECTED':
        return 'danger';
      default:
        return 'basic';
    }
  }

  getDepositTypeBadge(type: string): string {
    switch (type) {
      case 'CRYPTO':
        return 'primary';
      case 'CARD_PAYMENT':
        return 'info';
      case 'IBAN_PAYMENT':
        return 'success';
      case 'SHETAB_PAYMENT':
        return 'warning';
      default:
        return 'basic';
    }
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      // Could add a toast notification here
      console.log('Address copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy address: ', err);
    });
  }

  nextPage(): void {
    if (this.pagination?.next) {
      this.filters.page++;
      this.loadDeposits();
    }
  }

  previousPage(): void {
    if (this.pagination?.previous) {
      this.filters.page--;
      this.loadDeposits();
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}