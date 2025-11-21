import { Component } from "@angular/core";
import { AdminService } from "../admin-service";
import { NbDialogService } from "@nebular/theme";
import { BaseTableComponent } from "../base-table/base-table.component";
import { Ticket, TicketCreateRequest, TicketUpdateRequest, TicketRateRequest, TicketStatus } from "../admin.model";
import { concatMap, tap } from 'rxjs/operators';
import { TicketResponseDialogComponent } from "./ticket-response-dialog/ticket-response-dialog.component";

@Component({
  selector: "ngx-tickets",
  styleUrls: ["./tickets.component.scss"],
  templateUrl: "./tickets.component.html",
})
export class TicketsComponent extends BaseTableComponent {

  constructor(
    private service: AdminService,
    private dialogService: NbDialogService
  ) {
    super()
    this.source.onAdded().pipe(
      tap(() => { }),
      concatMap(payload => this.service.createTicket(payload)),
    ).subscribe(this.updateObserver)
  }

  tickets: Ticket[]
  selectedStatus: TicketStatus = 'open' as TicketStatus;
  ticketStatuses: TicketStatus[] = ['open', 'closed', 'waiting_response'];

  settingsFactory = () => ({
    ...this.defaultSettings,
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      ...this.defaultColumns,
      title: {
        title: 'Title',
        width: '20%',
      },
      description: {
        title: 'Description',
        width: '30%',
      },
      status: {
        title: 'Status',
        width: '10%',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: this.ticketStatuses.map(status => ({ value: status, title: status }))
          }
        }
      },
      response: {
        title: 'Response',
        width: '20%',
      },
      score: {
        title: 'Score',
        width: '5%',
      },
      comment: {
        title: 'Comment',
        width: '10%',
      },
      created_at: {
        title: 'Created At',
        width: '10%',
        valuePrepareFunction: (value) => {
          return new Date(value).toLocaleString();
        }
      },
      respond: {
        title: 'Respond',
        ...this.customColumnParams,
        onComponentInitFunction: (instance) => {
          instance.buttonClick.subscribe((ticketData: Ticket) => {
            this.dialogService.open(TicketResponseDialogComponent, {
              context: { rowData: ticketData } as any
            }).onClose.subscribe(() => this.getTickets())
          })
        },
      },
    },
  });

  ngOnInit() {
    this.getTickets()
  }

  getTickets() {
    this.service.getTickets(this.selectedStatus).subscribe(
      (res: any) => {
        this.tickets = res.results || res
        this.isLoading = false
        this.source.load(this.tickets)
        this.settings = this.settingsFactory()
      }
    );
  }

  onStatusChange(status: TicketStatus) {
    this.selectedStatus = status;
    this.getTickets();
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.service.deleteTicket(event.data.id).subscribe(
        () => {
          event.confirm.resolve();
          this.getTickets();
        },
        (error) => {
          event.confirm.reject();
          console.error('Error deleting ticket:', error);
        }
      );
    } else {
      event.confirm.reject();
    }
  }
}