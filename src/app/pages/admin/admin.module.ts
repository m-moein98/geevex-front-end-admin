import { NgModule } from "@angular/core";
import {
  NbAccordionModule,
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbRadioModule,
  NbSearchModule,
  NbSelectModule,
  NbSpinnerModule,
  NbUserModule,
} from "@nebular/theme";

import { ThemeModule } from "../../@theme/theme.module";
import {
  FormsModule,
  FormsModule as ngFormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { EnergyRoutingModule } from "./admin-routing.module";
import { EnergyComponent } from "./admin.component";
import { NgxEchartsModule } from "ngx-echarts";
import { FiltersComponent } from './filters/filters.component';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { LoginComponent } from "./login/login.component";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { CustomButtonComponent } from "./custom-button.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { SettingsComponent } from "./settings/settings.component";

@NgModule({
  imports: [
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    EnergyRoutingModule,
    NbSelectModule,
    NbIconModule,
    ngFormsModule,
    FormsModule,
    ReactiveFormsModule,
    NbListModule,
    NbAccordionModule,
    NgxEchartsModule,
    NgPersianDatepickerModule,
    Ng2SmartTableModule,
    NbSpinnerModule,
    DragDropModule,
    NbSearchModule,
  ],
  declarations: [
    EnergyComponent,
    SettingsComponent,
    FiltersComponent,
    LoginComponent,
    CustomButtonComponent,
  ],
})
export class AdminModule { }
