import { Component, inject,effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Dynamic Angular Dashboard';
  private authService = inject(AuthService);
  private router = inject(Router);
  isDarkMode = false;
  isLoggedIn = this.authService.isAuthenticated();

  constructor() {
    this.applyTheme();
    effect(() => {
      this.isLoggedIn = this.authService.isAuthenticated();
    });
  }

  checkAuthStatus() {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  logout() {
    this.authService.logout();
    this.applyTheme();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  applyTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}