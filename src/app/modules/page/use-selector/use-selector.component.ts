import { Component } from '@angular/core';
import { SelectorComponent } from '../../../shared/_component/selector/selector.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
export interface Options {
  id: number;
  name: string;
}
@Component({
  selector: 'app-use-selector',
  standalone: true,
  imports: [SelectorComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './use-selector.component.html',
  styleUrl: './use-selector.component.scss',
})
export class UseSelectorComponent {
  form: FormGroup;
  options: Options[] = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' },
    { id: 4, name: 'Option 4' },
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      selectedItems: [[]],
    });
  }
}
