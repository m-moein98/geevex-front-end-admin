import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { AdminService } from '../admin-service';
import { User, UsersResponse, UserListOrderBy, Pagination } from '../admin.model';
import { BaseTableComponent } from '../base-table/base-table.component';
import { WalletDialogComponent } from './wallet-dialog/wallet-dialog.component';
import { UserOrdersDialogComponent } from './user-orders-dialog/user-orders-dialog.component';
import { UserWithdrawalsDialogComponent } from './user-withdrawals-dialog/user-withdrawals-dialog.component';
import { UserDepositsDialogComponent } from './user-deposits-dialog/user-deposits-dialog.component';

@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent extends BaseTableComponent implements OnInit {

  filters = {
    page: 1,
    page_size: 10,
    order_by: 'id' as UserListOrderBy,
    order_direction: 'asc',
    phone: '',
    email: '',
    first_name: '',
    last_name: '',
    father_name: '',
  };

  pagination: Pagination | null = null;
  selectedUser: User | null = null;

  constructor(
    private adminService: AdminService,
    private dialogService: NbDialogService
  ) {
    super();
    this.settings = {
      ...this.defaultSettings,
      actions: {
        add: false,
        edit: false,
        delete: false,
      },
      columns: {
        id: {
          title: 'ID',
          type: 'number',
          width: '80px',
        },
        created_at: {
          title: 'Created At',
          type: 'date',
          width: '150px',
          valuePrepareFunction: (date: string) => {
            return new Date(date).toLocaleDateString();
          },
        },
        phone: {
          title: 'Phone',
          type: 'string',
          width: '120px',
        },
        email: {
          title: 'Email',
          type: 'string',
          width: '200px',
        },
        first_name: {
          title: 'First Name',
          type: 'string',
          width: '120px',
        },
        last_name: {
          title: 'Last Name',
          type: 'string',
          width: '120px',
        },
        father_name: {
          title: 'Father Name',
          type: 'string',
          width: '120px',
        },
        balance: {
          title: 'Balance',
          type: 'number',
          width: '120px',
          valuePrepareFunction: (value: number) => {
            return value ? value.toFixed(2) : '0.00';
          },
        },
        total_referral_count: {
          title: 'Referrals',
          type: 'number',
          width: '100px',
        },
        kyc_status: {
          title: 'KYC Status',
          type: 'string',
          width: '120px',
          valuePrepareFunction: (value: any) => {
            return value ? value.status : 'Not Submitted';
          },
        },
        wallet: {
          title: 'wallets',
          ...this.customColumnParams,
          onComponentInitFunction: (instance) => {
            instance.buttonClick.subscribe((rowData: User) => {
              this.dialogService.open(WalletDialogComponent, {
                context: { userId: rowData.id }
              }).onClose.subscribe(() => this.ngOnInit())
            })
          },
        },
        orders: {
          title: 'orders',
          ...this.customColumnParams,
          onComponentInitFunction: (instance) => {
            instance.buttonClick.subscribe((rowData: User) => {
              this.dialogService.open(UserOrdersDialogComponent, {
                context: { userId: rowData.id }
              }).onClose.subscribe(() => this.ngOnInit())
            })
          },
        },
        deposits: {
          title: 'deposits',
          ...this.customColumnParams,
          onComponentInitFunction: (instance) => {
            instance.buttonClick.subscribe((rowData: User) => {
              this.dialogService.open(UserDepositsDialogComponent, {
                context: { userId: rowData.id }
              }).onClose.subscribe(() => this.ngOnInit())
            })
          },
        },
        withdrawals: {
          title: 'withdrawals',
          ...this.customColumnParams,
          onComponentInitFunction: (instance) => {
            instance.buttonClick.subscribe((rowData: User) => {
              this.dialogService.open(UserWithdrawalsDialogComponent, {
                context: { userId: rowData.id }
              }).onClose.subscribe(() => this.ngOnInit())
            })
          },
        },
      },
    } as any;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;

    const params: any = { ...this.filters };

    Object.keys(params).forEach(key => {
      if (params[key] === '') {
        delete params[key];
      }
    });

    this.adminService.getUsers(params).subscribe({
      next: (data: UsersResponse) => {
        this.source.load(data.results);
        this.pagination = {
          count: data.count,
          next: data.next?.toString() || null,
          previous: data.previous?.toString() || null,
        };
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load users:', error);
        this.isLoading = false;
      }
    });
  }

  onFilterChange(): void {
    this.filters.page = 1; // Reset to first page when filters change
    this.loadData();
  }

  resetFilters(): void {
    this.filters = {
      page: 1,
      page_size: 10,
      order_by: 'id',
      order_direction: 'asc',
      phone: '',
      email: '',
      first_name: '',
      last_name: '',
      father_name: '',
    };
    this.loadData();
  }

  onUserSelect(event: any): void {
    this.selectedUser = event.data;
  }

  onEdit(event: any): void {
    // Handle edit if needed
  }

  nextPage(): void {
    if (this.pagination?.next) {
      this.filters.page++;
      this.loadData();
    }
  }

  previousPage(): void {
    if (this.pagination?.previous) {
      this.filters.page--;
      this.loadData();
    }
  }
}
