import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { AdminService } from '../admin-service';
import { Invoice, InvoicePaginatedResponse, InvoiceOrderBy, Pagination } from '../admin.model';
import { BaseTableComponent } from '../base-table/base-table.component';
import { InvoiceTransactionsDialogComponent } from './invoice-transactions-dialog/invoice-transactions-dialog.component';

@Component({
  selector: 'ngx-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
})
export class InvoicesComponent extends BaseTableComponent implements OnInit {

  filters = {
    page: 1,
    page_size: 10,
    order_by: 'id' as InvoiceOrderBy,
    order_direction: 'asc',
    user_id: '',
    is_finalized: '',
    phone: '', // Phone number filter
  };

  pagination: Pagination | null = null;
  selectedInvoice: Invoice | null = null;

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
        is_finalized: {
          title: 'Finalized',
          type: 'string',
          width: '100px',
          valuePrepareFunction: (value: boolean) => {
            return value ? 'Yes' : 'No';
          },
        },
        price: {
          title: 'Price',
          type: 'number',
          width: '120px',
          valuePrepareFunction: (value: number) => {
            return value ? value.toFixed(2) : '0.00';
          },
        },
        transactions: {
          title: 'Transactions',
          ...this.customColumnParams,
          onComponentInitFunction: (instance) => {
            instance.buttonClick.subscribe((rowData: Invoice) => {
              this.dialogService.open(InvoiceTransactionsDialogComponent, {
                context: { invoice: rowData }
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
          this.loadInvoices(params);
        },
        error: () => {
          delete params.phone;
          this.loadInvoices(params);
        }
      });
    } else {
      this.loadInvoices(params);
    }
  }

  private loadInvoices(params: any): void {
    this.adminService.getInvoices(params).subscribe({
      next: (data: InvoicePaginatedResponse) => {
        this.source.load(data.results);
        this.pagination = {
          count: data.count,
          next: data.next?.toString() || null,
          previous: data.previous?.toString() || null,
        };
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load invoices:', error);
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
      is_finalized: '',
      phone: '',
    };
    this.loadData();
  }

  onInvoiceSelect(event: any): void {
    this.selectedInvoice = event.data;
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