/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DashbroadComponent } from './dashbroad.component';

describe('DashbroadComponent', () => {
  let component: DashbroadComponent;
  let fixture: ComponentFixture<DashbroadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashbroadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbroadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
