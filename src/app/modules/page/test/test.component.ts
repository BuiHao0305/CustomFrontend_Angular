import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CustomCountdownComponent } from '../../../shared/_component/custom-countdown/custom-countdown.component';
import { Custom_datepickerComponent } from '../../../shared/_component/datepicker/component/custom_datepicker/custom_datepicker.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    // CustomCountdownComponent,
    Custom_datepickerComponent,
  ],
  standalone: true,
})
export class TestComponent implements OnInit {
  countdowntime = 0;
  // constructor(private otpService: OtpService) {}

  @ViewChildren(CustomCountdownComponent)
  timers: QueryList<CustomCountdownComponent> = new QueryList<any>();

  ngOnInit(): void {}
  // ngAfterViewInit(): void {
  //   this.otpService.getOtp().subscribe((response) => {
  //     this.countdowntime = response.countdowntime;
  //   });
  //   this.start();
  // }

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
