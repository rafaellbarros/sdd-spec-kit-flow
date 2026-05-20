import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-quote-card',
  standalone: true,
  imports: [],
  templateUrl: './quote-card.component.html',
  styleUrl: './quote-card.component.css'
})
export class QuoteCardComponent {
  // Inputs (Signal)
  readonly quoteText = input<string>('');
  readonly author = input<string>('');
  readonly loading = input<boolean>(false);
  readonly errorMessage = input<string>('');

  // Outputs (Signal)
  readonly refresh = output<void>();
}
