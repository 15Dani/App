import { Injectable } from '@angular/core';
import { Enterprise } from '../_Models/Enterprise';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {
  private baseUrl = 'http://localhost:5000/api/enterprise';

constructor(private http: HttpClient) { }

getAllEnterprise(): Observable<Enterprise[]> {
  return this.http.get<Enterprise[]>(this.baseUrl);
}
getEnterpriseByNome(nome: string): Observable<Enterprise[]> {
  return this.http.get<Enterprise[]>(this.baseUrl);
}
getEnterpriseById(Id: number): Observable<Enterprise> {
  return this.http.get<Enterprise>(`${this.baseUrl}/${Id}`);
}
postEnterprise(enterprise: Enterprise) {
  return this.http.post(this.baseUrl, enterprise);
}

putEnterprise(enterprise: Enterprise) {
  return this.http.put(`${this.baseUrl}/${enterprise.id}`, enterprise);
}
 deleteEnterprise(id: number): Observable<Enterprise> {
  return this.http.delete<Enterprise>(`${this.baseUrl}/${id}`);
}
}




