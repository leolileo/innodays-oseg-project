import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulpageComponent } from './modulpage.component';

describe('ModulpageComponent', () => {
  let component: ModulpageComponent;
  let fixture: ComponentFixture<ModulpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModulpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
