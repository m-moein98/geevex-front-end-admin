import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnergyComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { VendorsComponent } from './vendors/vendors.component';
import { CoinsComponent } from './coins/coins.component';

const routes: Routes = [
  {
    path: '',
    component: EnergyComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'vendors',
        component: VendorsComponent
      },
      {
        path: 'coins',
        component: CoinsComponent
      },
      {
        path: '',
        redirectTo: 'forms',
        pathMatch: 'full'
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class EnergyRoutingModule {
}

