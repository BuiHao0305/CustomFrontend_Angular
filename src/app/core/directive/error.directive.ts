import {
  Directive,
  Input,
  OnChanges,
  ElementRef,
  Renderer2,
} from '@angular/core';

interface ErrorMessages {
  required?: boolean;
  minlength?: { requiredLength: number; actualLength: number };
  email?: boolean;
}

interface Params {
  fieldName: string;
}

@Directive({
  selector: '[error]',
  standalone: true,
})
export class AppErrorDirective implements OnChanges {
  @Input() error: ErrorMessages | null | undefined = null;
  @Input() params: Params | null = null;
  @Input() show = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnChanges(): void {
    if (this.show && this.error && this.params) {
      const message = this.getErrorMessage(this.error, this.params);
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', message);
      this.renderer.setStyle(this.el.nativeElement, 'display', 'inline');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    }
  }

  private getErrorMessage(
    error: ErrorMessages,
    params: { fieldName: string; requiredLength?: number },
  ): string {
    if (error.required) {
      return `${params.fieldName} is required.`;
    }
    if (error.minlength) {
      return `${params.fieldName} must be at least ${error.minlength.requiredLength} characters long.`;
    }
    if (error.email) {
      return `The email address provided in ${params.fieldName} is invalid.`;
    }
    return '';
  }
}
