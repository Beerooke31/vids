import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../shared/input/input.component';
import { AlertComponent } from '../../shared/alert/alert.component';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, InputComponent, AlertComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  #auth = inject(Auth);
  #firestore = inject(Firestore);

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    age: [18, [Validators.required, Validators.min(18), Validators.max(120)]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
        ),
      ],
    ],
    confirmPassword: ['', [Validators.required]],
    phoneNumber: [
      '',
      [Validators.required, Validators.minLength(9), Validators.maxLength(10)],
    ],
  });

  showAlert = signal(false);
  alertMsg = signal('Please wait! Your account is being created.');
  alertColour = signal('blue');
  inSubmission = signal(false);

  async register() {
    this.showAlert.set(true);
    this.alertMsg.set('Please wait! Your account is being created.');
    this.alertColour.set('blue');
    this.inSubmission.set(true);

    const { email, password } = this.form.getRawValue();
    try {
      const userCred = await createUserWithEmailAndPassword(
        this.#auth,
        email,
        password
      );

      await addDoc(collection(this.#firestore, 'users'), {
        name: this.form.getRawValue().name,
        email: this.form.getRawValue().email,
        age: this.form.getRawValue().age,
        phoneNumber: this.form.getRawValue().phoneNumber,
      });
      console.log(userCred);
    } catch (err) {
      console.error(err);

      this.alertMsg.set(
        'An unexpected error occurred! Please try again later.'
      );
      this.alertColour.set('red');
      this.inSubmission.set(false);
      return;
    }

    this.alertMsg.set('Success! Your account has been created.');
    this.alertColour.set('green');
  }
}
