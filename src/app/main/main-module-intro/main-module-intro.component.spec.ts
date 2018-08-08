import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainModuleIntroComponent } from './main-module-intro.component';

describe('MainModuleIntroComponent', () => {
  let component: MainModuleIntroComponent;
  let fixture: ComponentFixture<MainModuleIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainModuleIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainModuleIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
