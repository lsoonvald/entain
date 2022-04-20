import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
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
  ) {
    this.facade.currentUser.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.facade.redirectToHome();
      }
    })
  }

  ngOnInit(): void {

  }

  logIn(): void {
    if (this.form.valid) {
      this.facade.logIn();
    }
  }

}
