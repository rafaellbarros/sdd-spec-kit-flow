import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { QUOTES_API_URL, QuoteService } from './quote.service';

describe('QuoteService', () => {
  let service: QuoteService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuoteService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(QuoteService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should map DTO {q, a} to Quote {text, author}', async () => {
    const mockDto = [{ q: 'Test quote text', a: 'Test Author' }];

    const quotePromise = firstValueFrom(service.getRandomQuote());

    const req = httpTesting.expectOne(QUOTES_API_URL);
    expect(req.request.method).toBe('GET');
    req.flush(mockDto);

    const result = await quotePromise;
    expect(result).toEqual({ text: 'Test quote text', author: 'Test Author' });
  });
});
