import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { TranslateModule } from '@ngx-translate/core';
import { WorkbenchComponent} from '../workbench/workbench.component';
import {ElectronService} from '../../providers/electron.service';
import {StateStorageService} from '../../services/state-storage.service';
import {RouterModule, Routes} from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const routes: Routes = [
    {path: 'home', component: HomeComponent}
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, WorkbenchComponent ],
      imports: [
        TranslateModule.forRoot(),
        RouterModule.forRoot(routes),
      ],
      providers: [
        ElectronService,
        StateStorageService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render welcome message in h5 tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h5').textContent).toContain('Welcome');
  }));
});
