import { ElectronService } from '../../providers/electron.service';
import { StateStorageService } from '../../services/state-storage.service';
import { Component, OnInit, Input, NgZone } from '@angular/core';
import { AppConfigShared } from '../../../config/app.config';
import { Router } from '@angular/router';
import {ConfigRoute} from '../../model/ConfigRoute';

/**
 * the main component for handling
 * all site components.
 *
 * it is responsible for navigation, displaying
 * page content, swithing global themes and so on.
 *
 * any site needs to use <app-workbench> and put they content
 * inside them.
 *
 * like this:
 *    <app-workbench>hello world</app-workbench>
 *
 *
 */
@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.scss']
})
export class WorkbenchComponent implements OnInit {
  /**
   * navigation fully displayed or hidden
   */
  @Input() navCollapsed = false;

  /**
   * if true isElectron() is false even it runs in electron
   */
  @Input() forceNonElectronFlag = false;

  /**
   * collapse header or not
   */
  @Input() headerCollapsed = false;

  /**
   * using a navigation they contains
   * links for sites only. and just
   * the icons are displayed.
   */
  @Input() shortNavbar = true;

  /**
   * default theme
   */
  private theme = 'theme-light';

  /**
   * toggle flag for the menu
   */
  private showAppMenuFlag = false;

  /**
   * all supported themes. they needs
   * to be created first.
   * have a look at the styles folder.
   */
  private themeList = ['theme-dark', 'theme-light'];

  private appMenu: ConfigRoute[] = [];

  constructor(private storage: StateStorageService,
     private electron: ElectronService,
     private ngZone: NgZone,
     private router: Router
     ) {
  }

  ngOnInit() {
    this.getTheme();
    this.setupEventListener();
    if (this.isElectron()) {
      const enabledMenu = this.storage.get('app-menu-enabled');
      if (enabledMenu !== null) {
        this.showAppMenuFlag = enabledMenu;
      }
      this.askForMenu();
    } else {
      this.appMenu = AppConfigShared.getAngularMenu();
      this.showAppMenuFlag = true;
    }
    // this also reads the runtime storage and apply the value to the flag
    this.isHeaderCollapsed();

  }

  private setupEventListener(): void {
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

    this.electron.addListenerOnce(AppConfigShared.EVENT_CHANNEL_CONFIG_APP_MENU, (event: any, configData: ConfigRoute[]) => {
      this.ngZone.runOutsideAngular(() => {
        this.ngZone.run(() => {
          this.appMenu = configData;
          this.storage.set({
            key: 'app-menu',
            value: configData
          });
        });
      });
    });

    this.electron.addListenerOnce(AppConfigShared.EVENT_CHANNEL_APP_CMD, (event: any, cmd: any) =>{
      this.ngZone.runOutsideAngular(() => {
          switch (cmd) {
            case AppConfigShared.EVENT_FLAG_CMD_APP_MENU_ON :
              this.toggleAppMenu();
              break;

        }
        this.ngZone.run(() => {
          console.log('got command', cmd);
        });
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

  public getNavigation(): ConfigRoute[] {
    return this.appMenu;
  }

  public isHeaderCollapsed(): boolean {
    const enabledHeader = this.storage.get('app-header-enabled');
    if (enabledHeader !== null) {
      this.headerCollapsed = enabledHeader;
    }
    return this.headerCollapsed;
  }

  public isShortNavBar() {
    return this.shortNavbar;
  }


  public toggleHeader(): void{
    this.headerCollapsed = !this.headerCollapsed;
    this.storage.set({key: 'app-header-enabled', value: this.headerCollapsed});
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

  public toggleAppMenu(): void {
    this.showAppMenuFlag = !this.showAppMenuFlag;
    this.storage.set({key: 'app-menu-enabled', value: this.showAppMenuFlag});

  }

  public showAppMenu(): boolean {
    return this.showAppMenuFlag;
  }

  public askForMenu(): void {
    const menuData = this.storage.get('app-menu');
    if (menuData === null) {
      this.electron.ipcRenderer.send('get-config-app-menu', 'menu');
    } else {
      this.appMenu = menuData;
    }
  }

}
