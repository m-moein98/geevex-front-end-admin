import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { 
  BasicResponse, 
  Coin, 
  CoinDepositNetwork, 
  CoinDepositNetworksResponse, 
  CreateCoinDepositNetwork, 
  UpdateCoinDepositNetwork 
} from '../../admin.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin-service';
import { ToastService } from '../../../toast-service';

@Component({
  selector: 'ngx-manage-coin-deposit-networks-dialog',
  templateUrl: 'manage-coin-deposit-networks.component.html',
})
export class ManageCoinDepositNetworksDialogComponent implements OnInit {
  rowData: Coin;
  depositNetworks: CoinDepositNetwork[] = [];
  coins: Coin[] = [];
  isLoading = true;
  isSubmitting = false;
  isEditing = false;
  editingNetwork: CoinDepositNetwork | null = null;

  form: FormGroup = new FormGroup({
    coin_id: new FormControl(null, [Validators.required]),
    type: new FormControl('', [Validators.required]),
    network: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    is_active: new FormControl(true, [Validators.required]),
  });

  constructor(
    protected ref: NbDialogRef<ManageCoinDepositNetworksDialogComponent>,
    private service: AdminService,
    private toastService: ToastService,
  ) {}

  ngOnInit() {
    this.getCoins();
    if (this.rowData) {
      this.form.patchValue({ coin_id: this.rowData.id });
      this.getDepositNetworks();
    }
  }

  getCoins() {
    this.service.getCoins().subscribe(
      (res: Coin[]) => {
        this.coins = res;
      },
      () => {
        this.toastService.showToast('danger', 'Error', 'Failed to load coins');
      }
    );
  }

  getDepositNetworks() {
    this.isLoading = true;
    this.service.getCoinDepositNetworks({ coin__symbol: this.rowData.symbol }).subscribe(
      (res: CoinDepositNetworksResponse) => {
        this.depositNetworks = res.results;
        this.isLoading = false;
      },
      () => {
        this.toastService.showToast('danger', 'Error', 'Failed to load deposit networks');
        this.isLoading = false;
      }
    );
  }

  onCreateNew() {
    this.isEditing = false;
    this.editingNetwork = null;
    this.form.patchValue({
      coin_id: this.rowData ? this.rowData.id : null,
      type: '',
      network: '',
      address: '',
      is_active: true,
    });
  }

  onEdit(network: CoinDepositNetwork) {
    this.isEditing = true;
    this.editingNetwork = network;
    // Find the coin ID from the coins list by matching symbol
    const selectedCoin = this.coins.find(coin => coin.symbol === network.coin?.symbol);
    this.form.patchValue({
      coin_id: selectedCoin?.id || this.rowData?.id,
      type: network.type,
      network: network.network,
      address: network.address,
      is_active: network.is_active,
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.isSubmitting = true;

    const formData = this.form.value;

    if (this.isEditing && this.editingNetwork) {
      // Update existing network
      this.service.updateCoinDepositNetwork(this.editingNetwork.id, formData).subscribe({
        next: (res: CoinDepositNetwork) => {
          this.toastService.showToast('success', 'Success', 'Deposit network updated successfully');
          this.resetForm();
          this.getDepositNetworks();
        },
        error: () => {
          this.toastService.showToast('danger', 'Error', 'Failed to update deposit network');
          this.isSubmitting = false;
        },
      });
    } else {
      // Create new network
      this.service.createCoinDepositNetwork(formData).subscribe({
        next: (res: CoinDepositNetwork) => {
          this.toastService.showToast('success', 'Success', 'Deposit network created successfully');
          this.resetForm();
          this.getDepositNetworks();
        },
        error: () => {
          this.toastService.showToast('danger', 'Error', 'Failed to create deposit network');
          this.isSubmitting = false;
        },
      });
    }
  }

  onDelete(networkId: number) {
    if (confirm('Are you sure you want to delete this deposit network?')) {
      this.service.deleteCoinDepositNetwork(networkId).subscribe({
        next: (res: BasicResponse) => {
          this.toastService.showToast('success', 'Success', res.detail || 'Deposit network deleted successfully');
          this.getDepositNetworks();
        },
        error: () => {
          this.toastService.showToast('danger', 'Error', 'Failed to delete deposit network');
        },
      });
    }
  }

  onCancel() {
    this.resetForm();
  }

  resetForm() {
    this.isSubmitting = false;
    this.isEditing = false;
    this.editingNetwork = null;
    this.form.patchValue({
      coin_id: this.rowData ? this.rowData.id : null,
      type: '',
      network: '',
      address: '',
      is_active: true,
    });
  }

  close() {
    this.ref.close(true);
  }

  getCoinDisplay(coinId: any): string {
    if (!coinId) return '';
    const coin = this.coins.find(c => c.id === coinId);
    return coin ? `${coin.symbol} - ${coin.name}` : '';
  }

  onCoinInput(event: any) {
    const value = event.target.value;
    const selectedCoin = this.coins.find(c => `${c.symbol} - ${c.name}` === value);
    if (selectedCoin) {
      this.form.patchValue({ coin_id: selectedCoin.id });
    } else {
      this.form.patchValue({ coin_id: null });
    }
  }
}