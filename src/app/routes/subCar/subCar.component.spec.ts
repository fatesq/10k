/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SubCarComponent } from './subCar.component';

describe('SubCarComponent', () => {
  let component: SubCarComponent;
  let fixture: ComponentFixture<SubCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
