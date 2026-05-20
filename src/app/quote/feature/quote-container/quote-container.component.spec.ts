import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';

import { Quote } from '../../data/models/quote.model';
import { QuoteService } from '../../data/services/quote.service';
import { QUOTE_LOAD_ERROR_MESSAGE, QuoteContainerComponent } from './quote-container.component';

describe('QuoteContainerComponent', () => {
  let fixture: ComponentFixture<QuoteContainerComponent>;
  let getRandomQuoteSpy: ReturnType<typeof vi.fn>;

  const mockQuote: Quote = { text: 'Test quote', author: 'Test Author' };

  function setupWithMock(overrides?: {
    returnValue?: ReturnType<QuoteService['getRandomQuote']>;
    returnValues?: ReturnType<QuoteService['getRandomQuote']>[];
  }) {
    if (overrides?.returnValues) {
      getRandomQuoteSpy = vi.fn();
      overrides.returnValues.forEach((v) => getRandomQuoteSpy.mockReturnValueOnce(v));
    } else {
      getRandomQuoteSpy = vi.fn().mockReturnValue(overrides?.returnValue ?? of(mockQuote));
    }
    TestBed.configureTestingModule({
      imports: [QuoteContainerComponent],
      providers: [{ provide: QuoteService, useValue: { getRandomQuote: getRandomQuoteSpy } }],
    });
    fixture = TestBed.createComponent(QuoteContainerComponent);
  }

  it('calls service on init', () => {
    setupWithMock({ returnValue: of(mockQuote) });
    fixture.detectChanges();
    expect(getRandomQuoteSpy).toHaveBeenCalledTimes(1);
  });

  it('shows loading while waiting', () => {
    const subject = new Subject<Quote>();
    setupWithMock({ returnValue: subject.asObservable() });
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Loading...');
  });

  it('renders quote on success', async () => {
    setupWithMock({ returnValue: of(mockQuote) });
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Test quote');
    expect(el.textContent).toContain('Test Author');
  });

  it('shows error message on failure', async () => {
    setupWithMock({ returnValue: throwError(() => new Error('Network')) });
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain(QUOTE_LOAD_ERROR_MESSAGE);
  });

  it('retry via refresh works', async () => {
    setupWithMock({
      returnValues: [throwError(() => new Error('Network')), of(mockQuote)],
    });
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    let el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain(QUOTE_LOAD_ERROR_MESSAGE);

    const button = el.querySelector('button') as HTMLButtonElement;
    button.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(getRandomQuoteSpy).toHaveBeenCalledTimes(2);
    el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Test quote');
    expect(el.textContent).toContain('Test Author');
  });
});
