import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { AdminService } from '../admin-service';
import { TransactionGroup, TransactionGroupPaginatedResponse, TransactionGroupOrderBy, Pagination } from '../admin.model';
import { BaseTableComponent } from '../base-table/base-table.component';
import { TransactionGroupTransactionsDialogComponent } from './transaction-group-transactions-dialog/transaction-group-transactions-dialog.component';

@Component({
  selector: 'ngx-transaction-groups',
  templateUrl: './transaction-groups.component.html',
  styleUrls: ['./transaction-groups.component.scss'],
})
export class TransactionGroupsComponent extends BaseTableComponent implements OnInit {

  filters = {
    page: 1,
    page_size: 10,
    order_by: 'id' as TransactionGroupOrderBy,
    order_direction: 'asc',
    user_id: '',
    doc_id: '',
    title: '',
    phone: '', // Phone number filter
  };

  pagination: Pagination | null = null;
  selectedTransactionGroup: TransactionGroup | null = null;

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
        user_id: {
          title: 'User ID',
          type: 'number',
          width: '100px',
        },
        doc_id: {
          title: 'Doc ID',
          type: 'number',
          width: '100px',
        },
        title: {
          title: 'Title',
          type: 'string',
          width: '200px',
        },
        debt: {
          title: 'Debt',
          type: 'number',
          width: '120px',
          valuePrepareFunction: (value: number) => {
            return value ? value.toFixed(2) : '0.00';
          },
        },
        claim: {
          title: 'Claim',
          type: 'number',
          width: '120px',
          valuePrepareFunction: (value: number) => {
            return value ? value.toFixed(2) : '0.00';
          },
        },
        balance: {
          title: 'Balance',
          type: 'number',
          width: '120px',
          valuePrepareFunction: (value: number) => {
            return value ? value.toFixed(2) : '0.00';
          },
        },
        is_editable: {
          title: 'Editable',
          type: 'string',
          width: '100px',
          valuePrepareFunction: (value: boolean) => {
            return value ? 'Yes' : 'No';
          },
        },
        transactions: {
          title: 'Transactions',
          ...this.customColumnParams,
          onComponentInitFunction: (instance) => {
            instance.buttonClick.subscribe((rowData: TransactionGroup) => {
              this.dialogService.open(TransactionGroupTransactionsDialogComponent, {
                context: { transactionGroup: rowData }
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

    // Convert phone filter to user_id if phone is provided
    if (params.phone) {
      // First get users by phone to get user_id
      this.adminService.getUsers({ phone: params.phone }).subscribe({
        next: (userResponse) => {
          if (userResponse.results.length > 0) {
            params.user_id = userResponse.results[0].id;
          }
          delete params.phone;
          this.loadTransactionGroups(params);
        },
        error: () => {
          delete params.phone;
          this.loadTransactionGroups(params);
        }
      });
    } else {
      this.loadTransactionGroups(params);
    }
  }

  private loadTransactionGroups(params: any): void {
    this.adminService.getTransactionGroups(params).subscribe({
      next: (data: TransactionGroupPaginatedResponse) => {
        this.source.load(data.results);
        this.pagination = {
          count: data.count,
          next: data.next?.toString() || null,
          previous: data.previous?.toString() || null,
        };
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load transaction groups:', error);
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
      user_id: '',
      doc_id: '',
      title: '',
      phone: '',
    };
    this.loadData();
  }

  onTransactionGroupSelect(event: any): void {
    this.selectedTransactionGroup = event.data;
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