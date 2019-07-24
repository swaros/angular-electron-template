import { KeyValue } from './../../model/KeyValue';
import { StateStorageService } from './../../services/state-storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.scss']
})
export class ConfigureComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor(private storage: StateStorageService) {
    this.subscription = storage.configChanged$.subscribe(
      cfg => {
         this.configChanged(cfg);
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  private configChanged(config: KeyValue) {
    console.log('changed config', config);
  }


}
