import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderTableComponent } from './order-table.component';
import { Order } from "../types/order";

describe('OrderTableComponent', () => {
  let component: OrderTableComponent;
  let fixture: ComponentFixture<OrderTableComponent>;

  const mockOrdersInput: Order[] = [
    {
      "id": 1824,
      "driverName": "Nelson Piquet",
      "totalPrice": 5299.75,
      "deliveredAt": new Date('2020-01-01T10:00:00Z'),
      "delayMinutes": 0,
      "lateReason": null,
      "customer": "AlphaBreakers",
      "vendor": "Mando's"
    },
    {
      "id": 1906,
      "driverName": "Nigel Mansell",
      "totalPrice": 4157.15,
      "deliveredAt": new Date('2020-01-01T10:00:00Z'),
      "delayMinutes": 0,
      "lateReason": null,
      "customer": "Fixxie Tech",
      "vendor": "Mando's"
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderTableComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive an array of orders as @Input', () => {
    component.orders = mockOrdersInput;

    fixture.detectChanges();

    expect(fixture.componentInstance.orders.length).toEqual(2);
    expect(fixture.componentInstance.orders[0]).toEqual(mockOrdersInput[0]);
  });
});
