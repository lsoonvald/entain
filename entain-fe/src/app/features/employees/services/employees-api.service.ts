import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOffice, ITag, IUser } from '../../auth/models/auth';

@Injectable({
  providedIn: 'root'
})
export class EmployeesApiService {

  constructor(
    private http: HttpClient
  ) {}

  deleteEmployee(employee: IUser): Observable<IUser[]> {
    return this.http.delete<IUser[]>(`/user/${employee.id}`);
  }

  getEmployees(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`/user`);
  }

  getOffices(): Observable<IOffice[]> {
    return this.http.get<IOffice[]>(`/office`);
  }

  getTags(): Observable<ITag[]> {
    return this.http.get<ITag[]>(`/tag`);
  }

  createUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`/user`, user);
  }
}
