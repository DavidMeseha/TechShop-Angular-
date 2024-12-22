import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormTextInputComponent } from '../../../ui/form-text-input/form-text-input.component';
import { login } from '../../../store/user/user.actions';
import { Store } from '@ngrx/store';
import { UserState } from '../../../store/app.state';
import { RouterLink } from '@angular/router';
import { selectActionState } from '../../../store/user/user.selectors';
import { FieldError } from '../../../../types';
import { ButtonComponent } from '../../../ui/button/button.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    FormTextInputComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    ButtonComponent,
  ],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  loginForm: FormGroup;
  loading = false;
  errors: { response: FieldError; email: FieldError } = {
    response: false,
    email: false,
  };

  constructor(
    private fb: FormBuilder,
    private store: Store<{ user: UserState }>
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    store.select(selectActionState).subscribe((res) => {
      this.errors.response = res.error ?? false;
      this.loading = res.loading;
    });
  }

  onSubmit() {
    if (this.loginForm.controls['email'].invalid)
      return (this.errors.email = 'Invalid email format');

    const { email, password } = this.loginForm.value;
    this.store.dispatch(login({ email, password }));
  }
}
