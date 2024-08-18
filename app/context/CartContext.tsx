"use client"
import React, { createContext, useContext, useState } from "react";
import { CartContextType } from "../types/CartContextType";
import { CartItemType } from "../types/card";
import { Product } from "../types/product";

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: console.log,
  clearCart: () => {},
  removeFromCart: console.log,
  updateQuantity: () => {},
});

export function useCart() {
  return useContext(CartContext);
}

function CartContextProvider({children} : {children : React.ReactNode}) {
  const [cart, setCart] = useState<CartItemType[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.id === product.id
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prevCart => (
      prevCart.filter(item => item.id !== id)
    ))
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart((cartItems) =>
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
