import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IOffice, ITag, IUser, IUserForm } from '../auth/models/auth';
import { EmployeesApiService } from './services/employees-api.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesFacadeService {

  private employees$ = new BehaviorSubject<IUser[]>([]);
  employees = this.employees$.asObservable();
  private offices$ = new BehaviorSubject<IOffice[]>([]);
  offices = this.offices$.asObservable();
  private tags$ = new BehaviorSubject<ITag[]>([]);
  tags = this.tags$.asObservable();
  addEmployeesForm!: FormGroup;

  constructor(
    private api: EmployeesApiService,
    private fb: FormBuilder
  ) {}

  deleteEmployee(employee: IUser): void {
    this.api.deleteEmployee(employee).pipe((take(1))).subscribe(() => {
      this.getEmployees();
    });
  }

  getEmployees(): void {
    this.api.getEmployees().pipe((take(1))).subscribe((employees) => {
      if (employees) { this.employees$.next(employees); }
    });
  }

  getOffices(): void {
    this.api.getOffices().pipe((take(1))).subscribe((offices) => {
      if (offices) { this.offices$.next(offices); }
    });
  }

  getTags(): void {
    this.api.getTags().pipe((take(1))).subscribe((tags) => {
      if (tags) { this.tags$.next(tags); }
    });
  }

  createUser(user: IUser): Observable<IUser> {
    return this.api.createUser(user);
  }

  getAddEmployeesForm(employee?: IUser): FormGroup {
    this.addEmployeesForm = this.fb.group({
      id: [''],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      office: [''],
      birthDate: [''],
      mobile: [''],
      tags: ['']
    });

    if (employee) { this.addEmployeesForm.patchValue(employee); }

    return this.addEmployeesForm;
  }

  mapEmployeeValue(employee: IUser): IUserForm {
    const returnValue: IUserForm = Object.assign({}, employee) as IUserForm;
    if (employee.office) { returnValue.office = parseInt(employee.office.id, 10); }
    if (employee.tags) { returnValue.tags = employee.tags.map(tag => parseInt(tag.id, 10)); }
    return returnValue;
  }
}
