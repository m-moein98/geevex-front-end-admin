import { Component } from "@angular/core";
import { concatMap, tap } from 'rxjs/operators';
import { AdminService } from "../admin-service";
import { Vendor, VendorsResponse } from "../admin.model";
import { NbDialogService } from "@nebular/theme";
import { EditVendorMetadataDialogComponent } from "./edit-vendor-metadata/edit-vendor-metadata.component";
import { BaseTableComponent } from "../base-table/base-table.component";

@Component({
  selector: "ngx-vendors",
  styleUrls: ["./vendors.component.scss"],
  templateUrl: "./vendors.component.html",
})
export class VendorsComponent extends BaseTableComponent {
  constructor(
    private service: AdminService,
    private dialogService: NbDialogService
  ) {
    super()
    this.source.onUpdated().pipe(
      tap(() => this.isLoading = true),
      concatMap((payload: Vendor) => this.service.updateVendor(payload)),
    ).subscribe(this.updateObserver)
    this.source.onAdded().pipe(
      tap(() => this.isLoading = true),
      concatMap((payload: Vendor) => this.service.addVendor(payload)),
    ).subscribe(this.updateObserver);
  }
  vendors: Vendor[]

  settingsFactory = () => ({
    ...this.defaultSettings,
    columns: {
      ...this.defaultColumns,
      name: {
        title: 'Name',
        width: '15%',
      },
      is_active: {
        title: 'Active',
        ...this.boolColumnParams,
      },
      token: {
        title: 'Token',
        width: '15%',
      },
      username: {
        title: 'Username',
        width: '15%',
      },
      password: {
        title: 'Password',
        width: '15%',
      },
      coin_map: {
        title: 'Coin Map',
        ...this.customColumnParams,
        onComponentInitFunction: (instance) => {
          instance.buttonClick.subscribe((rowData: Vendor) => {
            this.dialogService.open(EditVendorMetadataDialogComponent, {
              context: { rowData }
            })
          })
        },
      },
    },
  });

  ngOnInit() {
    this.getVendors()
  }

  getVendors() {
    this.service.getVendors().subscribe(
      (res: VendorsResponse) => {
        this.vendors = res.results
        this.pagination = {
          count: res.count, next: res.next, previous: res.previous
        }
        this.isLoading = false
        this.source.load(this.vendors)
        this.settings = this.settingsFactory()
      }
    );
  }
}
