import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent implements OnInit {
  constructor() {}

  amount = 0;

  @Input() currentValue!: number | null;

  @Output() increment = new EventEmitter<void>();
  @Output() decreement = new EventEmitter<void>();
  @Output() incrementByAmount = new EventEmitter<number>();

  ngOnInit(): void {}
}
