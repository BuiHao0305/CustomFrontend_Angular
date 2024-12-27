import { CommonModule } from '@angular/common';
import { Component, forwardRef, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app[Input]',
  templateUrl: './input.component.html',
  // styleUrls: ['./input.component.scss'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Input),
      multi: true,
    },
  ],
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
})
export class Input implements ControlValueAccessor {
  constructor() {}

  public value = '';
  public isDisabled = false;

  public changed: ((vlue: string) => void) | undefined;

  public touched: (() => void) | undefined;

  public onChange(event: Event): void {
    const value: string = (<HTMLInputElement>event.target).value;
  }

  public writeValue(value: string): void {
    this.value = value;
  }
  public registerOnChange(fn: any): void {
    this.changed = fn;
  }
  public registerOnTouched(fn: any): void {
    this.touched = fn;
  }
  public setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
