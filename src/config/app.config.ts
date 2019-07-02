import { ConfigRoot } from './../app/model/ConfigRoot';
import { BrowserWindow } from 'electron';
import { ConfigRoute } from '../app/model/ConfigRoute';
import {ConfigRuntime} from '../app/model/ConfigRuntime';
export class AppConfigShared {

  static readonly EVENT_CHANNEL_SITE_ROUTE = 'change_site';
  static readonly EVENT_CHANNEL_DESIGN = 'change_design';
  static readonly EVENT_CHANNEL_CONFIG_UPDATE = 'update_config';


  public static getRuntimeConfig(): ConfigRuntime {
    return {
      showAppMenu: true
    };
  }

  /**
   * electron menu.
   * see electron documentation about
   * menu template structure
   */
  public static getElectronMenu(win: BrowserWindow, app): any {
    return [
      {
        label: 'Project',
        submenu: [
          {
            label: 'Home',
            accelerator: 'CmdOrCtrl+H',
            click() {
              win.webContents.send(AppConfigShared.EVENT_CHANNEL_SITE_ROUTE, '/');
            }
          },
          {
            label: 'Welcome',
            accelerator: 'CmdOrCtrl+Shift+W',
            click() {
              win.webContents.send(AppConfigShared.EVENT_CHANNEL_SITE_ROUTE, '/welcome');
            }
          },
          { type: 'separator' },
          {
            label: 'Dev Tools',
            click() {
              win.webContents.openDevTools();
            }
          },
          { type: 'separator' },
          {
            label: 'Exit',
            click() {
              app.quit();
            }
          }
        ]
      },
      {
        label: 'View',
        submenu: [
          {
            label: 'Dark Theme', click() {
              win.webContents.send(AppConfigShared.EVENT_CHANNEL_DESIGN, 'theme-dark');
            }
          },
          {
            label: 'Light Theme', click() {
              win.webContents.send(AppConfigShared.EVENT_CHANNEL_DESIGN, 'theme-light');
            }
          },
          {
            label: 'update config', click() {
              win.webContents.send(AppConfigShared.EVENT_CHANNEL_CONFIG_UPDATE, AppConfigShared.getAngularMenu());
            }
          }
        ]
      }
    ];
  }

  /**
   * angular menu
   */
  public static getAngularMenu(): ConfigRoute[] {
    return [
      {
        label: 'home',
        route: '/'
      },
      {
        label: 'welcome',
        route: '/welcome',
      }
    ];
  }

  public static getConfig(win: BrowserWindow, app): ConfigRoot {
    return {
      // electron menu
      electronNav: AppConfigShared.getElectronMenu(win, app),
      // angular menu
      navigation: AppConfigShared.getAngularMenu(),
      // runtime configuration
      runtime: AppConfigShared.getRuntimeConfig()
    };
  }

}
