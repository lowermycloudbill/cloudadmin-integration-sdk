import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @Input() pages: any[] = []
  @Input() activeRoute: string = ''
  @Output() onChange = new EventEmitter()

}
