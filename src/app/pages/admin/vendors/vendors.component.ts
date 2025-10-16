import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from 'ng2-smart-table';
import { concatMap, tap } from 'rxjs/operators';
import { AdminService } from "../admin-service";
import { ToastService } from "../../toast-service";
import { Router } from "@angular/router";
import { Pagination, Vendor, VendorsResponse } from "../admin.model";
import { CustomButtonComponent } from "../custom-button.component";
import { NbDialogService } from "@nebular/theme";
import { EditVendorMetadataDialogComponent } from "./edit-vendor-metadata/edit-vendor-metadata.component";

@Component({
  selector: "ngx-vendors",
  styleUrls: ["./vendors.component.scss"],
  templateUrl: "./vendors.component.html",
})
export class VendorsComponent implements OnInit {
  constructor(
    private service: AdminService,
    private dialogService: NbDialogService,
    private toastService: ToastService,
    private router: Router,
  ) {
    const updateObserver = {
      next: () => this.ngOnInit(),
      error: () => this.ngOnInit()
    }
    this.source.onUpdated().pipe(
      tap(() => this.isLoading = true),
      concatMap((payload: Vendor) => this.service.updateVendor(payload)),
    ).subscribe(updateObserver)
    this.source.onAdded().pipe(
      tap(() => this.isLoading = true),
      concatMap((payload: Vendor) => this.service.addVendor(payload)),
    ).subscribe(updateObserver);
  }
  vendors: Vendor[]
  pagination: Pagination
  isLoading = true
  source: LocalDataSource = new LocalDataSource();

  settingsFactory = () => ({
    actions: {
      add: true,
      edit: true,
      delete: false,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        editable: false,
        addable: false,
        width: '5%',
      },
      name: {
        title: 'Name',
        type: 'number',
        editable: false,
        addable: false,
        width: '15%',
      },
      is_active: {
        title: 'Active',
        type: 'string',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              { value: true },
              { value: false }
            ]
          }
        }
      },
      token: {
        title: 'Token',
        type: 'string',
        editable: false,
        addable: false,
        width: '15%',
      },
      username: {
        title: 'Username',
        type: 'string',
        editable: false,
        addable: false,
        width: '15%',
      },
      password: {
        title: 'Password',
        type: 'string',
        editable: false,
        addable: false,
        width: '15%',
      },
      coin_map: {
        title: 'Coin Map',
        type: 'custom',
        editable: false,
        addable: false,
        filter: false,
        width: '5%',
        renderComponent: CustomButtonComponent,
        onComponentInitFunction: (instance) => {
          instance.buttonClick.subscribe((rowData: Vendor) => {
            console.log(rowData)
            this.dialogService.open(EditVendorMetadataDialogComponent, {
              context:
                { rowData }
            }).onClose.subscribe((res) => {
              console.log(res)
            })
          })
        },
      },
    },
  });
  settings = this.settingsFactory()

  ngOnInit() {
    this.getVendors()
  }

  getVendors() {
    this.service.getVendors().subscribe(
      (res: VendorsResponse) => {
        this.vendors = res.results
        this.pagination = {
          count: res.count,
          next: res.next,
          previous: res.previous,
        }
        this.isLoading = false
        this.source.load(this.vendors)
        this.settings = this.settingsFactory()
        console.log(this.vendors, this.pagination)
      }
    );
  }
}
