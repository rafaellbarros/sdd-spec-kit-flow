import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';

import { Quote } from '../../data/models/quote.model';
import { QuoteService } from '../../data/services/quote.service';
import { QuoteCardComponent } from '../../ui/quote-card/quote-card.component';

export const QUOTE_LOAD_ERROR_MESSAGE = 'Failed to load quote. Please try again.';

@Component({
  selector: 'app-quote-container',
  standalone: true,
  imports: [CommonModule, QuoteCardComponent],
  templateUrl: './quote-container.component.html',
  styleUrl: './quote-container.component.scss',
})
export class QuoteContainerComponent {
  private readonly quoteService = inject(QuoteService);

  protected readonly quote = signal<Quote | null>(null);
  protected readonly loading = signal(true);
  protected readonly errorMessage = signal('');

  ngOnInit(): void {
    this.loadQuote();
  }

  loadQuote(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.quoteService.getRandomQuote().subscribe({
      next: (response) => {
        this.quote.set(response);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set(QUOTE_LOAD_ERROR_MESSAGE);
        this.loading.set(false);
      },
    });
  }

  handleRefresh(): void {
    this.loadQuote();
  }
}
