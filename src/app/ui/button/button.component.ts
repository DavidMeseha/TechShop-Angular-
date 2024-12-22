import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { cn } from '../../../lib/utils';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() className: string = '';
  @Input() isLoading: boolean = false;
  @Input() spinnerSize: number | string = 24;
  @Output() onClick = new EventEmitter<MouseEvent>();
  cn = cn;

  clickEmit(event: MouseEvent) {
    if (this.isLoading) return;
    this.onClick.emit(event);
  }
}
