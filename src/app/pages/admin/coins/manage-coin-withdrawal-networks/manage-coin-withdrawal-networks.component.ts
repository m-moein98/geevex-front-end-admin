import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { 
  BasicResponse, 
  Coin, 
  CoinWithdrawalNetwork, 
  CoinWithdrawalNetworksResponse, 
  CreateCoinWithdrawalNetwork, 
  UpdateCoinWithdrawalNetwork 
} from '../../admin.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin-service';
import { ToastService } from '../../../toast-service';

@Component({
  selector: 'ngx-manage-coin-withdrawal-networks-dialog',
  templateUrl: 'manage-coin-withdrawal-networks.component.html',
})
export class ManageCoinWithdrawalNetworksDialogComponent implements OnInit {
  rowData: Coin;
  withdrawalNetworks: CoinWithdrawalNetwork[] = [];
  coins: Coin[] = [];
  isLoading = true;
  isSubmitting = false;
  isEditing = false;
  editingNetwork: CoinWithdrawalNetwork | null = null;

  form: FormGroup = new FormGroup({
    coin_id: new FormControl(null, [Validators.required]),
    network: new FormControl('', [Validators.required]),
    is_active: new FormControl(true, [Validators.required]),
  });

  constructor(
    protected ref: NbDialogRef<ManageCoinWithdrawalNetworksDialogComponent>,
    private service: AdminService,
    private toastService: ToastService,
  ) {}

  ngOnInit() {
    this.getCoins();
    if (this.rowData) {
      this.form.patchValue({ coin_id: this.rowData.id });
      this.getWithdrawalNetworks();
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

  getWithdrawalNetworks() {
    this.isLoading = true;
    this.service.getCoinWithdrawalNetworks({ coin__symbol: this.rowData.symbol }).subscribe(
      (res: CoinWithdrawalNetworksResponse) => {
        this.withdrawalNetworks = res.results;
        this.isLoading = false;
      },
      () => {
        this.toastService.showToast('danger', 'Error', 'Failed to load withdrawal networks');
        this.isLoading = false;
      }
    );
  }

  onCreateNew() {
    this.isEditing = false;
    this.editingNetwork = null;
    this.form.patchValue({
      coin_id: this.rowData ? this.rowData.id : null,
      network: '',
      is_active: true,
    });
  }

  onEdit(network: CoinWithdrawalNetwork) {
    this.isEditing = true;
    this.editingNetwork = network;
    // Find coin ID from coins list by matching symbol
    const selectedCoin = this.coins.find(coin => coin.symbol === network.coin?.symbol);
    this.form.patchValue({
      coin_id: selectedCoin?.id || this.rowData?.id,
      network: network.network,
      is_active: network.is_active,
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.isSubmitting = true;

    const formData = this.form.value;

    if (this.isEditing && this.editingNetwork) {
      // Update existing network
      this.service.updateCoinWithdrawalNetwork(this.editingNetwork.id, formData).subscribe({
        next: (res: CoinWithdrawalNetwork) => {
          this.toastService.showToast('success', 'Success', 'Withdrawal network updated successfully');
          this.resetForm();
          this.getWithdrawalNetworks();
        },
        error: () => {
          this.toastService.showToast('danger', 'Error', 'Failed to update withdrawal network');
          this.isSubmitting = false;
        },
      });
    } else {
      // Create new network
      this.service.createCoinWithdrawalNetwork(formData).subscribe({
        next: (res: CoinWithdrawalNetwork) => {
          this.toastService.showToast('success', 'Success', 'Withdrawal network created successfully');
          this.resetForm();
          this.getWithdrawalNetworks();
        },
        error: () => {
          this.toastService.showToast('danger', 'Error', 'Failed to create withdrawal network');
          this.isSubmitting = false;
        },
      });
    }
  }

  onDelete(networkId: number) {
    if (confirm('Are you sure you want to delete this withdrawal network?')) {
      this.service.deleteCoinWithdrawalNetwork(networkId).subscribe({
        next: (res: BasicResponse) => {
          this.toastService.showToast('success', 'Success', res.detail || 'Withdrawal network deleted successfully');
          this.getWithdrawalNetworks();
        },
        error: () => {
          this.toastService.showToast('danger', 'Error', 'Failed to delete withdrawal network');
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
      network: '',
      is_active: true,
    });
  }

  close() {
    this.ref.close(true);
  }
}