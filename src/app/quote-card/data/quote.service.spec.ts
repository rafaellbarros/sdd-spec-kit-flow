import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { QuoteService } from './quote.service';
import { Quote } from './quote.model';

describe('QuoteService', () => {
  let service: QuoteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuoteService],
    });
    service = TestBed.inject(QuoteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should make a GET request to /api/quotes/random', () => {
    const mockDto = [{ q: 'Test quote', a: 'Test Author' }];

    service.fetchRandomQuote().subscribe((quote: Quote) => {
      expect(quote.text).toBe('Test quote');
      expect(quote.author).toBe('Test Author');
    });

    const req = httpMock.expectOne('/api/quotes/random');
    expect(req.request.method).toBe('GET');
    req.flush(mockDto);
  });

  it('should map DTO q field to Quote text', () => {
    const mockDto = [{ q: 'Hello world', a: 'Someone' }];

    service.fetchRandomQuote().subscribe((quote) => {
      expect(quote.text).toBe('Hello world');
    });

    httpMock.expectOne('/api/quotes/random').flush(mockDto);
  });

  it('should map DTO a field to Quote author', () => {
    const mockDto = [{ q: 'Some text', a: 'The Author' }];

    service.fetchRandomQuote().subscribe((quote) => {
      expect(quote.author).toBe('The Author');
    });

    httpMock.expectOne('/api/quotes/random').flush(mockDto);
  });

  it('should trim whitespace from text and author', () => {
    const mockDto = [{ q: '  padded quote  ', a: '  padded author  ' }];

    service.fetchRandomQuote().subscribe((quote) => {
      expect(quote.text).toBe('padded quote');
      expect(quote.author).toBe('padded author');
    });

    httpMock.expectOne('/api/quotes/random').flush(mockDto);
  });

  it('should propagate HTTP errors', () => {
    let capturedError: unknown;

    service.fetchRandomQuote().subscribe({
      error: (error) => {
        capturedError = error;
      },
    });

    const req = httpMock.expectOne('/api/quotes/random');
    req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });

    expect((capturedError as { status: number }).status).toBe(500);
  });
});
