import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface ZenQuotesResponse {
  q: string;
  a: string;
  h?: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private readonly apiUrl = 'https://zenquotes.io/api/random';

  constructor(private http: HttpClient) {}

  getRandomQuote(): Observable<ZenQuotesResponse> {
    return this.http.get<ZenQuotesResponse[]>(this.apiUrl).pipe(
      map(responses => responses[0]),
      catchError(() => of({ q: '', a: '' }))
    );
  }
}
