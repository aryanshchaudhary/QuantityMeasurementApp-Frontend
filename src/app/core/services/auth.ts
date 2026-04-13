import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(data: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, data)
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token); // ✅ STORE TOKEN
        })
      );
  }

  signup(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  logout() {
    localStorage.removeItem('token'); // ✅ logout
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
