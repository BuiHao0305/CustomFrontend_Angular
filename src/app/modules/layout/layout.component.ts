import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MENU_ITEMS, MenuItems } from './navbar.layout';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [RouterModule],
})
export class LayoutComponent {
  @Input() sideNavStatus = false;
  menuItems: MenuItems[] = MENU_ITEMS;

  showChild = false;

  constructor(private router: Router) {}

  navigate(route?: string) {
    if (route) {
      this.router.navigate([route]);
    }
  }
  toggleChild() {
    this.showChild = !this.showChild;
  }

  showChildClick(value: boolean) {
    this.showChild = value;
  }
}
