import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin-service';
import { Deposit, DepositStatus, DepositType } from '../admin.model';
import { NbToastrService } from '@nebular/theme';
import { BaseTableComponent } from '../base-table/base-table.component';

@Component({
  selector: 'ngx-deposits',
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.scss'],
})
export class DepositsComponent extends BaseTableComponent implements OnInit {

  depositStatuses: DepositStatus[] = ['INCOMPLETE', 'CHECKING', 'COMPLETED', 'CANCELLED', 'REJECTED'];
  depositTypes: DepositType[] = ['CRYPTO', 'CARD_PAYMENT', 'IBAN_PAYMENT', 'SHETAB_PAYMENT'];

  selectedStatus: DepositStatus | null = null;
  selectedType: DepositType | null = null;
  coinId: number | null = null;
  network: string = '';

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
        source_card_number: {
          title: 'Source Card',
          type: 'string',
          width: '150px',
        },
        link: {
          title: 'Link',
          width: '150px',
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
      coin_id: this.coinId,
      type: this.selectedType,
      admin_view: true,
    };

    if (this.selectedStatus) {
      params.status = [this.selectedStatus];
    }

    if (this.network) {
      params.network = this.network;
    }

    this.adminService.getDeposits(params).subscribe({
      next: (data) => {
        this.source.load(data.results);
        this.isLoading = false;
      },
      error: (error) => {
        this.toastrService.danger('Failed to load deposits', 'Error');
        this.isLoading = false;
      }
    });
  }

  onStatusChange(status: DepositStatus | null): void {
    this.selectedStatus = status;
    this.loadData();
  }

  onTypeChange(type: DepositType | null): void {
    this.selectedType = type;
    this.loadData();
  }

  onCoinIdChange(coinId: number | null): void {
    this.coinId = coinId;
    this.loadData();
  }

  onNetworkChange(network: string): void {
    this.network = network;
    this.loadData();
  }

  onEdit(event: any): void {
    const deposit = event.data;
    // Open edit dialog for deposit status update
    this.openEditDialog(deposit);
  }

  openEditDialog(deposit: Deposit): void {
    // This would open a dialog for editing deposit status
    // For now, we'll just show a simple prompt
    const newStatus = prompt('Enter new status (INCOMPLETE, CHECKING, COMPLETED, CANCELLED, REJECTED):', deposit.status);
    if (newStatus && this.depositStatuses.includes(newStatus as DepositStatus)) {
      this.updateDepositStatus(deposit.id, newStatus as DepositStatus);
    }
  }

  updateDepositStatus(depositId: number, status: DepositStatus): void {
    this.isLoading = true;
    this.adminService.updateDeposit(depositId, { status }).subscribe({
      next: () => {
        this.toastrService.success('Deposit status updated successfully', 'Success');
        this.loadData();
      },
      error: (error) => {
        this.toastrService.danger('Failed to update deposit status', 'Error');
        this.isLoading = false;
      }
    });
  }

  resetFilters(): void {
    this.selectedStatus = null;
    this.selectedType = null;
    this.coinId = null;
    this.network = '';
    this.loadData();
  }
}