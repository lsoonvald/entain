import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesListComponent } from './containers/employees-list/employees-list.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';


@NgModule({
  declarations: [EmployeesListComponent],
  imports: [
    SharedModule,
    CommonModule,
    EmployeesRoutingModule
  ]
})
export class EmployeesModule {}
