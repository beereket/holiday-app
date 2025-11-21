import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-register-page',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css'
})
export class RegisterPage {
  email = ''
  password = ''
  loading = false
  error = ''

  constructor(private auth: AuthService, private router: Router) {}

  signup() {
    this.loading = true;
    this.error = '';

    this.auth.signUp(this.email, this.password).subscribe({
      next: () => {
       this.loading = false
       this.router.navigate(['profile']) 
      },
      error: err => {
        this.error = err.message
        this.loading = false
      }
    }
    )
  }
}
