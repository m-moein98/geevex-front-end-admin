import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Ticket, TicketUpdateRequest } from '../../admin.model';
import { AdminService } from '../../admin-service';

@Component({
  selector: 'ngx-ticket-response-dialog',
  template: `
    <nb-card>
      <nb-card-header>Respond to Ticket</nb-card-header>
      <nb-card-body>
        <div class="form-group">
          <label for="response">Response:</label>
          <textarea nbInput fullWidth id="response" [(ngModel)]="response" rows="5"></textarea>
        </div>
        <div class="form-group">
          <label for="status">Status:</label>
          <nb-select fullWidth id="status" [(ngModel)]="status">
            <nb-option *ngFor="let status of statusOptions" [value]="status.value">
              {{ status.title }}
            </nb-option>
          </nb-select>
        </div>
      </nb-card-body>
      <nb-card-footer>
        <button nbButton status="success" (click)="submit()">Submit</button>
        <button nbButton status="danger" (click)="close()">Cancel</button>
      </nb-card-footer>
    </nb-card>
  `,
  styleUrls: ['./ticket-response-dialog.component.scss']
})
export class TicketResponseDialogComponent implements OnInit {
  rowData: Ticket;
  response: string = '';
  status: string = 'closed';
  statusOptions = [
    { value: 'open', title: 'Open' },
    { value: 'closed', title: 'Closed' },
    { value: 'waiting_response', title: 'Waiting Response' }
  ];

  constructor(
    protected dialogRef: NbDialogRef<TicketResponseDialogComponent>,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    if (this.context.rowData) {
      this.response = this.context.rowData.response || '';
      this.status = this.context.rowData.status;
    }
  }

  context: any;

  submit() {
    const updateData: TicketUpdateRequest = {
      response: this.response,
      status: this.status
    };

    this.adminService.updateTicket(this.rowData.id, updateData).subscribe(
      (result) => {
        this.dialogRef.close(result);
      },
      (error) => {
        console.error('Error updating ticket:', error);
      }
    );
  }

  close() {
    this.dialogRef.close();
  }
}