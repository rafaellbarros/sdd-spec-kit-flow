import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { QuoteContainerComponent } from './quote-container.component';
import { QuoteService } from '../data/quote.service';

describe('QuoteContainerComponent', () => {
  let component: QuoteContainerComponent;
  let fixture: ComponentFixture<QuoteContainerComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteContainerComponent, HttpClientTestingModule],
      providers: [QuoteService],
    }).compileComponents();

    fixture = TestBed.createComponent(QuoteContainerComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    httpMock.expectOne('/api/quotes/random').flush([{ q: 'Test', a: 'A' }]);
  });

  it('should start in loading state', () => {
    fixture.detectChanges();
    expect(component.loading()).toBe(true);
    expect(component.quote()).toBeNull();
    expect(component.error()).toBeNull();
    httpMock.expectOne('/api/quotes/random').flush([{ q: 'Test', a: 'A' }]);
  });

  it('should transition to success state with quote after initial fetch', () => {
    fixture.detectChanges();
    const req = httpMock.expectOne('/api/quotes/random');
    req.flush([{ q: 'Hello world', a: 'Author' }]);
    fixture.detectChanges();

    expect(component.loading()).toBe(false);
    expect(component.quote()).toEqual({ text: 'Hello world', author: 'Author' });
    expect(component.error()).toBeNull();
  });

  it('should transition to error state on fetch failure', () => {
    fixture.detectChanges();
    const req = httpMock.expectOne('/api/quotes/random');
    req.flush('Error', { status: 500, statusText: 'Internal Server Error' });
    fixture.detectChanges();

    expect(component.loading()).toBe(false);
    expect(component.error()).not.toBeNull();
    expect(component.quote()).toBeNull();
  });

  it('should fetch a new quote when refresh is called', () => {
    fixture.detectChanges();
    httpMock.expectOne('/api/quotes/random').flush([{ q: 'First', a: 'A' }]);
    fixture.detectChanges();
    expect(component.quote()?.text).toBe('First');

    component.refresh();
    fixture.detectChanges();
    expect(component.loading()).toBe(true);

    const req2 = httpMock.expectOne('/api/quotes/random');
    req2.flush([{ q: 'Second', a: 'B' }]);
    fixture.detectChanges();

    expect(component.loading()).toBe(false);
    expect(component.quote()?.text).toBe('Second');
  });

  it('should disable refresh button during loading', () => {
    fixture.detectChanges();
    httpMock.expectOne('/api/quotes/random').flush([{ q: 'Test', a: 'A' }]);
    fixture.detectChanges();

    component.refresh();
    fixture.detectChanges();

    expect(component.loading()).toBe(true);
    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons.length).toBe(0);

    httpMock.expectOne('/api/quotes/random').flush([{ q: 'Next', a: 'B' }]);
    fixture.detectChanges();
  });

  it('should enable refresh button when not loading', () => {
    fixture.detectChanges();
    httpMock.expectOne('/api/quotes/random').flush([{ q: 'Test', a: 'A' }]);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(false);
  });

  it('should set loading to false after success (no infinite loading)', () => {
    fixture.detectChanges();
    httpMock.expectOne('/api/quotes/random').flush([{ q: 'Test', a: 'A' }]);
    fixture.detectChanges();
    expect(component.loading()).toBe(false);
  });

  it('should set loading to false after error (no infinite loading)', () => {
    fixture.detectChanges();
    const req = httpMock.expectOne('/api/quotes/random');
    req.flush('Error', { status: 500, statusText: 'Error' });
    fixture.detectChanges();
    expect(component.loading()).toBe(false);
  });

  it('should allow retry after error', () => {
    fixture.detectChanges();
    const req = httpMock.expectOne('/api/quotes/random');
    req.flush('Error', { status: 500, statusText: 'Error' });
    fixture.detectChanges();
    expect(component.error()).not.toBeNull();

    component.refresh();
    fixture.detectChanges();
    expect(component.loading()).toBe(true);
    expect(component.error()).toBeNull();

    const req2 = httpMock.expectOne('/api/quotes/random');
    req2.flush([{ q: 'Recovered', a: 'B' }]);
    fixture.detectChanges();

    expect(component.loading()).toBe(false);
    expect(component.quote()?.text).toBe('Recovered');
    expect(component.error()).toBeNull();
  });
});
