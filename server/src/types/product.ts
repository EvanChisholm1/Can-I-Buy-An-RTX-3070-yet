export interface Product {
  name: string;
  url: string;
  store: 'newegg' | 'bestbuy';
  isAvailable?: boolean;
  lastCheck?: Date;
  category: string;
}
