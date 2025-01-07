import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './custom_datepicker.component.html',
  styleUrls: ['./custom_datepicker.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class Custom_datepickerComponent implements OnInit {
  currentDate = new Date();
  calendarDays: string[] = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  calendarDates: string[] = [];
  currentMonthDisplay: string = '';

  ngOnInit() {
    this.renderCalendar(this.currentDate);
  }

  renderCalendar(date: Date) {
    this.calendarDates = [];
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // ngày đầu tiên của tháng
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // tổng số ngày trong tháng hiện tại

    // Set month display
    this.currentMonthDisplay = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

    // Tính số ngày cần thêm từ tháng trước
    const previousMonthDays = new Date(year, month, 0).getDate(); // số ngày trong tháng trước

    // Add empty spaces for previous month's days
    const prevMonthStartDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Xác định ngày bắt đầu của tuần
    for (let i = prevMonthStartDay; i >= 0; i--) {
      this.calendarDates.push(
        (previousMonthDays - i).toString().padStart(2, '0'),
      );
    }

    // Add days of the current month with 2-digit formatting
    for (let day = 1; day <= daysInMonth; day++) {
      this.calendarDates.push(day.toString().padStart(2, '0'));
    }
  }

  isToday(date: string): boolean {
    const today = new Date();
    const day = parseInt(date, 10);
    return (
      today.getDate() === day &&
      today.getMonth() === today.getMonth() &&
      today.getFullYear() === today.getFullYear()
    );
  }

  selectDate(day: string) {
    if (!day) return;
    const formattedDate = `${this.currentDate.getFullYear()}-${this.currentDate.getMonth() + 1}-${day}`;
    console.log(`Selected date: ${formattedDate}`);
  }

  navigateMonth(step: number) {
    this.currentDate.setMonth(this.currentDate.getMonth() + step);
    this.renderCalendar(this.currentDate);
  }
}
