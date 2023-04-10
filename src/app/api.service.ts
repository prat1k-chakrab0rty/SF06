import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseApiUrl: string = "https://light-gold-chipmunk.cyclic.app";
  constructor(private http: HttpClient) { }

  login(passcode: string): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/users/login/' + passcode);
  }
  getAllTransactions(): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/transactions');
  }
  getAllUsers(): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/users');
  }
  getUserById(id:string): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/users/'+id);
  }
  createTransaction(payload:any): Observable<any> {
    return this.http.post<any>(this.baseApiUrl + '/transactions',payload);
  }
  updateTransaction(payload:any,transactionId:string): Observable<any> {
    return this.http.put<any>(this.baseApiUrl + '/transactions/'+transactionId,payload);
  }
  getAvailableBalance(): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/transactions/getBalance');
  }
  getTotalCreditedAmount(): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/transactions/getTotalCreditedAmount');
  }
}
