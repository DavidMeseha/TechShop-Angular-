import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating-stars.component.html',
})
export class RatingStarsComponent implements OnInit {
  @Input() rate = 0;
  @Input() isEditable = false;
  tempRate = 0;

  ngOnInit(): void {
    this.tempRate = this.rate;
  }

  mouseMoveHandle(e: MouseEvent) {}

  mouseEnterHandle(e: MouseEvent) {}

  onChange(value: number) {}
}
