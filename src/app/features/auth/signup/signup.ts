import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth';

interface SignupResponse {
  message: string;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class SignupComponent {

  signupForm: FormGroup;
  isLoading = false;

  successMessage = '';
  errorMessage = '';

  // 🔥 popup control
  showPopup = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get name() {
    return this.signupForm.get('name');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  onSubmit() {

    if (this.signupForm.invalid || this.isLoading) return;

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.authService.signup(this.signupForm.value).subscribe({

      next: (res: SignupResponse) => {

        this.isLoading = false;

        this.successMessage = res.message || 'Signup successful ✅';

        // 🔥 SHOW POPUP
        this.showPopup = true;

        // 🔁 Redirect after 2 sec
        setTimeout(() => {
          this.showPopup = false;
          this.router.navigate(['/login']);
        }, 2000);
      },

      error: (err) => {

        this.isLoading = false;

        this.errorMessage =
          err?.error?.message ||
          err?.error ||
          'Signup failed ❌';

        // 🔥 show error popup
        this.showPopup = true;

        setTimeout(() => {
          this.showPopup = false;
        }, 2000);
      }
    });
  }
}
