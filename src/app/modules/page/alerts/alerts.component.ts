import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from '../../../shared/_component/button/button.directive';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, Button],
})
export class AlertsComponent {
  currentAlert: string | null = null;

  showAlert(type: string): void {
    this.currentAlert = type;
    setTimeout(() => {
      this.currentAlert = null;
    }, 3000);
  }
}
