import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin-service';
import { Withdrawal, WithdrawalStatus, WithdrawalType } from '../admin.model';
import { NbToastrService } from '@nebular/theme';
import { BaseTableComponent } from '../base-table/base-table.component';

@Component({
  selector: 'ngx-withdrawals',
  templateUrl: './withdrawals.component.html',
  styleUrls: ['./withdrawals.component.scss'],
})
export class WithdrawalsComponent extends BaseTableComponent implements OnInit {
  withdrawalStatuses: WithdrawalStatus[] = ['INCOMPLETE', 'APPROVED', 'CHECKING', 'COMPLETED', 'CANCELLED', 'REJECTED'];
  withdrawalTypes: WithdrawalType[] = ['CRYPTO', 'CARD_PAYMENT'];
  selectedStatus: WithdrawalStatus | null = null;
  selectedType: WithdrawalType | null = null;
  coinSymbol: string = 'BTC';
  network: string = '';
  title: string = '';

  constructor(
    private adminService: AdminService,
    private toastrService: NbToastrService
  ) {
    super();
    this.settings = {
      ...this.defaultSettings,
      actions: {
        add: false,
        edit: true,
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
        coin: {
          title: 'Coin',
          type: 'custom',
          renderComponent: 'coin-renderer',
          width: '120px',
        },
        network: {
          title: 'Network',
          type: 'string',
          width: '120px',
        },
        address: {
          title: 'Address',
          type: 'string',
          width: '200px',
        },
        status: {
          title: 'Status',
          type: 'custom',
          renderComponent: 'status-renderer',
          width: '120px',
        },
        type: {
          title: 'Type',
          type: 'custom',
          renderComponent: 'type-renderer',
          width: '120px',
        },
        title: {
          title: 'Title',
          type: 'string',
          width: '150px',
        },
        link: {
          title: 'Link',
          type: 'html',
          width: '150px',
          valuePrepareFunction: (link: string) => {
            return link ? `<a href="${link}" target="_blank">View</a>` : '-';
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
    const params: any = {
      coin__symbol: this.coinSymbol,
      type: this.selectedType,
      admin_view: true,
    };

    if (this.selectedStatus) {
      params.status = [this.selectedStatus];
    }

    if (this.network) {
      params.network = this.network;
    }

    if (this.title) {
      params.title = this.title;
    }

    this.adminService.getWithdrawals(params).subscribe({
      next: (data) => {
        this.source.load(data.results);
        this.isLoading = false;
      },
      error: (error) => {
        this.toastrService.danger('Failed to load withdrawals', 'Error');
        this.isLoading = false;
      }
    });
  }

  onStatusChange(status: WithdrawalStatus | null): void {
    this.selectedStatus = status;
    this.loadData();
  }

  onTypeChange(type: WithdrawalType | null): void {
    this.selectedType = type;
    this.loadData();
  }

  onCoinSymbolChange(coinSymbol: string): void {
    this.coinSymbol = coinSymbol;
    this.loadData();
  }

  onNetworkChange(network: string): void {
    this.network = network;
    this.loadData();
  }

  onTitleChange(title: string): void {
    this.title = title;
    this.loadData();
  }

  onEdit(event: any): void {
    const withdrawal = event.data;
    // Open edit dialog for withdrawal status update
    this.openEditDialog(withdrawal);
  }

  openEditDialog(withdrawal: Withdrawal): void {
    // This would open a dialog for editing withdrawal status
    // For now, we'll just show a simple prompt
    const newStatus = prompt('Enter new status (INCOMPLETE, APPROVED, CHECKING, COMPLETED, CANCELLED, REJECTED):', withdrawal.status);
    if (newStatus && this.withdrawalStatuses.includes(newStatus as WithdrawalStatus)) {
      this.updateWithdrawalStatus(withdrawal.id, newStatus as WithdrawalStatus);
    }
  }

  updateWithdrawalStatus(withdrawalId: number, status: WithdrawalStatus): void {
    this.isLoading = true;
    this.adminService.updateWithdrawal(withdrawalId, { status }).subscribe({
      next: () => {
        this.toastrService.success('Withdrawal status updated successfully', 'Success');
        this.loadData();
      },
      error: (error) => {
        this.toastrService.danger('Failed to update withdrawal status', 'Error');
        this.isLoading = false;
      }
    });
  }

  resetFilters(): void {
    this.selectedStatus = null;
    this.selectedType = null;
    this.coinSymbol = '';
    this.network = '';
    this.title = '';
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