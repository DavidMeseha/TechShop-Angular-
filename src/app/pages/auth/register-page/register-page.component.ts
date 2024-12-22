import { Component } from '@angular/core';
import { FormTextInputComponent } from '../../../ui/form-text-input/form-text-input.component';
import { ButtonComponent } from '../../../ui/button/button.component';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import UserService from '../../../services/auth.services';
import { HttpErrorResponse } from '@angular/common/http';
import { FieldError } from '../../../../types';
import { NgIf } from '@angular/common';

const cleanErrors: {
  response: FieldError;
  email: FieldError;
  firstName: FieldError;
  lastName: FieldError;
  password: FieldError;
  confirmPassword: FieldError;
} = {
  confirmPassword: false,
  lastName: false,
  email: false,
  firstName: false,
  password: false,
  response: false,
};

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    FormTextInputComponent,
    ButtonComponent,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  registerForm: FormGroup;
  errors = cleanErrors;

  constructor(
    private fb: FormBuilder,
    private authService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.min(8)]],
      confirmPassword: ['', [Validators.required, Validators.min(8)]],
    });
  }

  private validateForm() {
    this.errors = cleanErrors;
    let isInvalid = this.registerForm.invalid;

    Object.keys(this.registerForm.controls).forEach((field) => {
      if (this.registerForm.controls[field].invalid) {
        this.errors[
          field as keyof typeof this.errors
        ] = `${field} is not a valid ${field}`;
      }
    });

    if (
      this.registerForm.value.password !==
      this.registerForm.value.confirmPassword
    ) {
      isInvalid = true;
      this.errors.confirmPassword = 'Confirm password do not match password';
    }

    if (this.registerForm.value.password.length <= 8) {
      isInvalid = true;
      this.errors.password = 'Password must be of length 8';
    }

    return !isInvalid;
  }

  onSubmit() {
    if (!this.validateForm()) return;

    const registerData = this.registerForm.value;
    this.authService.register(registerData).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 400) {
          this.errors.response = 'Email is already registered';
        }
      },
    });
  }
}
