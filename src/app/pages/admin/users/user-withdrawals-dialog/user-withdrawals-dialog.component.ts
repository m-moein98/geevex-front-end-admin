import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { AdminService } from '../../admin-service';
import { Withdrawal, WithdrawalsResponse, Pagination } from '../../admin.model';

@Component({
  selector: 'ngx-user-withdrawals-dialog',
  templateUrl: './user-withdrawals-dialog.component.html',
  styleUrls: ['./user-withdrawals-dialog.component.scss'],
})
export class UserWithdrawalsDialogComponent implements OnInit {
  
  userId: number;
  userPhone: string;
  withdrawals: Withdrawal[] = [];
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
    protected dialogRef: NbDialogRef<UserWithdrawalsDialogComponent>,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.filters.user_id = this.userId;
    this.loadWithdrawals();
  }

  loadWithdrawals(): void {
    this.isLoading = true;
    
    const params: any = { ...this.filters };
    
    // Remove empty string values
    Object.keys(params).forEach(key => {
      if (params[key] === '') {
        delete params[key];
      }
    });

    this.adminService.getWithdrawals(params).subscribe({
      next: (data: WithdrawalsResponse) => {
        this.withdrawals = data.results;
        this.pagination = {
          count: data.results.length,
          next: null,
          previous: null,
        };
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load withdrawals:', error);
        this.isLoading = false;
      }
    });
  }

  getWithdrawalStatusBadge(status: string): string {
    switch (status) {
      case 'INCOMPLETE':
        return 'basic';
      case 'APPROVED':
        return 'info';
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

  getWithdrawalTypeBadge(type: string): string {
    switch (type) {
      case 'CRYPTO':
        return 'primary';
      case 'CARD_PAYMENT':
        return 'info';
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
      this.loadWithdrawals();
    }
  }

  previousPage(): void {
    if (this.pagination?.previous) {
      this.filters.page--;
      this.loadWithdrawals();
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}