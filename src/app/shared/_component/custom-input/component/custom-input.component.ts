import {
  Component,
  ElementRef,
  Input,
  input,
  Renderer2,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';
import { InputType } from '../type/type.input';
import { LabelDomain } from '../type/type.label';
import { AppErrorDirective } from '../../../../core/directive/error.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, AppErrorDirective],
})
export class CustomInputComponent implements ControlValueAccessor {
  readonly startIcon = input<TemplateRef<any> | null>(null);
  readonly endIcon = input<TemplateRef<any> | null>(null);
  /**
   * Label text
   */
  @Input() labelText = '';
  @Input() id: InputType = '';
  /**
   * Input has different types - text, email, number
   */
  @Input() inputType: InputType = '';
  @Input() labelDomain: LabelDomain = '';
  /**
   * Placeholder text
   */
  @Input() placeholderText = '';
  /**
   * Flag which allows display required symbol (*) manually
   */
  /**
   * Custom error message that will be displayed in @see{@link ErrorMessageComponent}
   */
  /**
   * Setter for @see{@link isDisabled} property
   */
  @Input() set disabled(value: boolean) {
    this.setDisabledState(value);
  }
  /**
   * Reference to input element
   */
  @ViewChild('input', { static: true })
  input: ElementRef | null = null;

  /**
   * Flag for control disabled state
   */
  public isDisabled?: boolean;
  /**
   * Control value
   */
  public value: any;
  private onChange = (value: any) => {};
  private onTouched = () => {};

  constructor(
    private renderer: Renderer2,
    public ngControl: NgControl,
  ) {
    ngControl.valueAccessor = this;
  }
  clearInput() {
    this.value = '';
    this.onChange(this.value);
    this.onTouched();
  }
  writeValue(obj: any): void {
    if (this.input) {
      this.renderer.setProperty(this.input.nativeElement, 'value', obj);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  /**
   * Getter for abstract control
   */
  public get control() {
    return this.ngControl.control;
  }

  /**
   * Fired when control value changed
   */

  public onValueChange(event: Event): void {
    if (!this.input) {
      return;
    }
    this.value = this.input.nativeElement.value;
    this.onChange(this.value);
    const inputElement = event.target as HTMLInputElement;
    this.value = inputElement.value;
  }

  /**
   * Fired when user focusing to control
   */
  public onFocusOut(): void {
    this.onTouched();
  }

  /**
   * Checks if control has required / requiredTrue validators.
   * @returns TRUE if has, otherwise FALSE
   */
}
