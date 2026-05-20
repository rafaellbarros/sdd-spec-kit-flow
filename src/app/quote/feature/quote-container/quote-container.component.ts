import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { QuoteCardComponent } from '../../ui/quote-card/quote-card.component';
import { QuoteService, ZenQuotesResponse } from '../../data/services/quote.service';

@Component({
  selector: 'app-quote-container',
  standalone: true,
  imports: [CommonModule, QuoteCardComponent],
  templateUrl: './quote-container.component.html',
  styleUrl: './quote-container.component.css'
})
export class QuoteContainerComponent {
  private readonly quoteService = inject(QuoteService);

  // Signals para estado
  loading = false;
  errorMessage = '';
  quoteText = '';
  author = '';

  private subscription?: Subscription;

  ngOnInit(): void {
    this.loadQuote();
  }

  loadQuote(): void {
    this.loading = true;
    this.errorMessage = '';

    this.subscription?.unsubscribe();

    this.subscription = this.quoteService.getRandomQuote().subscribe({
      next: (response: ZenQuotesResponse) => {
        this.quoteText = response.q;
        this.author = response.a;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Erro ao carregar citação. Tente novamente.';
        this.loading = false;
      }
    });
  }

  handleRefresh(): void {
    this.loadQuote();
  }
}
