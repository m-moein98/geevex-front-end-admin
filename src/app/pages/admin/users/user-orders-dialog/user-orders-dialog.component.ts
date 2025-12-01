import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { AdminService } from '../../admin-service';
import { Order, OrderResponse, Pagination } from '../../admin.model';

@Component({
  selector: 'ngx-user-orders-dialog',
  templateUrl: './user-orders-dialog.component.html',
  styleUrls: ['./user-orders-dialog.component.scss'],
})
export class UserOrdersDialogComponent implements OnInit {
  
  userId: number;
  userPhone: string;
  orders: Order[] = [];
  isLoading = true;
  pagination: Pagination | null = null;

  filters = {
    page: 1,
    page_size: 10,
    user_id: null as number | null,
    status: '',
    action: '',
    admin_view: true,
  };

  constructor(
    protected dialogRef: NbDialogRef<UserOrdersDialogComponent>,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.filters.user_id = this.userId;
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    
    const params: any = { ...this.filters };
    
    // Remove empty string values
    Object.keys(params).forEach(key => {
      if (params[key] === '') {
        delete params[key];
      }
    });

    this.adminService.getOrders(params).subscribe({
      next: (data: OrderResponse) => {
        this.orders = data.results;
        this.pagination = {
          count: data.count,
          next: data.next?.toString() || null,
          previous: data.previous?.toString() || null,
        };
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load orders:', error);
        this.isLoading = false;
      }
    });
  }

  getOrderStatusBadge(status: string): string {
    switch (status) {
      case 'CREATED':
        return 'primary';
      case 'IN_PROGRESS':
        return 'warning';
      case 'COMPLETED':
        return 'success';
      case 'CANCELLED':
        return 'danger';
      case 'FAILED':
        return 'danger';
      default:
        return 'basic';
    }
  }

  getOrderActionStatus(action: string): string {
    switch (action) {
      case 'buy':
        return 'success';
      case 'sell':
        return 'danger';
      case 'swap':
        return 'info';
      default:
        return 'basic';
    }
  }

  nextPage(): void {
    if (this.pagination?.next) {
      this.filters.page++;
      this.loadOrders();
    }
  }

  previousPage(): void {
    if (this.pagination?.previous) {
      this.filters.page--;
      this.loadOrders();
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}