import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name: string ='';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  register() {
    const user = { name: this.name, email: this.email, password: this.password };
    this.authService.register(user).subscribe(response => {
      console.log(response);
    });
  }
}
