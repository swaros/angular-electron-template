import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'aui-switch-btn',
  templateUrl: './switch-button.component.html',
  styleUrls: ['./switch-button.component.scss']
})
export class SwitchButtonComponent implements OnInit {

  @Input() OnLabel = 'ON';
  @Input() OffLabel = 'OFF';
  @Input() Label = '';
  @Input() State = false;

  constructor() { }

  ngOnInit() {
  }

  public getLabel(): String {
    if (this.State) {
      return this.OnLabel;
    }
    return this.OffLabel;
  }

  public toggle() {
    this.State = !this.State;
  }

}
