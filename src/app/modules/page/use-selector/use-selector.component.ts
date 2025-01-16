import { Component } from '@angular/core';
import { SelectorComponent } from '../../../shared/_component/selector/selector.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-use-selector',
  standalone: true,
  imports: [SelectorComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './use-selector.component.html',
  styleUrl: './use-selector.component.scss',
})
export class UseSelectorComponent {
  items = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' },
  ];
  multiSelectControl = new FormControl([]);
}
