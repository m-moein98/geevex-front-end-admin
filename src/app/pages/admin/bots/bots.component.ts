import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin-service';
import {
  DCATradeBot,
  MartingaleTradeBot,
  CustomTradeBot,
  TradeBotStatus,
  DCAPeriod,
  TradeBotType,
  TradeBotPeriod,
  TradeBotMarketType
} from '../admin.model';
import { NbToastrService } from '@nebular/theme';
import { BaseTableComponent } from '../base-table/base-table.component';

@Component({
  selector: 'ngx-bots',
  templateUrl: './bots.component.html',
  styleUrls: ['./bots.component.scss'],
})
export class BotsComponent extends BaseTableComponent implements OnInit {

  botStatuses: TradeBotStatus[] = ['active', 'paused', 'cancelled', 'completed'];
  dcaPeriods: DCAPeriod[] = ['day', 'week', 'month'];
  tradeBotTypes: TradeBotType[] = ['buy', 'sell'];
  tradeBotPeriods: TradeBotPeriod[] = ['hour', 'day', 'week', 'month'];
  tradeBotMarketTypes: TradeBotMarketType[] = ['market', 'limit'];

  selectedStatus: TradeBotStatus | null = null;
  selectedType: 'dca' | 'martingale' | 'custom' | 'investment' = 'dca';
  isPlusFilter: boolean | null = null;

