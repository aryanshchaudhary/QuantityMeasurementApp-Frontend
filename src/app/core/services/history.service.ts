// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class HistoryService {

//   private baseUrl = "http://localhost:8083/api/history";

//   constructor(private http: HttpClient) {}

//   // ✅ SAVE HISTORY
//   saveHistory(data: any) {
//     return this.http.post(`${this.baseUrl}/save`, data);
//   }

//   // ✅ GET HISTORY
//   getHistory(userName: string): Observable<any> {
//   return this.http.get(`${this.baseUrl}/${userName}`);
// }
// }


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  // ✅ Use API Gateway
  private baseUrl = "https://gateway-service-vg52.onrender.com/api/history";

  constructor(private http: HttpClient) {}

  // ✅ SAVE HISTORY
  saveHistory(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/save`, data);
  }

  // ✅ GET HISTORY
  getHistory(userName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userName}`);
  }
}