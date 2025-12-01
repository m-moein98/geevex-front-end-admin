import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { AdminService } from '../../admin-service';
import { Invoice, TransactionPaginatedResponse } from '../../admin.model';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-invoice-transactions-dialog',
  templateUrl: './invoice-transactions-dialog.component.html',
  styleUrls: ['./invoice-transactions-dialog.component.scss'],
})
export class InvoiceTransactionsDialogComponent implements OnInit {

  invoice: Invoice;
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
    protected dialogRef: NbDialogRef<InvoiceTransactionsDialogComponent>,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    if (this.invoice) {
      this.loadTransactions();
    }
  }

  loadTransactions(): void {
    this.isLoading = true;
    
    // Load transactions for this invoice
    this.source.load(this.invoice.transactions);
    this.isLoading = false;
  }

  close(): void {
    this.dialogRef.close();
  }
}