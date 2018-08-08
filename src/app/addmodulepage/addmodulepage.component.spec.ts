import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmodulepageComponent } from './addmodulepage.component';

describe('AddmodulepageComponent', () => {
  let component: AddmodulepageComponent;
  let fixture: ComponentFixture<AddmodulepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmodulepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmodulepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
