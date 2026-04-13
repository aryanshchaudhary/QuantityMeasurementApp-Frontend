import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // ✅ getters (needed for HTML validation)
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
  if (this.loginForm.invalid) return;

  this.authService.login(this.loginForm.value).subscribe({
    next: (res: any) => {

      const token = res?.token;

      if (!token) {
        alert("Token missing ❌");
        return;
      }

      localStorage.setItem('token', token);

      this.router.navigateByUrl('/dashboard');
    },
    error: () => {
      alert("Login failed ❌");
    }
  });
}
}
