import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin-service';
import { Deposit, DepositStatus, DepositType, Coin, MinifedUser } from '../admin.model';
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
  coins: Coin[] = [];

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
          editable: false,
        },
        created_at: {
          title: 'Created At',
          type: 'date',
          width: '150px',
          editable: false,
          valuePrepareFunction: (date: string) => {
            return new Date(date).toLocaleDateString();
          },
        },
        user: {
          title: 'Phone',
          type: 'string',
          width: '150px',
          valuePrepareFunction: (value: MinifedUser) => {
            return value.phone;
          },
        },
        coin: {
          title: 'Coin',
          type: 'custom',
          renderComponent: 'coin-renderer',
          width: '120px',
          editable: false,
        },
        network: {
          title: 'Network',
          type: 'string',
          width: '120px',
          editable: false,
        },
        address: {
          title: 'Address',
          type: 'string',
          width: '200px',
          editable: false,
        },
        status: {
          title: 'Status',
          type: 'custom',
          renderComponent: 'status-renderer',
          width: '120px',
          editor: {
            type: 'list',
            config: {
              selectText: 'Select',
              list: this.depositStatuses.map(status => ({ value: status, title: status }))
            }
          }
        },
        type: {
          title: 'Type',
          type: 'custom',
          renderComponent: 'type-renderer',
          width: '120px',
          editable: false,
        },
        source_card_number: {
          title: 'Source Card',
          type: 'string',
          width: '150px',
          editable: false,
        },
        link: {
          title: 'Link',
          width: '150px',
          editable: false,
        },
      },
    } as any;
  }

  ngOnInit(): void {
    this.getCoins();
    this.loadData();
  }

  getCoins() {
    this.adminService.getCoins().subscribe(
      (res: Coin[]) => {
        this.coins = res;
      },
      () => {
        this.toastrService.danger('Failed to load coins', 'Error');
      }
    );
  }

  getCoinDisplay(coinId: any): string {
    if (!coinId) return '';
    const coin = this.coins.find(c => c.id === coinId);
    return coin ? `${coin.symbol} - ${coin.name}` : '';
  }

  onCoinInput(event: any) {
    const value = event.target.value;
    const selectedCoin = this.coins.find(c => `${c.symbol} - ${c.name}` === value);
    this.coinId = selectedCoin ? selectedCoin.id : null;
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

  applyAll() {
    // Find all elements with nb-checkmark class
    const checkmarkElements = document.querySelectorAll('i.nb-checkmark');

    if (checkmarkElements.length === 0) {
      this.toastrService.info('No checkmark elements found to apply', 'Info');
      return;
    }

    // Click on each checkmark element
    checkmarkElements.forEach((element, index) => {
      setTimeout(() => {
        (element as HTMLElement).click();
      }, index * 100); // Add small delay between clicks
    });

    this.toastrService.success(`Applied ${checkmarkElements.length} checkmarks`, 'Success');
  }
}