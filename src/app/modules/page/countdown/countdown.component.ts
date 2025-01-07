import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  CountdownEvent,
  CustomCountdownComponent,
} from '../../../shared/_component/custom-countdown/custom-countdown.component';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, CustomCountdownComponent],
})
export class CountdownComponent implements OnInit, AfterViewInit {
  @ViewChildren(CustomCountdownComponent)
  timers: QueryList<CustomCountdownComponent> = new QueryList<any>();

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.start();
  }

  start() {
    this.timers.toArray().forEach((timer) => timer.start());
  }

  pause() {
    this.timers.toArray().forEach((timer) => timer.pause());
  }

  stop() {
    this.timers.toArray().forEach((timer) => timer.stop());
  }

  retry() {
    this.timers.toArray().forEach((timer) => timer.retry());
  }
}
