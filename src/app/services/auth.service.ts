import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';

  private _isAuthenticated = signal(false);
  isAuthenticated = computed(() => this._isAuthenticated());
  private _username = signal(null);
  username = this._username;

  constructor(private http: HttpClient) {
    this._isAuthenticated.set(!!localStorage.getItem('token'));
  }

  login(credentials: { username: string, password: string }) {
    return this.http.get<any[]>(`${this.apiUrl}?username=${credentials.username}&password=${credentials.password}`).pipe(
      map(users => {
        if (users.length) {
          const user = users[0];
          localStorage.setItem('token', user.token);
          localStorage.setItem('username', user.username);
          this._username.set(user.username);
          this._isAuthenticated.set(true);
          return user;
        } else {
          throw new Error('Invalid credentials');
        }
      }),
      catchError(error => {
        return throwError(() => new Error('Login failed'));
      })
    );
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    this._isAuthenticated.set(false);
  }

  // isAuthenticated(): boolean {
  //   const token = localStorage.getItem('token');
  //   console.log('checking isAuthenticated has token:', token);
  //   return !this.jwtHelper.isTokenExpired(token);
  // }
}