import { Component, Input } from '@angular/core';

enum OrderStatus {
  onTime = 'on_time',
  early = 'early',
  late = 'late',
}

@Component({
  selector: 'app-status-pill',
  templateUrl: './status-pill.component.html',
  styleUrls: ['./status-pill.component.scss']
})
export class StatusPillComponent {
  @Input()
  public set delayMinutes(delayMinutes: number) {
    this.status = this.computeStatus(delayMinutes);
  }

  public status: OrderStatus = OrderStatus.onTime;

  public get statusLabel(): string {
    switch (this.status) {
      case OrderStatus.onTime:
        return 'on time';
      case OrderStatus.early:
        return 'early';
      case OrderStatus.late:
        return 'late';
      default:
        throw new Error('Unknown order status');
    }
  }

  computeStatus(delayMinutes: number): OrderStatus {
    if (delayMinutes >= -5 && delayMinutes <= 5) {
      return OrderStatus.onTime;
    }
    if (delayMinutes < -5) {
      return OrderStatus.early;
    }
    // delay minutes > 5
    return OrderStatus.late;
  }
}
