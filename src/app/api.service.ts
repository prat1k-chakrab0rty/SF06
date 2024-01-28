import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseApiUrl: string = "https://light-gold-chipmunk.cyclic.app";
  // baseApiUrl: string = "http://localhost:3000";
  constructor(private http: HttpClient) { }

  login(passcode: string): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/users/login/' + passcode);
  }
  getAllTransactions(type: string): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/transactions/filter/' + type);
  }
  getAllUsers(): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/users');
  }
  getUserById(id: string): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/users/' + id);
  }
  createTransaction(payload: any): Observable<any> {
    return this.http.post<any>(this.baseApiUrl + '/transactions', payload);
  }
  updateTransaction(payload: any, transactionId: string): Observable<any> {
    return this.http.put<any>(this.baseApiUrl + '/transactions/' + transactionId, payload);
  }
  removeTransaction(transactionId: string): Observable<any> {
    return this.http.delete<any>(this.baseApiUrl + '/transactions/' + transactionId);
  }
  getAvailableBalance(): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/transactions/getBalance');
  }
  getTotalCreditedAmount(): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/transactions/getTotalCreditedAmount');
  }
  getDuesDetail(): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/transactions/getDuesDetail');
  }
  getCreditedTransactionForCurrentMonth(): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/transactions/getCredits/currentMonth');
  }
  clearDuesForUser(userId:string): Observable<any> {
    return this.http.put<any>(this.baseApiUrl + '/transactions/clearDues/'+userId,{});
  }

}