  dcaBots: DCATradeBot[] = [];
  martingaleBots: MartingaleTradeBot[] = [];
  customBots: CustomTradeBot[] = [];
  investments: any[] = [];

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
      columns: this.getColumnsForType('dca'),
    } as any;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;

    switch (this.selectedType) {
      case 'dca':
        this.loadDCABots();
        break;
      case 'martingale':
        this.loadMartingaleBots();
        break;
      case 'custom':
        this.loadCustomBots();
        break;
      case 'investment':
        this.loadInvestments();
        break;
      default:
        this.loadDCABots();
    }
  }

  loadDCABots(): void {
    this.adminService.getDCATradeBots().subscribe({
      next: (data) => {
        this.dcaBots = data;
        this.source.load(data);
        this.isLoading = false;
      },
      error: (error) => {
        this.toastrService.danger('Failed to load DCA trade bots', 'Error');
        this.isLoading = false;
      }
    });
  }

  loadMartingaleBots(): void {
    this.adminService.getMartingaleTradeBots().subscribe({
      next: (data) => {
        this.martingaleBots = data;
        this.source.load(data);
        this.isLoading = false;
      },
      error: (error) => {
        this.toastrService.danger('Failed to load Martingale trade bots', 'Error');
        this.isLoading = false;
      }
    });
  }

  loadCustomBots(): void {
    this.adminService.getCustomTradeBots().subscribe({
      next: (data) => {
        this.customBots = data;
        this.source.load(data);
        this.isLoading = false;
      },
      error: (error) => {
        this.toastrService.danger('Failed to load Custom trade bots', 'Error');
        this.isLoading = false;
      }
    });
  }

  loadInvestments(): void {
    const params: any = {};
    if (this.isPlusFilter !== null) {
      params.is_plus = this.isPlusFilter;
    }

    this.adminService.getInvestments(this.isPlusFilter).subscribe({
      next: (data) => {
        this.investments = data.results;
        this.source.load(data.results);
        this.isLoading = false;
      },
      error: (error) => {
        this.toastrService.danger('Failed to load investments', 'Error');
        this.isLoading = false;
      }
    });
  }

  onTypeChange(type: 'dca' | 'martingale' | 'custom' | 'investment'): void {
    this.selectedType = type;
    this.settings = {
      ...this.defaultSettings,
      actions: {
        add: false,
        edit: true,
        delete: false,
      },
      columns: this.getColumnsForType(type),
    } as any;
    this.loadData();
  }

  onStatusChange(status: TradeBotStatus | null): void {
    this.selectedStatus = status;
    this.loadData();
  }

  onIsPlusChange(isPlus: boolean | null): void {
    this.isPlusFilter = isPlus;
    this.loadData();
  }

  onEdit(event: any): void {
    const bot = event.data;
    // Open edit dialog for bot status update
    this.openEditDialog(bot);
  }

  openEditDialog(bot: any): void {
    // This would open a dialog for editing bot status
    // For now, we'll just show a simple prompt
    const newStatus = prompt('Enter new status (active, paused, cancelled, completed):', bot.status);
    if (newStatus && this.botStatuses.includes(newStatus as TradeBotStatus)) {
      this.updateBotStatus(bot, newStatus as TradeBotStatus);
    }
  }

  updateBotStatus(bot: any, status: TradeBotStatus): void {
    this.isLoading = true;

    let updateCall;
    switch (this.selectedType) {
      case 'dca':
        updateCall = this.adminService.updateDCATradeBot(bot.id, { status });
        break;
      case 'martingale':
        updateCall = this.adminService.updateMartingaleTradeBot(bot.id, { status });
        break;
      case 'custom':
        updateCall = this.adminService.updateCustomTradeBot(bot.id, { status });
        break;
      case 'investment':
        updateCall = this.adminService.updateInvestment(bot.id, { status });
        break;
      default:
        updateCall = this.adminService.updateDCATradeBot(bot.id, { status });
    }

    updateCall.subscribe({
      next: () => {
        this.toastrService.success('Bot status updated successfully', 'Success');
        this.loadData();
      },
      error: (error) => {
        this.toastrService.danger('Failed to update bot status', 'Error');
        this.isLoading = false;
      }
    });
  }

  getColumnsForType(type: string): any {
    const baseColumns = {
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
      name: {
        title: 'Name',
        type: 'string',
        width: '150px',
        editable: false,
      },
      status: {
        title: 'Status',
        type: 'custom',
        renderComponent: 'status-renderer',
        width: '120px',
      },
    };

    switch (type) {
      case 'dca':
        return {
          ...baseColumns,
          source_coin_symbol: {
            title: 'Source Coin',
            type: 'string',
            width: '120px',
            editable: false,
          },
          destination_coin_symbol: {
            title: 'Destination Coin',
            type: 'string',
            width: '120px',
            editable: false,
          },
          destination_amount: {
            title: 'Destination Amount',
            type: 'number',
            width: '120px',
            editable: false,
            valuePrepareFunction: (value: number) => {
              return value ? value.toFixed(8) : '0';
            },
          },
          period: {
            title: 'Period',
            type: 'string',
            width: '100px',
            editable: false,
          },
          days: {
            title: 'Days',
            type: 'number',
            width: '80px',
            editable: false,
          },
        };
      case 'martingale':
        return {
          ...baseColumns,
          source_coin_symbol: {
            title: 'Source Coin',
            type: 'string',
            width: '120px',
            editable: false,
          },
          destination_coin_symbol: {
            title: 'Destination Coin',
            type: 'string',
            width: '120px',
            editable: false,
          },
          destination_amount: {
            title: 'Destination Amount',
            type: 'number',
            width: '120px',
            valuePrepareFunction: (value: number) => {
              return value ? value.toFixed(8) : '0';
            },
            editable: false,
          },
          target_profit_percentage: {
            title: 'Target Profit %',
            type: 'number',
            width: '120px',
            editable: false,
            valuePrepareFunction: (value: number) => {
              return value ? value.toFixed(2) : '0';
            },
          },
        };
      case 'custom':
        return {
          ...baseColumns,
          source_coin_symbol: {
            title: 'Source Coin',
            type: 'string',
            width: '120px',
            editable: false,
          },
          destination_coin_symbol: {
            title: 'Destination Coin',
            type: 'string',
            width: '120px',
            editable: false,
          },
          destination_amount: {
            title: 'Destination Amount',
            type: 'number',
            width: '120px',
            editable: false,
            valuePrepareFunction: (value: number) => {
              return value ? value.toFixed(8) : '0';
            },
          },
          type: {
            title: 'Type',
            type: 'string',
            width: '80px',
            editable: false,
          },
          period: {
            title: 'Period',
            type: 'string',
            width: '100px',
            editable: false,
          },
        };
      case 'investment':
        return {
          ...baseColumns,
          is_plus: {
            title: 'Type',
            type: 'string',
            width: '80px',
            valuePrepareFunction: (value: boolean) => {
              return value ? 'Plus' : 'Regular';
            },
            editable: false,
          },
          usdt_amount: {
            title: 'USDT Amount',
            type: 'number',
            width: '120px',
            valuePrepareFunction: (value: number) => {
              return value ? value.toFixed(2) : '0';
            },
            editable: false,
          },
          months: {
            title: 'Months',
            type: 'number',
            width: '80px',
            editable: false,
          },
          profit: {
            title: 'Profit',
            type: 'number',
            width: '100px',
            valuePrepareFunction: (value: number) => {
              return value ? value.toFixed(2) : '0';
            },
            editable: false,
          },
        };
      default:
        return baseColumns;
    }
  }

  resetFilters(): void {
    this.selectedStatus = null;
    this.isPlusFilter = null;
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