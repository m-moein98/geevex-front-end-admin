import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { AdminService } from '../../admin-service';
import { Wallet, WalletsResponse } from '../../admin.model';

@Component({
  selector: 'ngx-wallet-dialog',
  templateUrl: './wallet-dialog.component.html',
  styleUrls: ['./wallet-dialog.component.scss'],
})
export class WalletDialogComponent implements OnInit {

  userId: number;
  userPhone: string;
  wallets: Wallet[] = [];
  isLoading = true;

  constructor(
    protected dialogRef: NbDialogRef<WalletDialogComponent>,
    private adminService: AdminService,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
    this.loadWalletData();
  }

  loadWalletData(): void {
    this.isLoading = true;
    this.adminService.getWallets({ user_id: this.userId }).subscribe({
      next: (wallets: WalletsResponse) => {
        this.wallets = wallets.results;
        this.isLoading = false;
      },
      error: (error: any) => {
        this.toastrService.danger('Failed to load wallet data', 'Error');
      }
    })
  }

  getTotalIRR(): number {
    return this.wallets.reduce((total, wallet) => total + wallet.total_irr_amount, 0);
  }

  getTotalUSDT(): number {
    return this.wallets.reduce((total, wallet) => total + wallet.total_usdt_amount, 0);
  }

  close(): void {
    this.dialogRef.close();
  }
}