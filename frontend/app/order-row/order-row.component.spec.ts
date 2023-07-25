import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderRowComponent } from './order-row.component';
import {Order} from "../types/order";
import {StatusPillComponent} from "../status-pill/status-pill.component";

describe('OrderRowComponent', () => {
  let component: OrderRowComponent;
  let fixture: ComponentFixture<OrderRowComponent>;
  const mockOrderInput: Order = {
      "id": 1824,
      "driverName": "Nelson Piquet",
      "totalPrice": 5299.75,
      "deliveredAt": new Date('2020-01-01T10:00:00Z'),
      "delayMinutes": 0,
      "lateReason": null,
      "customer": "AlphaBreakers",
      "vendor": "Mando's"
    }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderRowComponent, StatusPillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderRowComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive a single order as @Input', () => {
    component.order = mockOrderInput;
    fixture.detectChanges();

    expect(fixture.componentInstance.order).toEqual(mockOrderInput);
  });

});
