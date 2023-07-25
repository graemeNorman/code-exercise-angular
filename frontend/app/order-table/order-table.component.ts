import { Component, Input } from '@angular/core';
import { Order } from '../types/order';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent {
  @Input() public orders: Order[];
}
