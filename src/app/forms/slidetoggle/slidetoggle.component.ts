import { Component } from '@angular/core';

@Component({
  selector: 'app-slidetoggle',
  templateUrl: './slidetoggle.component.html',
  styleUrls: ['./slidetoggle.component.scss']
})
export class SlidetoggleComponent {
  color = 'accent';
  checked = false;
  disabled = false;
}
