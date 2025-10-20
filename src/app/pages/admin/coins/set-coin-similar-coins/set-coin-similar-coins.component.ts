import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { AdminService } from '../../admin-service';
import { ToastService } from '../../../toast-service';
import { Coin, BasicResponse, CoinsResponse } from '../../admin.model';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'ngx-set-coin-similar-coins-dialog',
  templateUrl: 'set-coin-similar-coins.component.html',
})
export class SetCoinSimilarCoinsDialogComponent implements OnInit {
  rowData!: Coin;
  allCoins: Coin[] = [];
  filteredCoins: Coin[] = [];
  selectedCoins: Coin[] = [];
  searchControl = new FormControl('');
  isSubmitting = false;
  isLoading = true;

  constructor(
    protected ref: NbDialogRef<SetCoinSimilarCoinsDialogComponent>,
    private service: AdminService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.fetchAllCoins();

    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((term) => this.filterCoins(term));
  }

  fetchAllCoins(): void {
    this.service.getCoins().subscribe({
      next: (res: CoinsResponse) => {
        this.allCoins = res.results.filter((c) => c.id !== this.rowData.id);
        this.filteredCoins = [...this.allCoins];

        // Pre-select existing similar coins if any
        if (this.rowData.similar_coins?.length) {
          this.selectedCoins = this.rowData.similar_coins.slice(0, 3);
        }
        this.isLoading = false;
      },
      error: () => {
        this.toastService.showToast('danger', 'Error', 'Failed to load coins');
        this.isLoading = false;
      },
    });
  }

  filterCoins(term: string): void {
    const search = term?.toLowerCase() || '';
    this.filteredCoins = this.allCoins.filter(
      (c) =>
        c.name.toLowerCase().includes(search) ||
        c.symbol.toLowerCase().includes(search)
    );
  }

  toggleSelection(coin: Coin): void {
    const exists = this.selectedCoins.some((c) => c.id === coin.id);

    if (exists) {
      this.selectedCoins = this.selectedCoins.filter((c) => c.id !== coin.id);
    } else {
      if (this.selectedCoins.length >= 3) {
        this.toastService.showToast('warning', 'Limit Reached', 'You can only select up to 3 coins.');
        return;
      }
      this.selectedCoins.push(coin);
    }
  }

  isSelected(coin: Coin): boolean {
    return this.selectedCoins.some((c) => c.id === coin.id);
  }

  onSubmit(): void {
    if (!this.selectedCoins.length) {
      this.toastService.showToast('warning', 'No Selection', 'Please select at least one coin.');
      return;
    }

    this.isSubmitting = true;
    const updateBody = {
      ...this.rowData,
      similar_coin_ids: this.selectedCoins.map((c) => c.id),
    };

    this.service.updateCoin(this.rowData.id, updateBody).subscribe({
      next: (res: BasicResponse) => {
        this.toastService.showToast('success', 'Success', res.detail || 'Similar coins updated.');
        this.ref.close(true);
      },
      error: () => {
        this.toastService.showToast('danger', 'Error', 'Failed to update similar coins.');
        this.isSubmitting = false;
      },
    });
  }

  closeDialog(): void {
    this.ref.close();
  }
}
