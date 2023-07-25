import { Component, Input } from '@angular/core';
import { Order } from '../types/order';

@Component({
  selector: 'app-order-row',
  templateUrl: 'order-row.component.html',
  styleUrls: ['./order-row.component.scss']
})
export class OrderRowComponent {
  @Input() public order: Order;
}
