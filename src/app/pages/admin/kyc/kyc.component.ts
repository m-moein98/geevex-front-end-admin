import { Component } from "@angular/core";
import { AdminService } from "../admin-service";
import { KYC, KYCUser, KYCsResponse } from "../admin.model";
import { BaseTableComponent } from "../base-table/base-table.component";
import { concatMap, tap } from 'rxjs/operators';
import { NbDialogService } from "@nebular/theme";
import { ImagePreviewComponent } from "../image-preview/image-preview.component";
import { VideoPreviewComponent } from "../video-preview/video-preview.component";
import { ToastService } from "../../toast-service";

@Component({
  selector: "ngx-kyc",
  styleUrls: ["./kyc.component.scss"],
  templateUrl: "./kyc.component.html",
})
export class KYCComponent extends BaseTableComponent {
  constructor(
    private service: AdminService,
    private dialogService: NbDialogService,
    private toastService: ToastService
  ) {
    super()
    this.source.onUpdated().pipe(
      tap(() => this.isLoading = true),
      concatMap(payload => {
        this.toastService.showToast('success', 'success', `KYC Status changed to ${payload.status}`)
        return this.service.updateKYCStatus(payload.id, payload.status)
      }),
    ).subscribe(this.updateObserver)
  }
  KYCs: KYC[]

  settingsFactory = () => ({
    ...this.defaultSettings,
    actions: {
      add: false,
      edit: true,
      delete: false,
    },
    columns: {
      ...this.defaultColumns,
      user: {
        title: 'User',
        width: '15%',
        editable: false,
        valuePrepareFunction: (value: KYCUser) => {
          return value?.email;
        },
        editor: {
          type: 'list',
          config: {
            selectText: '',
            list: []
          }
        }
      },
      status: {
        title: 'Status',
        width: '20%',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              { value: 'CREATED', title: 'Created' },
              { value: 'PENDING', title: 'Pending' },
              { value: 'APPROVED', title: 'Approved' },
              { value: 'REJECTED', title: 'Rejected' },
            ]
          }
        }
      },
      created_at: {
        title: 'Created At',
        width: '15%',
        editable: false,
      },
      updated_at: {
        title: 'Updated At',
        width: '15%',
        editable: false,
      },
      first_name: {
        title: 'First Name',
        width: '15%',
        editable: false,
      },
      last_name: {
        title: 'Last Name',
        width: '15%',
        editable: false,
      },
      father_name: {
        title: 'Father Name',
        width: '15%',
        editable: false,
      },
      national_code: {
        title: 'National Code',
        width: '15%',
        editable: false,
      },
      date_of_birth: {
        title: 'Date Of Birth',
        width: '15%',
        editable: false,
      },
      birth_place: {
        title: 'Birth Place',
        width: '15%',
        editable: false,
      },
      bank_account_number: {
        title: 'Bank Account Number',
        width: '20%',
        editable: false,
      },
      front_id_image: {
        title: 'Front Id Url',
        width: '15%',
        ...this.customColumnParams,
        onComponentInitFunction: (instance) => {
          instance.buttonClick.subscribe((rowData: KYC) => {
            this.dialogService.open(ImagePreviewComponent, {
              context: { rowData: rowData.front_id_image }
            }).onClose.subscribe(() => this.ngOnInit())
          })
        },
      },
      back_id_image: {
        title: 'Back Id Url',
        width: '15%',
        ...this.customColumnParams,
        onComponentInitFunction: (instance) => {
          instance.buttonClick.subscribe((rowData: KYC) => {
            this.dialogService.open(ImagePreviewComponent, {
              context: { rowData: rowData.back_id_image }
            }).onClose.subscribe(() => this.ngOnInit())
          })
        },
      },
      selfie_video: {
        title: 'Selfie Video Url',
        width: '15%',
        ...this.customColumnParams,
        onComponentInitFunction: (instance) => {
          instance.buttonClick.subscribe((rowData: KYC) => {
            this.dialogService.open(VideoPreviewComponent, {
              context: { rowData: rowData.selfie_video }
            }).onClose.subscribe(() => this.ngOnInit())
          })
        },
      },
    },
  });

  ngOnInit() {
    this.getKYCs()
  }

  getKYCs() {
    this.service.getKYCs().subscribe(
      (res: KYCsResponse) => {
        this.KYCs = res.results
        this.pagination = {
          count: res.count, next: res.next, previous: res.previous
        }
        this.isLoading = false
        this.source.load(this.KYCs)
        this.settings = this.settingsFactory()
      }
    );
  }

  applyAll() {
    // Find all elements with nb-checkmark class
    const checkmarkElements = document.querySelectorAll('i.nb-checkmark');
    
    if (checkmarkElements.length === 0) {
      this.toastService.showToast('info', 'info', 'No checkmark elements found to apply');
      return;
    }

    // Click on each checkmark element
    checkmarkElements.forEach((element, index) => {
      setTimeout(() => {
        (element as HTMLElement).click();
      }, index * 100); // Add small delay between clicks
    });

    this.toastService.showToast('success', 'success', `Applied ${checkmarkElements.length} checkmarks`);
  }
}
