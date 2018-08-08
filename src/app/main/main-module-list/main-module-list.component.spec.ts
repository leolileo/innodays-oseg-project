import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainModuleListComponent } from './main-module-list.component';

describe('MainModuleListComponent', () => {
  let component: MainModuleListComponent;
  let fixture: ComponentFixture<MainModuleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainModuleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainModuleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
