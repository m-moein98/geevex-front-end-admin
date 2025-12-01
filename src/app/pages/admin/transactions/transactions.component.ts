import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin-service';
import { Transaction, TransactionPaginatedResponse, TransactionsOrderBy, Pagination } from '../admin.model';
import { BaseTableComponent } from '../base-table/base-table.component';

@Component({
  selector: 'ngx-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent extends BaseTableComponent implements OnInit {

  filters = {
    page: 1,
    page_size: 10,
    order_by: 'id' as TransactionsOrderBy,
    order_direction: 'asc',
    id: '',
    created_at: '',
    user_id: '',
    group_id: '',
    phone: '', // Phone number filter
  };

  pagination: Pagination | null = null;
  selectedTransaction: Transaction | null = null;

  constructor(
    private adminService: AdminService
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
          this.loadTransactions(params);
        },
        error: () => {
          delete params.phone;
          this.loadTransactions(params);
        }
      });
    } else {
      this.loadTransactions(params);
    }
  }

  private loadTransactions(params: any): void {
    this.adminService.getTransactions(params).subscribe({
      next: (data: TransactionPaginatedResponse) => {
        this.source.load(data.results);
        this.pagination = {
          count: data.count,
          next: data.next?.toString() || null,
          previous: data.previous?.toString() || null,
        };
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load transactions:', error);
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
      id: '',
      created_at: '',
      user_id: '',
      group_id: '',
      phone: '',
    };
    this.loadData();
  }

  onTransactionSelect(event: any): void {
    this.selectedTransaction = event.data;
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