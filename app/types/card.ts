import { Product } from "./product";

export interface CartItemType extends Product {
    quantity: number;
  }
  
  export interface Cart {
    items: CartItemType[];
    total: number;
  }

export type DiscountType = "percentage" | "amount";
export type CouponCode = "WELCOME25" | "FLAT20" | "BIGSPEND50";

export interface Coupon {
  type: DiscountType;
  value: number;
  code: CouponCode;
}
