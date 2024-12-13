"use client";
import React from "react";
import Image from "next/image";
import { MinusIcon, XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";
import { CartItemType } from "../types/card";
import { useCart } from "../context/CartContext";

interface CartItemProps {
  item: CartItemType;
}

function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  return (
    <div className="flex flex-col sm:flex-row items-center py-4 border-b text-gray-900">
    <Image
      src={item.image}
      alt={item.name}
      width={100}
      height={100}
      className="rounded-md mb-4 sm:mb-0 sm:mr-4"
    />
    <div className="flex-grow text-center sm:text-left">
      <h3 className="font-semibold">{item.name}</h3>
      <p className="text-gray-600">${item.price.toFixed(2)}</p>
    </div>
    <div className="flex items-center mt-4 sm:mt-0">
      <button
        onClick={() => updateQuantity(item.id, item.quantity - 1)}
        className="p-1 rounded-full hover:bg-gray-200"
        disabled={item.quantity <= 1}
      >
        <MinusIcon className="w-4 h-4" />
      </button>
      <span className="mx-2 w-8 text-center">{item.quantity}</span>
      <button
        onClick={() => updateQuantity(item.id, item.quantity + 1)}
        className="p-1 rounded-full hover:bg-gray-200"
      >
        <PlusIcon className="w-4 h-4" />
      </button>
    </div>
    <button
      onClick={() => removeFromCart(item.id)}
      className="ml-4 p-1 rounded-full hover:bg-gray-200"
    >
      <XMarkIcon className="w-6 h-6 text-gray-600" />
    </button>
  </div>
  );
}

export default CartItem;
