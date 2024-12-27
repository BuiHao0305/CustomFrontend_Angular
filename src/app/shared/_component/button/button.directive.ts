import { NgTemplateOutlet } from '@angular/common';
import { Component, input, Input, TemplateRef } from '@angular/core';

export const ButtonVariant = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  neutral: 'neutral',
};

export type ButtonVariant = (typeof ButtonVariant)[keyof typeof ButtonVariant];

export const ButtonSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
};

export type ButtonSize = (typeof ButtonSize)[keyof typeof ButtonSize];

export const ButtonColor = {
  blue: 'blue',
  yellow: 'yellow',
  black: 'black',
  white: 'white',
  orange: 'orange',
  violet: 'violet',
  green: 'green',
};

export type ButtonColor = (typeof ButtonColor)[keyof typeof ButtonColor];

@Component({
  standalone: true,
  selector: 'button[appButton]',
  templateUrl: './button.component.html',
  host: {
    class: 'button',
    '[class.button-primary]': `variant()==="primary"`,
    '[class.button-secondary]': `variant()==="secondary"`,
    '[class.button-tertiary]': `variant()==="tertiary"`,
    '[class.button-neutral]': `variant()==="neutral"`,
    '[class.button-small]': `size()==="small"`,
    '[class.button-medium]': `size()==="medium"`,
    '[class.button-large]': `size()==="large"`,
    '[class.button-disabled]': 'disable()',
    '[class.button-loading]': 'loading()',
    '[class.button-blue]': `color()==="blue"`,
    '[class.button-yellow]': `color()==="yellow"`,
    '[class.button-black]': `color()==="black"`,
    '[class.button-white]': `color()==="white"`,
    '[class.button-orange]': `color()==="orange"`,
    '[class.button-violet]': `color()==="violet"`,
    '[class.button-green]': `color()==="green"`,
  },
  imports: [NgTemplateOutlet],
})
export class Button {
  readonly disable = input(false);
  readonly loading = input(false);

  readonly startIcon = input<TemplateRef<any> | null>(null);
  readonly endIcon = input<TemplateRef<any> | null>(null);
  readonly loadingRef = input<TemplateRef<any> | null>(null);

  readonly variant = input<ButtonVariant>(ButtonVariant.primary);
  readonly size = input<ButtonSize>(ButtonSize.medium);
  readonly color = input<ButtonColor>(ButtonColor.blue);
}
