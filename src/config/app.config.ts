import { ConfigRoot } from './../app/model/ConfigRoot';
import { BrowserWindow } from 'electron';
import { ConfigRoute } from '../app/model/ConfigRoute';
import {ConfigRuntime} from '../app/model/ConfigRuntime';
export class AppConfigShared {

  static readonly EVENT_CHANNEL_SITE_ROUTE = 'change_site';
  static readonly EVENT_CHANNEL_DESIGN = 'change_design';
  static readonly EVENT_CHANNEL_CONFIG_APP_MENU = 'update_config_app_menu';
  static readonly EVENT_CHANNEL_APP_CMD = 'app_cmd';

  static readonly EVENT_FLAG_CMD_APP_MENU_ON = 'enable_app_menu';
  static readonly EVENT_FLAG_CMD_APP_MENU_OFF = 'disable_app_menu';



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
          {
            label: 'Config',
            accelerator: 'CmdOrCtrl+Shift+C',
            click() {
              win.webContents.send(AppConfigShared.EVENT_CHANNEL_SITE_ROUTE, '/Config');
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
            label: 'site navigation on/off', click() {
              win.webContents.send(AppConfigShared.EVENT_CHANNEL_APP_CMD, AppConfigShared.EVENT_FLAG_CMD_APP_MENU_ON);
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
        route: '/',
        icon: 'utf8-icon-benzene-ring'
      },
      {
        label: 'welcome',
        route: '/welcome',
        icon: 'utf8-icon-hello-hand'
      },
      {
        label: 'config',
        route: '/config',
        icon: 'utf8-icon-projector'
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
