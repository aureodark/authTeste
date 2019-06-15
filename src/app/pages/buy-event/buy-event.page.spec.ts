import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyEventPage } from './buy-event.page';

describe('BuyEventPage', () => {
  let component: BuyEventPage;
  let fixture: ComponentFixture<BuyEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyEventPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
