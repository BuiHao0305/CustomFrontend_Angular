import { Component, OnInit } from '@angular/core';
import { ZoomMtg } from '@zoomus/websdk';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss'],
  standalone: true,
  imports: [],
})
export class ZoomComponent {
  async ngAfterContentInit(): Promise<any> {
    // cosnt {ZoomMtg} = await import('@zoomus/websdk');
    ZoomMtg;
  }
}
