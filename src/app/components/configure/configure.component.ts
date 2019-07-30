import { KeyValue } from './../../model/KeyValue';
import { StateStorageService } from './../../services/state-storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConfigShared } from './../../../config/app.config';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.scss']
})
export class ConfigureComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  // flag for the application header
  public cfgHeader = true;
  // flag for the sidebar menu
  public cfgSideBar = true;

  // draw flag
  public isInitialized = false;

  constructor(private storage: StateStorageService) {
  }

  ngOnInit() {
    // reading initial values
    this.cfgHeader = this.applyCfgIfSet(AppConfigShared.CFG_APP_HEADER_ENABLED, this.cfgHeader);
    this.cfgSideBar = this.applyCfgIfSet(AppConfigShared.CFG_APP_MENU_ENABLED, this.cfgSideBar);
    this.startListener();
    this.isInitialized = true;
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  private startListener(){
      // listen to all configuration changes
      this.subscription = this.storage.configChanged$.subscribe(
        cfg => {
           this.configChanged(cfg);
        }
      );
  }

  private stopListener() {
      this.subscription.unsubscribe();
  }

  private applyCfgIfSet(name:String, fallbackValue:any): any {
      var chk = this.storage.get(name);
      if (chk !== null) {
          return chk;
      }
      return fallbackValue;
  }

  public switchFor(name:String, value:boolean){
    this.stopListener(); // stop listening for changes
    if (name === "header") {
      this.cfgHeader = value;
      this.storage.set({key: AppConfigShared.CFG_APP_HEADER_ENABLED, value: this.cfgHeader});
    }
    if (name == 'menu') {
      this.cfgSideBar = value;
      this.storage.set({key: AppConfigShared.CFG_APP_MENU_ENABLED, value: this.cfgSideBar});
    }

    this.startListener(); // watch for changes again

  }

  private configChanged(config: KeyValue) {
    if (config.key === AppConfigShared.CFG_APP_HEADER_ENABLED) {
        this.switchFor('header', config.value);
    }
  }


}
