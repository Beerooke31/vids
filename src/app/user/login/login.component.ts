import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { AlertComponent } from '../../shared/alert/alert.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, AlertComponent],
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
  showAlert = signal(false);
  alertMsg = signal('Hold please. Logging you in.');
  alertColour = signal('blue');
  inSubmission = signal(false);

  async login() {
    this.showAlert.set(true);
    this.alertMsg.set('Hold please. Logging you in.');
    this.alertColour.set('blue');
    this.inSubmission.set(true);

    try {
      await signInWithEmailAndPassword(
        this.auth,
        this.credentials.email,
        this.credentials.password
      );
    } catch (err) {
      console.error(err);
      this.alertMsg.set(
        'An unexpected error occurred! Please try again later.'
      );
      this.alertColour.set('red');
      this.inSubmission.set(false);
      return;
    }

    this.alertMsg.set("Success! You've been logged in.");
    this.alertColour.set('green');
  }
}
