import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-popupcalender',
  templateUrl: './popupcalender.component.html',
  styleUrls: ['./popupcalender.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class PopupcalenderComponent {
  isPopupOpen: boolean = false;

  // Danh sách tháng và năm
  months: string[] = [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ];
  years: number[] = Array.from(
    { length: 20 },
    (_, i) => new Date().getFullYear() - 10 + i,
  );

  // Lựa chọn mặc định
  selectedMonth: number = new Date().getMonth();
  selectedYear: number = new Date().getFullYear();

  // Mở popup
  openPopup() {
    this.isPopupOpen = true;
  }

  // Đóng popup
  closePopup() {
    this.isPopupOpen = false;
  }

  // Áp dụng tháng và năm đã chọn
  applySelection() {
    console.log('Tháng:', this.selectedMonth + 1, 'Năm:', this.selectedYear);
    // Thực hiện các thay đổi lịch tại đây
    this.closePopup();
  }
}
