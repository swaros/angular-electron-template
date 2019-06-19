import { ElectronService } from './../../providers/electron.service';
import { StateStorageService } from './../../services/state-storage.service';
import { Component, OnInit, Input, NgZone } from '@angular/core';
import { AppConfigShared } from '../../../config/app.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.scss']
})
export class WorkbenchComponent implements OnInit {

  @Input() navCollapsed = false;

  @Input() forceNonElectronFlag = false;

  private theme = 'theme-light';

  private themeList = ['theme-dark', 'theme-light'];

  constructor(private storage: StateStorageService,
     private electron: ElectronService,
     private ngZone: NgZone,
     private router: Router
     ) {
  }

  ngOnInit() {
    this.getTheme();
    this.electron.addListenerOnce(AppConfigShared.EVENT_CHANNEL_DESIGN, (event: any, theme: any) => {
      console.log('WORKBENCH: change design by menu to:', theme);
      this.ngZone.runOutsideAngular(() => {
        this.setTheme(theme);
        this.ngZone.run(() => { console.log('theme switch done', theme); });
      });
    });

    this.electron.addListenerOnce(AppConfigShared.EVENT_CHANNEL_SITE_ROUTE, (event: any, site: any) => {
      this.ngZone.runOutsideAngular(() => {
        this.ngZone.run(() => { this.router.navigateByUrl(site, { skipLocationChange: true }); });
      });
    });
  }

  public setTheme(themeName: string): void {
    if (this.themeList.indexOf(themeName) > -1) {
      this.theme = themeName;
      this.storage.set({
        key: 'current-theme',
        value: themeName
      });
    } else {
      console.error(themeName, 'is not a valid theme name', this.themeList);
    }
  }

  public getAllThemes(): string[] {
    return this.themeList;
  }

  public getTheme(): string {
    const storedTheme = this.storage.get('current-theme');
    if (storedTheme !== null) {
      this.setTheme(storedTheme);
    }
    return this.theme;
  }

  public collapseNav(): void {
    this.navCollapsed = true;
  }

  public expandNav(): void {
    this.navCollapsed = false;
  }

  public isCollapsed(): boolean {
    return this.navCollapsed;
  }

  public toggleNav(): void {
    this.navCollapsed = !this.navCollapsed;
  }

  public isElectron(): boolean {
    if (this.forceNonElectronFlag === true) {
      return false;
    }
    return this.electron.isElectron();
  }

}
