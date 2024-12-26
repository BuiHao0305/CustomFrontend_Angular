import { Component, OnInit } from '@angular/core';
import {
  Button,
  ButtonSize,
  ButtonVariant,
} from '../../../shared/_component/button/button.directive';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, Button],
})
export class ButtonComponent {
  readonly variants = Object.keys(
    ButtonVariant,
  ) as (keyof typeof ButtonVariant)[];
  readonly sizes = Object.keys(ButtonSize) as (keyof typeof ButtonSize)[];
  selectedVariant: keyof typeof ButtonVariant = 'primary';
  selectedSize: keyof typeof ButtonSize = 'large';
  isDisabled: boolean = false;
  isLoading: boolean = false;
}
