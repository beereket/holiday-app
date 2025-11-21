import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  selector: 'app-profile-page',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule
],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css'
})
export class ProfilePage {
  user$;

  constructor(private auth: AuthService, private router: Router) {
    this.user$ = this.auth.currentUser$;
  }


  logout() {
    this.auth.logout().subscribe(() => this.router.navigate(['/login']));
  }
}
