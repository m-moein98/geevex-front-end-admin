import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin-service';
import { Order, OrderStatus, OrderAction } from '../admin.model';
import { NbToastrService } from '@nebular/theme';
import { BaseTableComponent } from '../base-table/base-table.component';

@Component({
  selector: 'ngx-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent extends BaseTableComponent implements OnInit {

  orderStatuses: OrderStatus[] = ['CREATED', 'CANCELLED', 'IN_PROGRESS', 'FAILED', 'COMPLETED'];
  orderActions: OrderAction[] = ['buy', 'sell'];
  selectedStatus: OrderStatus[] = [];
  selectedAction: OrderAction | null = null;
  sourceCoinId: number | null = null;
  destinationCoinId: number | null = null;

  constructor(
    private adminService: AdminService,
    private toastrService: NbToastrService
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
        action: {
          title: 'Action',
          type: 'custom',
          renderComponent: 'action-renderer',
          width: '100px',
        },
        source_coin: {
          title: 'Source Coin',
          type: 'custom',
          renderComponent: 'coin-renderer',
          width: '120px',
        },
        destination_coin: {
          title: 'Destination Coin',
          type: 'custom',
          renderComponent: 'coin-renderer',
          width: '120px',
        },
        source_amount: {
          title: 'Source Amount',
          type: 'number',
          width: '120px',
          valuePrepareFunction: (value: number) => {
            return value ? value.toFixed(8) : '0';
          },
        },
        destination_amount: {
          title: 'Destination Amount',
          type: 'number',
          width: '120px',
          valuePrepareFunction: (value: number) => {
            return value ? value.toFixed(8) : '0';
          },
        },
        source_price: {
          title: 'Source Price',
          type: 'number',
          width: '120px',
          valuePrepareFunction: (value: number) => {
            return value ? value.toFixed(2) : '0';
          },
        },
        destination_price: {
          title: 'Destination Price',
          type: 'number',
          width: '120px',
          valuePrepareFunction: (value: number) => {
            return value ? value.toFixed(2) : '0';
          },
        },
        fee: {
          title: 'Fee',
          type: 'number',
          width: '100px',
          valuePrepareFunction: (value: number) => {
            return value ? value.toFixed(2) : '0';
          },
        },
        status: {
          title: 'Status',
          type: 'custom',
          renderComponent: 'status-renderer',
          width: '120px',
        },
      },
    } as any;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    const params: any = {
      admin_view: true,
    };

    if (this.selectedStatus.length > 0) {
      params.status = this.selectedStatus;
    }

    if (this.selectedAction) {
      params.action = this.selectedAction;
    }

    if (this.sourceCoinId) {
      params.source_coin = this.sourceCoinId;
    }

    if (this.destinationCoinId) {
      params.destination_coin = this.destinationCoinId;
    }

    this.adminService.getOrders(params).subscribe({
      next: (data) => {
        this.source.load(data.results);
        this.isLoading = false;
      },
      error: (error) => {
        this.toastrService.danger('Failed to load orders', 'Error');
        this.isLoading = false;
      }
    });
  }

  onStatusChange(statuses: OrderStatus[]): void {
    this.selectedStatus = statuses;
    this.loadData();
  }

  onActionChange(action: OrderAction | null): void {
    this.selectedAction = action;
    this.loadData();
  }

  onSourceCoinChange(coinId: number | null): void {
    this.sourceCoinId = coinId;
    this.loadData();
  }

  onDestinationCoinChange(coinId: number | null): void {
    this.destinationCoinId = coinId;
    this.loadData();
  }

  onEdit(event: any): void {
    const order = event.data;
    // Open edit dialog for order status update
    this.openEditDialog(order);
  }

  openEditDialog(order: Order): void {
    // This would open a dialog for editing order status
    // For now, we'll just show a simple prompt
    const newStatus = prompt('Enter new status (CREATED, CANCELLED, IN_PROGRESS, FAILED, COMPLETED):', order.status);
    if (newStatus && this.orderStatuses.includes(newStatus as OrderStatus)) {
      this.updateOrderStatus(order.id, newStatus as OrderStatus);
    }
  }

  updateOrderStatus(orderId: number, status: OrderStatus): void {
    this.isLoading = true;
    // Only allow cancelling orders as per API specification
    if (status === 'CANCELLED') {
      this.adminService.updateOrder(orderId, { status }).subscribe({
        next: () => {
          this.toastrService.success('Order status updated successfully', 'Success');
          this.loadData();
        },
        error: (error) => {
          this.toastrService.danger('Failed to update order status', 'Error');
          this.isLoading = false;
        }
      });
    } else {
      this.toastrService.warning('Only CANCELLED status is allowed for order updates', 'Warning');
      this.isLoading = false;
    }
  }

  resetFilters(): void {
    this.selectedStatus = [];
    this.selectedAction = null;
    this.sourceCoinId = null;
    this.destinationCoinId = null;
    this.loadData();
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}