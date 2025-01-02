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
  readonly variants = Object.values(ButtonVariant) as ButtonVariant[];
  readonly sizes = Object.values(ButtonSize) as ButtonSize[];
  readonly colors = Object.values(ButtonColor) as ButtonColor[];
  selectedVariant: keyof typeof ButtonVariant = 'primary';
  selectedSize: keyof typeof ButtonSize = 'small';
  selectedColor: keyof typeof ButtonColor = 'blue';

  isDisabled = false;
  isLoading = false;
}
