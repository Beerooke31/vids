import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { AlertComponent } from '../../shared/alert/alert.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  auth = inject(Auth);
  credentials = {
    email: '',
    password: '',
  };

  submitted = false;

  async login() {
    try {
      signInWithEmailAndPassword(
        this.auth,
        this.credentials.email,
        this.credentials.password
      );
    } catch (err) {
      console.error(err);
    }
  }
}
