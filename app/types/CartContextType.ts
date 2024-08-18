import { CartItemType } from "./card";
import { Product } from "./product";

export interface CartContextType {
    cart: CartItemType[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
}