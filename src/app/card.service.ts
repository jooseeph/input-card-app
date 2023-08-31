import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private baseUrl = 'http://localhost:3000'; // json-server adresini buraya ayarlayın

  constructor(private http: HttpClient) { }

  createCard(cardData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/cards`, cardData);
  }

  getCards(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/cards`);
  }

  // Diğer kart işlevlerini burada da tanımlayabilirsiniz
}
