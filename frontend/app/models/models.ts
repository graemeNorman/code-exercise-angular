
export interface WholeOrder {
  id: number,
  lastModified: string,
  customer: string,
  vendor: Vendor,
  commissionRate: number,
  requestedDeliveryDate: string,
  price: PriceBreakdown,
  paymentType: PaymentType,
  headcount: number,
  servingStyle: ServingStyle,
  deliveredAt: string,
  delayMinutes: number,
  lateReason: any,
  packaging: Packaging,
  driverName: string,
  deliveryLocation: LocationData,
  currentLocation: LocationData,
  vendorLocation: LocationData
}

export interface LocationData {
  lat: number,
  long: number
}

export interface PriceBreakdown {
  delivery: number,
  items: number,
  total: number,
  vatRate: number,
  vatableItems: number,
  vatAmount: number
}

export enum ServingStyle {
  'INDIVIDUAL_PORTIONS',
  'BUFFET'
}

export enum Packaging {
  'VENDOR_PROVIDED',
  'COLDBOX',
  'HOTBOX'
}

export enum PaymentType {
  'CARD',
  'PAY_ON_ACCOUNT',
  'CASH'
}

export enum Vendor {
  "Mando's",
  'JUMP Vietnamese',
  "Weasleys' Wizard Wheezes",
  'Krusty Burger',
  "Avocadno's",
  'Pizza Planet',
  'The Pie Hole',
  'Lizzi',
  'Uncle Moe’s Family Feedbag',
  'Duff Breweries',
  'Hummus Sisters',
  "Benito's Cat",
  'Coco di Papa',
  "Uncle Paul's Austrian Pantry",
  'The Leaky Cauldron',
  'Big Kahuna Burger',
  "Stu's Stews",
  'Los Pollos Hermanos',
  "Bob's Burgers",
  'Tame Chef',
  "Arnie's Sarnies",
  'Patty and Pun',
  'Gnomesbake',
  'Pizza the Hutt',
  'McBurgerTown',
  'Wild West Wings',
  'Pret a Composter'
}
