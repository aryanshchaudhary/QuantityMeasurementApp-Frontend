import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // ✅ CONVERT (with query param)
  convert(data: any, targetUnit: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/convert?targetUnit=${targetUnit.toUpperCase()}`,
      data
    );
  }

  // ✅ SEND ARRAY DIRECTLY
  add(data: any[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, data);
  }

  subtract(data: any[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/subtract`, data);
  }

  divide(data: any[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/divide`, data);
  }

  compare(data: any[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/compare`, data);
  }
}
