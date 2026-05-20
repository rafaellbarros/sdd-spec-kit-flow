import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Quote } from '../models/quote.model';

export interface ZenQuotesResponse {
  q: string;
  a: string;
  h?: string;
}
export const QUOTES_API_URL = '/api/quotes';
@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  constructor(private http: HttpClient) {}

  getRandomQuote(): Observable<Quote> {
    return this.http.get<ZenQuotesResponse[]>(QUOTES_API_URL).pipe(
      map((arr) => {
        const dto = arr[0];
        return { text: dto.q, author: dto.a };
      }),
    );
  }
}
