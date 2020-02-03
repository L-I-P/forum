import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
    .pipe(tap((user: User) => {
        localStorage.setItem('name', user.username.replace('"', ''));
        localStorage.setItem('token', user.token.replace('"', ''));
        return user;
    }));
  }

  logout() {
    localStorage.removeItem('name');
    localStorage.removeItem('token');
  }
}
