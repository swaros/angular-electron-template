import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.scss']
})
export class WorkbenchComponent implements OnInit {

  @Input() navCollapsed = false;

  @Input() theme: String = 'theme-light';

  private themeList = ['theme-dark', 'theme-light'];

  constructor() { }

  ngOnInit() {
  }

  public setTheme(themeName): void {
    if (this.themeList.indexOf(themeName) > -1) {
      this.theme = themeName;
    }
  }

  public getAllThemes(): String[] {
    return this.themeList;
  }

  public getTheme(): String {
    console.log(this.theme);
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
