import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';

@Component({
  selector: 'app-welcome-component',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private electron: ElectronService ) { }

  ngOnInit() {
  }

  sendMessage() {
      this.electron.sendMsg('test', ['test']);
  }

}
