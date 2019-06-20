import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WelcomeComponent} from './welcome.component';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {WorkbenchComponent} from '../workbench/workbench.component';
import {TranslateModule} from '@ngx-translate/core';
import {ElectronService} from '../../providers/electron.service';
import {StateStorageService} from '../../services/state-storage.service';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  const routes: Routes = [
    {path: 'home', component: HomeComponent}
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeComponent, WorkbenchComponent, HomeComponent],
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
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
