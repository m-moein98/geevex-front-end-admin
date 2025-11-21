import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NbButtonComponent } from '@nebular/theme';
import { Ticket } from '../../admin.model';

@Component({
  selector: 'ngx-ticket-action',
  template: `
    <div class="action-buttons">
      <button nbButton status="info" size="tiny" (click)="onRespond()">
        <nb-icon icon="message-square-outline"></nb-icon>
      </button>
      <button nbButton status="warning" size="tiny" (click)="onRate()">
        <nb-icon icon="star-outline"></nb-icon>
      </button>
    </div>
  `,
  styleUrls: ['./ticket-action.component.scss']
})
export class TicketActionComponent {
  @Input() rowData: Ticket;
  @Output() buttonClick = new EventEmitter<Ticket>();

  onRespond() {
    this.buttonClick.emit(this.rowData);
  }

  onRate() {
    this.buttonClick.emit(this.rowData);
  }
}