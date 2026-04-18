// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class OperationService {

//   private baseUrl = 'http://localhost:8080/api';

//   // ✅ History microservice URL (CHANGE PORT if needed)
//   private historyUrl = 'http://localhost:8083/api/history';

//   constructor(private http: HttpClient) {}

//   // ================== OPERATIONS ==================

//   convert(data: any, targetUnit: string): Observable<any> {
//     return this.http.post(
//       `${this.baseUrl}/convert?targetUnit=${targetUnit.toUpperCase()}`,
//       data
//     );
//   }

//   add(data: any[]): Observable<any> {
//     return this.http.post(`${this.baseUrl}/add`, data);
//   }

//   subtract(data: any[]): Observable<any> {
//     return this.http.post(`${this.baseUrl}/subtract`, data);
//   }

//   divide(data: any[]): Observable<any> {
//     return this.http.post(`${this.baseUrl}/divide`, data);
//   }

//   compare(data: any[]): Observable<any> {
//     return this.http.post(`${this.baseUrl}/compare`, data);
//   }

//   // ================== HISTORY ==================

//   // ✅ SAVE HISTORY
//   saveHistory(data: any): Observable<any> {
//     return this.http.post(`${this.historyUrl}/save`, data);
//   }

//   // ✅ GET HISTORY (optional if you want to reuse)
//   getHistory(userName: string): Observable<any> {
//     return this.http.get(`${this.historyUrl}/${userName}`);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  // ✅ Use ONLY gateway URL
  private baseUrl = 'https://gateway-service-vg52.onrender.com';

  constructor(private http: HttpClient) {}

  // ================== OPERATIONS ==================

  convert(data: any, targetUnit: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/api/convert?targetUnit=${targetUnit.toUpperCase()}`,
      data
    );
  }

  add(data: any[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/add`, data);
  }

  subtract(data: any[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/subtract`, data);
  }

  divide(data: any[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/divide`, data);
  }

  compare(data: any[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/compare`, data);
  }

  // ================== HISTORY ==================

  saveHistory(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/history/save`, data);
  }

  getHistory(userName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/history/${userName}`);
  }
}
