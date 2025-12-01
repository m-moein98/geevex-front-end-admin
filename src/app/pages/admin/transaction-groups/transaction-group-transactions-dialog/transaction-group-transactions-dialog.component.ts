import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { AdminService } from '../../admin-service';
import { TransactionGroup, TransactionPaginatedResponse } from '../../admin.model';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-transaction-group-transactions-dialog',
  templateUrl: './transaction-group-transactions-dialog.component.html',
  styleUrls: ['./transaction-group-transactions-dialog.component.scss'],
})
export class TransactionGroupTransactionsDialogComponent implements OnInit {

  transactionGroup: TransactionGroup;
  source: LocalDataSource = new LocalDataSource();
  isLoading = false;

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      created_at: {
        title: 'Created At',
        type: 'date',
        width: '150px',
        valuePrepareFunction: (date: string) => {
          return new Date(date).toLocaleDateString();
        },
      },
      user_id: {
        title: 'User ID',
        type: 'number',
        width: '100px',
      },
      doc_id: {
        title: 'Doc ID',
        type: 'number',
        width: '100px',
      },
      title: {
        title: 'Title',
        type: 'string',
        width: '200px',
      },
      debt: {
        title: 'Debt',
        type: 'number',
        width: '120px',
        valuePrepareFunction: (value: number) => {
          return value ? value.toFixed(2) : '0.00';
        },
      },
      claim: {
        title: 'Claim',
        type: 'number',
        width: '120px',
        valuePrepareFunction: (value: number) => {
          return value ? value.toFixed(2) : '0.00';
        },
      },
      balance: {
        title: 'Balance',
        type: 'number',
        width: '120px',
        valuePrepareFunction: (value: number) => {
          return value ? value.toFixed(2) : '0.00';
        },
      },
    },
  };

  constructor(
    protected dialogRef: NbDialogRef<TransactionGroupTransactionsDialogComponent>,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    if (this.transactionGroup) {
      this.loadTransactions();
    }
  }

  loadTransactions(): void {
    this.isLoading = true;
    
    // Load transactions for this transaction group
    this.adminService.getTransactions({ group_id: this.transactionGroup.id }).subscribe({
      next: (data: TransactionPaginatedResponse) => {
        this.source.load(data.results);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load transactions:', error);
        this.isLoading = false;
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}