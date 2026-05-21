import { Component, inject, signal, OnInit, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteCardComponent } from '../ui/quote-card.component';
import { QuoteService } from '../data/quote.service';
import { Quote } from '../data/quote.model';

@Component({
  selector: 'app-quote-container',
  imports: [CommonModule, QuoteCardComponent],
  templateUrl: './quote-container.component.html',
  styleUrl: './quote-container.component.scss',
})
export class QuoteContainerComponent implements OnInit {
  private readonly quoteService = inject(QuoteService);
  private readonly destroyRef = inject(DestroyRef);

  readonly loading = signal(true);
  readonly quote = signal<Quote | null>(null);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.fetchQuote();
  }

  refresh(): void {
    this.fetchQuote();
  }

  private fetchQuote(): void {
    this.loading.set(true);
    this.error.set(null);

    const subscription = this.quoteService.fetchRandomQuote().subscribe({
      next: (quote) => {
        this.quote.set(quote);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(this.getErrorMessage(err));
        this.loading.set(false);
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  private getErrorMessage(err: unknown): string {
    const isNetworkError = typeof err === 'object' && err !== null && 'status' in err && (err as { status: number }).status === 0;
    if (isNetworkError) {
      return 'Unable to connect to the server. Check your internet connection and try again.';
    }
    return 'Failed to load the quote. Please try again.';
  }
}
