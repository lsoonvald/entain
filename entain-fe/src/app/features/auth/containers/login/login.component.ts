import { Component, OnInit } from '@angular/core';
import { AuthFacadeService } from '../../auth-facade.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = this.facade.getForm();

  constructor(
    private facade: AuthFacadeService
  ) {}

  ngOnInit(): void {

  }

  logIn(): void {
    if (this.form.valid) {
      this.facade.logIn();
    }
  }

}
