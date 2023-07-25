export interface Order {
  id: number;
  driverName: string;
  totalPrice: number;
  deliveredAt: Date;
  delayMinutes: number;
  lateReason: string;
  customer: string;
  vendor: string;
}

export interface OrderDTO {
  id: number;
  driverName: string;
  price: {
    total: number;
  };
  customer: string;
  vendor: string;
  deliveredAt: string;
  delayMinutes: number;
  lateReason: string;
}

export function createOrderFromJsonDTO(dto: any): any {
  return {
    id: dto.id,
    driverName: dto.driverName,
    totalPrice: dto.price.total,
    deliveredAt: new Date(dto.deliveredAt),
    delayMinutes: dto.delayMinutes,
    lateReason: dto.lateReason,
    customer: dto.customer,
    vendor: dto.vendor,
  };
}
