import { Component } from '@angular/core';
import {
  Button,
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '../../../shared/_component/button/button.directive';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule, Button],
})
export class ButtonComponent {
  readonly variants = Object.keys(
    ButtonVariant,
  ) as (keyof typeof ButtonVariant)[];
  readonly sizes = Object.keys(ButtonSize) as (keyof typeof ButtonSize)[];
  readonly colors = Object.keys(ButtonColor) as (keyof typeof ButtonColor)[];
  selectedVariant: keyof typeof ButtonVariant = 'primary';
  selectedSize: keyof typeof ButtonSize = 'large';
  selectedColor: keyof typeof ButtonColor = 'green';
  isDisabled: boolean = false;
  isLoading: boolean = false;
}
