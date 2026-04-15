import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private baseUrl = "http://localhost:8083/api/history";

  constructor(private http: HttpClient) {}

  // ✅ SAVE HISTORY
  saveHistory(data: any) {
    return this.http.post(`${this.baseUrl}/save`, data);
  }

  // ✅ GET HISTORY
  getHistory(userName: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/${userName}`);
}
}
