import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Quote, ZenQuotesDTO } from './quote.model';

@Injectable({ providedIn: 'root' })
export class QuoteService {
  private readonly http = inject(HttpClient);

  fetchRandomQuote(): Observable<Quote> {
    return this.http
      .get<ZenQuotesDTO[]>('/api/quotes/random')
      .pipe(map((response) => this.mapDto(response[0])));
  }

  private mapDto(dto: ZenQuotesDTO): Quote {
    return {
      text: dto.q.trim(),
      author: dto.a.trim(),
    };
  }
}
