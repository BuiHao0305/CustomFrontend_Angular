import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PopupcalenderComponent } from '../popupcalender/popupcalender.component';

@Component({
  selector: 'app-datepicker',
  templateUrl: './custom_datepicker.component.html',
  styleUrls: ['./custom_datepicker.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class Custom_datepickerComponent implements OnInit {
  currentDate = new Date();
  calendarDays: string[] = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  calendarDates: string[] = [];
  currentMonthDisplay = '';
  firstDayOfMonthIndex = 0;
  selectedDate = ''; // Biến lưu ngày được chọn

  daysInMonth = 0;

  ngOnInit() {
    this.renderCalendar(this.currentDate);
  }

  renderCalendar(date: Date) {
    this.calendarDates = [];
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    this.daysInMonth = new Date(year, month + 1, 0).getDate();
    const previousMonthDays = new Date(year, month, 0).getDate();

    // Set month display
    this.currentMonthDisplay = `${date.toLocaleString('default', { month: 'long' })}, ${year}`;

    // Tính số ngày cần thêm từ tháng trước
    const prevMonthStartDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    this.firstDayOfMonthIndex = prevMonthStartDay; // Lưu vị trí bắt đầu tháng hiện tại

    for (let i = prevMonthStartDay; i > 0; i--) {
      this.calendarDates.push(
        (previousMonthDays - i + 1).toString().padStart(2, '0'),
      );
    }

    // Add days of the current month
    for (let day = 1; day <= this.daysInMonth; day++) {
      this.calendarDates.push(day.toString().padStart(2, '0'));
    }

    // Tính số ngày cần thêm từ tháng sau
    const totalDaysDisplayed = this.calendarDates.length;
    const remainingDays = 7 - (totalDaysDisplayed % 7);
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        this.calendarDates.push(i.toString().padStart(2, '0'));
      }
    }
  }

  handleDateClick(date: string, index: number) {
    if (index < this.firstDayOfMonthIndex) {
      this.navigateMonth(-1);
    } else if (index >= this.firstDayOfMonthIndex + this.daysInMonth) {
      this.navigateMonth(1);
    } else {
      this.selectDate(date, index);
    }
  }

  isSelected(date: string, index: number): boolean {
    const selectedDate = new Date(this.selectedDate);
    const selectedDay = selectedDate.getDate();
    const selectedMonth = selectedDate.getMonth();
    const selectedYear = selectedDate.getFullYear();

    const isPrevMonth = index < this.firstDayOfMonthIndex;
    const isNextMonth = index >= this.firstDayOfMonthIndex + this.daysInMonth;

    let currentYear = this.currentDate.getFullYear();
    let currentMonth = this.currentDate.getMonth();

    if (isPrevMonth) {
      currentMonth -= 1;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear -= 1;
      }
    } else if (isNextMonth) {
      currentMonth += 1;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear += 1;
      }
    }

    return (
      selectedDay === parseInt(date, 10) &&
      selectedMonth === currentMonth &&
      selectedYear === currentYear
    );
  }

  selectDate(day: string, index: number) {
    if (!day) return;

    const isPrevMonth = index < this.firstDayOfMonthIndex;
    const isNextMonth = index >= this.firstDayOfMonthIndex + this.daysInMonth;

    let selectedYear = this.currentDate.getFullYear();
    let selectedMonth = this.currentDate.getMonth();
    if (isPrevMonth) {
      selectedMonth -= 1;
      if (selectedMonth < 0) {
        selectedMonth = 11;
        selectedYear -= 1;
      }
    } else if (isNextMonth) {
      selectedMonth += 1;
      if (selectedMonth > 11) {
        selectedMonth = 0;
        selectedYear += 1;
      }
    }

    const formattedDate = `${selectedYear}-${(selectedMonth + 1)
      .toString()
      .padStart(2, '0')}-${day}`;
    console.log(`Selected date: ${formattedDate}`);

    this.selectedDate = formattedDate;
    this.currentDate = new Date(selectedYear, selectedMonth, parseInt(day, 10));
  }

  navigateMonth(step: number) {
    this.currentDate.setMonth(this.currentDate.getMonth() + step);
    this.renderCalendar(this.currentDate);
  }

  isPopupOpen = false; // Kiểm tra xem popup có đang mở không
  isYearSelected = false; // Kiểm tra xem năm đã được chọn chưa
  selectedYear: number | null = null;
  selectedMonth: number | null = null;

  // Dữ liệu năm và tháng
  years: number[] = Array.from(
    { length: 20 },
    (_, i) => new Date().getFullYear() - 10 + i,
  );
  months: string[] = [
    ' 1',
    ' 2',
    ' 3',
    ' 4',
    ' 5',
    ' 6',
    ' 7',
    ' 8',
    ' 9',
    ' 10',
    ' 11',
    ' 12',
  ];

  // Calendar logic

  // Mở popup
  openPopup() {
    this.isPopupOpen = true;
  }

  // Đóng popup
  closePopup() {
    this.isPopupOpen = false;
  }

  // Chọn năm
  selectYear(year: number) {
    this.selectedYear = year;
    this.isYearSelected = true;
  }

  // Chọn tháng
  selectMonth(monthIndex: number) {
    this.selectedMonth = monthIndex;
    this.currentMonthDisplay = this.months[monthIndex]; // Cập nhật tháng
    this.closePopup(); // Đóng popup
  }

  // Reset trạng thái khi quay lại
  resetSelection() {
    this.isYearSelected = false;
    this.selectedMonth = null;
  }
}
