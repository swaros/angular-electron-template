import { ElectronService } from './../../providers/electron.service';
import { StateStorageService } from './../../services/state-storage.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.scss']
})
export class WorkbenchComponent implements OnInit {

  @Input() navCollapsed = false;

  private theme: String = 'theme-light';

  private themeList = ['theme-dark', 'theme-light'];

  constructor(private storage: StateStorageService, private electron: ElectronService ) {
  }

  ngOnInit() {
    this.getTheme();
    this.electron.addListenerOnce('change_design', (event: any, arg: any) => {
      console.log('WORKBENCH: change design by menu to:', arg);
      this.setTheme(arg);
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

  public getAllThemes(): String[] {
    return this.themeList;
  }

  public getTheme(): String {
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

}
