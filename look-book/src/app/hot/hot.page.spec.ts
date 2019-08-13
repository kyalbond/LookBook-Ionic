import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotPage } from './hot.page';

describe('HotPage', () => {
  let component: HotPage;
  let fixture: ComponentFixture<HotPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
