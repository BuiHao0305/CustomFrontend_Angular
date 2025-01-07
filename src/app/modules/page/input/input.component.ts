import { Component } from '@angular/core';
import { CustomInputComponent } from '../../../shared/_component/custom-input/component/custom-input.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: true,
  imports: [
    CustomInputComponent,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    OverlayModule,
  ],
})
export class InputComponent {
  emailValue = '';
  textValue = '';
  number1Value = '';
  number2Value = '';
  number3Value = '';
  number4Value = '';
  dateValue = '';
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(2)],
      ],
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      number1: ['', [Validators.required, Validators.minLength(5)]],
      number2: ['', [Validators.required, Validators.minLength(5)]],
      number3: ['', [Validators.required, Validators.minLength(5)]],
      number4: ['', [Validators.required, Validators.minLength(5)]],
      date: [Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      const formData = this.form.value;
      console.log(formData);
    }
  }
}
