import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms'; // Для [(ngModel)]
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage {
  email = ''
  password = ''
  loading = false
  error = ''

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.loading = true
    
    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        this.loading = false
        this.router.navigate(['profile/'])
      },
      error: err => {
        this.error = err.message;
        this.loading = false;
      }
    })
  }
}
