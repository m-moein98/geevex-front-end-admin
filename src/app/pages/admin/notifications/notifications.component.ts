import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { BaseTableComponent } from '../base-table/base-table.component';
import { AdminService } from '../admin-service';
import {
  Notification,
  NotificationCreate,
  NotificationType
} from '../admin.model';
// import { NotificationCreateDialogComponent } from './notification-create-dialog/notification-create-dialog.component';

@Component({
  selector: 'ngx-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent extends BaseTableComponent implements OnInit {
  
  notifications: Notification[] = [];
  selectedType: string = 'all';
  notificationTypeOptions = [
    { value: 'all', title: 'All' },
    { value: 'security', title: 'Security' },
    { value: 'transactional', title: 'Transactional' },
    { value: 'announcement', title: 'Announcement' }
  ];

  constructor(
    protected service: AdminService,
    private dialogService: NbDialogService
  ) {
    super();
  }

  getSettings() {
    return {
      ...this.defaultSettings,
      actions: {
        add: true,
        edit: false,
        delete: true
      },
      columns: {
        ...this.defaultColumns,
        title: {
          title: 'Title',
          width: '25%'
        },
        body: {
          title: 'Body',
          width: '30%'
        },
        type: {
          title: 'Type',
          width: '10%',
          valuePrepareFunction: (value) => {
            const type = this.notificationTypeOptions.find(opt => opt.value === value);
            return type ? type.title : value;
          }
        },
        user: {
          title: 'User',
          width: '10%',
          valuePrepareFunction: (value) => {
            return value ? `User ${value}` : 'Public';
          }
        },
        is_read: {
          title: 'Read',
          width: '5%',
          valuePrepareFunction: (value) => {
            return value ? 'Yes' : 'No';
          }
        },
        created_at: {
          title: 'Created At',
          width: '10%',
          valuePrepareFunction: (value) => {
            return new Date(value).toLocaleString();
          }
        }
      }
    };
  }

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications() {
    this.service.getNotifications(this.selectedType).subscribe(
      (res: any) => {
        this.notifications = res || [];
        this.isLoading = false;
        this.source.load(this.notifications);
        this.settings = this.getSettings();
      }
    );
  }

  onTypeChange(type: string) {
    this.selectedType = type;
    this.getNotifications();
  }

  onCreate() {
    // this.dialogService.open(NotificationCreateDialogComponent, {
    //   context: { }
    // }).onClose.subscribe(() => this.getNotifications());
    console.log('Create notification dialog not implemented yet');
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      this.service.deleteNotification(event.data.id).subscribe(
        () => {
          event.confirm.resolve();
          this.getNotifications();
        },
        (error) => {
          event.confirm.reject();
          console.error('Error deleting notification:', error);
        }
      );
    } else {
      event.confirm.reject();
    }
  }
}