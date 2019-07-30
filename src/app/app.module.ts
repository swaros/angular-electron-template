import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { WorkbenchComponent } from './components/workbench/workbench.component';
import { StateStorageService } from './services/state-storage.service';
import { ConfigureComponent } from './components/configure/configure.component';
import { PanelComponent } from './components/angappui/panel/panel.component';
import { SwitchButtonComponent } from './components/angappui/switch-button/switch-button.component';
import { LabelComponent } from './components/angappui/label/label.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    WelcomeComponent,
    WorkbenchComponent,
    ConfigureComponent,
    PanelComponent,
    SwitchButtonComponent,
    LabelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [ElectronService, StateStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
