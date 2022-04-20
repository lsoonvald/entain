import { Component, ElementRef, Inject, Injector, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IOffice, ITag, IUser } from 'src/app/features/auth/models/auth';
import { EmployeesFacadeService } from '../../employees-facade.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {

  employees = this.facade.employees;
  displayedColumns: string[] = ['email', 'fname', 'lname', 'office', 'bdate', 'mobile', 'tags', 'delete'];

  constructor(
    private facade: EmployeesFacadeService,
    private dialog: MatDialog,
    private injector: Injector
  ) {}

  ngOnInit(): void {
    this.facade.getEmployees();
  }

  openAddEmployeeDialog(employee?: IUser): void {
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent, { data: { injector: this.injector, employee } });
  }

  deleteEmployee(employee: IUser): void {
    this.facade.deleteEmployee(employee);
  }

}

@Component({
  selector: 'app-add-employee-dialog',
  templateUrl: './add-employee-dialog.html',
  styleUrls: ['./employees-list.component.scss']
})
export class AddEmployeeDialogComponent {
  facade: EmployeesFacadeService;
  snackbar: MatSnackBar;
  form: FormGroup;
  offices: Observable<IOffice[]>;
  tags: Observable<ITag[]>;

  @ViewChild('tagInput')
  tagInput!: ElementRef<HTMLInputElement>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { injector: Injector, employee: IUser },
    private dialogRef: MatDialogRef<AddEmployeeDialogComponent>
  ) {
    this.facade = this.data.injector.get(EmployeesFacadeService);
    this.snackbar = this.data.injector.get(MatSnackBar);
    this.facade.getOffices();
    this.facade.getTags();
    this.form = this.facade.getAddEmployeesForm(this.data.employee);
    this.offices = this.facade.offices;
    this.tags = this.facade.tags;
  }

  addTag(event: any): void {
    this.form.controls.tags.value.push({ text: event.value });
    this.form.controls.tags.updateValueAndValidity();
  }

  removeTag(event: any): void {
    console.log(event);
    const newValue = this.form.controls.tags.value;
    const index = newValue.findIndex((item: ITag) => item.id === event.id || item.text === event.text);
    newValue.splice(index, 1);
    this.form.controls.tags.patchValue(newValue);
    this.form.controls.tags.updateValueAndValidity();
  }

  selectedTag(event: MatAutocompleteSelectedEvent): void {
    this.form.controls.tags.value.push(event.option.value);
    this.form.controls.tags.updateValueAndValidity();
    this.tagInput.nativeElement.value = '';
  }

  createUser(): void {
    if (this.form.valid) {
      this.facade.createUser(this.form.getRawValue())
        .pipe((take(1))).subscribe(() => {
          this.facade.getEmployees();
          this.dialogRef.close();
        },
          err => {
            this.snackbar.open(err.error.message);
          });
    }
  }

  compareFn(x: IOffice | ITag, y: IOffice | ITag): boolean {
    return x && y ? x.id === y.id : x === y;
  }
}
