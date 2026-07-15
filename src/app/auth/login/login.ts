import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  username     = 'admin';
  password     = 'admin@123';
  showPassword = false;
  rememberMe   = true;
  isLoading    = false;
  errorMessage = '';

  year = new Date().getFullYear();

  constructor(private router: Router) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  clearError(): void {
    this.errorMessage = '';
  }

  onSubmit(): void {
    this.clearError();

    if (!this.username.trim()) {
      this.errorMessage = 'Please enter your username.';
      return;
    }
    if (!this.password.trim()) {
      this.errorMessage = 'Please enter your password.';
      return;
    }

    // Demo design — navigate straight to dashboard (zoneless-safe, no setTimeout)
    this.isLoading = true;
    this.router.navigateByUrl('/dashboard');
  }
}
