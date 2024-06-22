import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  code: string = '';
  userId: string = '';
  show2FA: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    const credentials = { email: this.email, password: this.password };
    this.authService.login(credentials).subscribe(response => {
      this.show2FA = true;
      this.userId = response.userId;
    });
  }

  validate2FA() {
    this.authService.validate2FA(this.email, this.code).subscribe(response => {
      localStorage.setItem('token', response.token);
      this.router.navigate(['/profile']);
    });
  }
}
