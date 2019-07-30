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

  public cfgHeader = true;
  public isInitialized = false;

  constructor(private storage: StateStorageService) {
    this.subscription = storage.configChanged$.subscribe(
      cfg => {
         this.configChanged(cfg);
      }
    );
  }

  ngOnInit() {
    var chkValue = this.storage.get("app-header-enabled");
    if (chkValue !== null) {
        this.cfgHeader = chkValue;
    }

    console.log("header value", this.cfgHeader);
    this.isInitialized = true;
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  public switchFor(name:String, value:boolean){
    if (name === "header") {
      this.cfgHeader = value;
      this.storage.set({key: 'app-header-enabled', value: this.cfgHeader});
    }
  }

  private configChanged(config: KeyValue) {
    console.log('changed config', config.key, "new value:", config.value);
    if (config.key === "app-header-enabled") {
        this.cfgHeader = config.value;
    }
  }


}
