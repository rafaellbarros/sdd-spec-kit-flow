import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-quote-card',
  imports: [],
  templateUrl: './quote-card.component.html',
  styleUrl: './quote-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteCardComponent {
  readonly text = input.required<string>();
  readonly author = input.required<string>();
  readonly refresh = output<void>();
}
