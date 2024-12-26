import { Route } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { ColorComponent } from '../page/color/color.component';
import { ButtonComponent } from '../page/button/button.component';
import { AlertsComponent } from '../page/alerts/alerts.component';

export const layoutRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'color',
        component: ColorComponent,
      },
      { path: 'button', component: ButtonComponent },
      { path: 'alerts', component: AlertsComponent },
    ],
  },
];
