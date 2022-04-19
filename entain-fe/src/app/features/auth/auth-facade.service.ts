import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthApiService } from './services/auth-api.service';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { IUser } from './models/auth';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {
  private accessToken$ = new BehaviorSubject<string>('');
  private refreshToken$ = new BehaviorSubject<string>('');
  private currentUser$ = new BehaviorSubject<IUser | undefined>(undefined);
  form: FormGroup | undefined;

  constructor(
    private authApi: AuthApiService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  getForm(): FormGroup {
    return this.form = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(4), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  logIn(): void {
    this.authApi
      .logIn(this.form?.getRawValue())
      .pipe(take(1))
      .subscribe((response) => {
        if (response.accessToken && response.refreshToken) {
          this.setAccessToken(response.accessToken);
          this.setRefreshToken(response.refreshToken);
        }
      });
  }

  setAccessToken(token: string): void {
    this.accessToken$.next(token);
    this.setCurrentUser(jwt_decode(token));
    this.redirectToHome();
  }

  redirectToHome(): void {
    this.router.navigate(['employees']);
  }

  setRefreshToken(token: string): void {
    this.refreshToken$.next(token);
  }

  setCurrentUser(user: IUser): void {
    this.currentUser$.next(user);
  }
}
