import { Component, Input, OnInit, Self, ViewChild } from '@angular/core';
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
  @Input() optionItems: any[] = [];
  selectedValues: any[] = [];
  disabled: boolean = false;

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void {}

  // Toggle all items
  toggleCheckAll(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedValues = this.optionItems.map((item) => item.id);
    } else {
      this.selectedValues = [];
    }
    this.notifyChanges();
  }

  // Handle individual selection changes
  onSelectionChange(event: Event, item: any): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedValues.push(item.id);
    } else {
      this.selectedValues = this.selectedValues.filter((id) => id !== item.id);
    }
    this.notifyChanges();
  }

  // Remove an item from selection
  removeItem(item: any): void {
    this.selectedValues = this.selectedValues.filter((id) => id !== item.id);
    this.notifyChanges();
  }

  // Get selected options (for display purposes)
  get selectedOptionItems() {
    return this.optionItems.filter((item) =>
      this.selectedValues.includes(item.id),
    );
  }

  // ControlValueAccessor methods
  writeValue(obj: any): void {
    this.selectedValues = Array.isArray(obj) ? obj : [];
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

  // Internal methods for ControlValueAccessor
  private onChange = (_: any) => {};
  private onTouched = () => {};

  private notifyChanges(): void {
    this.onChange([...this.selectedValues]);
    this.onTouched();
  }
}
