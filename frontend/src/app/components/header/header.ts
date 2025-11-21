import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterModule} from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';


@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  user$;

  constructor(private auth: AuthService, private router: Router) {
    this.user$ = this.auth.currentUser$;
  }

  logout() {
    this.auth.logout().subscribe(() => this.router.navigate(['/login']));
  }
}
