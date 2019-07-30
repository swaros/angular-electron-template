import { Component, OnInit, Input, Output, EventEmitter,SimpleChanges, OnChanges } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'aui-switch-btn',
  templateUrl: './switch-button.component.html',
  styleUrls: ['./switch-button.component.scss']
})
export class SwitchButtonComponent implements OnInit, OnChanges {

  @Input() OnLabel = 'ON';
  @Input() OffLabel = 'OFF';
  @Input() Label = '';
  @Input() enabled = false;

  @Output() OnChange = new EventEmitter<boolean>();

  State = false;
  constructor() { }

  ngOnInit() {
    if (this.enabled) {
        this.State = true;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {      
      if (changes.enabled !== undefined && changes.enabled.currentValue !== undefined) {
        this.State = changes.enabled.currentValue;
        console.log("set value ", this.State);
      }
  }

  public getLabel(): String {
    if (this.State) {
      return this.OnLabel;
    }
    return this.OffLabel;
  }

  public toggle() {
    this.State = !this.State;
    this.OnChange.emit(this.State);
  }

}
