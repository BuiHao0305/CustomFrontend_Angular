import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Self,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-selector',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.scss',
})
export class SelectorComponent implements OnInit, ControlValueAccessor {
  disabled = false;
  selectedValues: any[] = [];

  @Input() optionItems: any[] = [];
  @ViewChild('dropdown') dropdown!: ElementRef;

  onChange = (value: any) => {};
  onTouched = () => {};

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void {}

  toggleDropdown() {
    const dropdown = this.dropdown.nativeElement;
    dropdown.style.display =
      dropdown.style.display === 'block' ? 'none' : 'block';
  }

  toggleCheckAll(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedValues = this.optionItems.map((item) => item.id);
    } else {
      this.selectedValues = [];
    }
    this.onChange(this.selectedValues);
  }

  toggleItemSelection(id: any, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedValues.push(id);
    } else {
      this.selectedValues = this.selectedValues.filter((value) => value !== id);
    }
    this.onChange(this.selectedValues);
  }

  writeValue(obj: any): void {
    this.selectedValues = obj || [];
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
