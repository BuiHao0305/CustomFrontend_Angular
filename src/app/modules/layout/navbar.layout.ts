export interface MenuItems {
  id: number;
  name: string;
  icon: string;
  route?: string;
}

export const MENU_ITEMS: MenuItems[] = [
  {
    id: 1,
    name: 'Color',
    icon: 'bi bi-palette-fill',
    route: '/color',
  },
  {
    id: 2,
    name: 'Button',
    icon: 'bi bi-menu-button',
    route: '/button',
  },
  {
    id: 3,
    name: 'Alerts',
    icon: 'bi bi-bell',
    route: '/alerts',
  },
];
