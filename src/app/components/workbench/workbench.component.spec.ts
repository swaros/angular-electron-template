import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WorkbenchComponent} from './workbench.component';
import {TranslateModule} from '@ngx-translate/core';
import {ElectronService} from '../../providers/electron.service';
import {StateStorageService} from '../../services/state-storage.service';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../home/home.component';

describe('WorkbenchComponent', () => {
  let component: WorkbenchComponent;
  let fixture: ComponentFixture<WorkbenchComponent>;
  const routes: Routes = [
    {path: 'home', component: HomeComponent}
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorkbenchComponent, HomeComponent],
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
    fixture = TestBed.createComponent(WorkbenchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
