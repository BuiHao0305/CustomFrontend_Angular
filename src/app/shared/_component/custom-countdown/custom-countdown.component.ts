import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
export interface CountdownFormatFnOption {
  date: number;
  formatStr: string;
  timezone?: string;
}
export enum CountdownStatus {
  ing = 0,
  pause = 1,
  stop = 2,
  done = 3,
}

export type CountdownEventAction =
  | 'start'
  | 'stop'
  | 'pause'
  | 'resume'
  | 'retry'
  | 'done';

export interface CountdownEvent {
  action: CountdownEventAction;
  status: CountdownStatus;
  left: number;
  text: string;
}
@Component({
  selector: 'app-custom-countdown',
  templateUrl: './custom-countdown.component.html',
  styleUrls: ['./custom-countdown.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class CustomCountdownComponent {
  @Input() countdownTime: number = 0;
  @Input() format: string = 'mm:ss';
  @Output() countdownFinished = new EventEmitter<void>();
  @Output() countdownEvent = new EventEmitter<CountdownEvent>();

  displayTime: string = '00:00';
  private timer: any;
  private currentTime: number = 0;
  private status: CountdownStatus = CountdownStatus.stop;

  ngOnInit() {
    this.resetTimer();
  }

  @Input() demand: boolean = false;

  private resetTimer() {
    console.log('reset time');
    this.currentTime = this.countdownTime;
    this.updateDisplayTime();
    this.status = CountdownStatus.stop;
    this.emitEvent('stop');
  }

  private updateDisplayTime() {
    const minutes = Math.floor(this.currentTime / 60);
    const seconds = this.currentTime % 60;
    this.displayTime =
      this.formatTime(minutes) + ':' + this.formatTime(seconds);
  }

  private formatTime(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  public start() {
    if (this.timer) return;
    console.log('start time');
    this.status = CountdownStatus.ing;
    this.emitEvent('start');

    this.timer = setInterval(() => {
      if (this.currentTime > 0) {
        this.currentTime--;
        this.updateDisplayTime();
      } else {
        this.stop();
        this.countdownFinished.emit();
        this.status = CountdownStatus.done;
        this.emitEvent('done');
      }
    }, 1000); // Interval 1 giây
  }

  public pause() {
    if (this.status !== CountdownStatus.ing) return;
    console.log('pause time');
    clearInterval(this.timer);
    this.timer = null;
    this.status = CountdownStatus.pause;
    this.emitEvent('pause');
  }

  public stop() {
    console.log('stop time');
    this.pause();
    this.resetTimer();
  }

  public retry() {
    console.log('retry time');
    this.stop();
    this.start();
    this.emitEvent('retry');
  }

  public resume() {
    if (this.status !== CountdownStatus.pause) return;
    this.start();
    this.emitEvent('resume');
  }

  private emitEvent(action: CountdownEventAction) {
    const event: CountdownEvent = {
      action,
      status: this.status,
      left: this.currentTime,
      text: this.displayTime,
    };
    this.countdownEvent.emit(event);
  }
}
