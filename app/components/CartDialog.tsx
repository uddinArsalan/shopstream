"use client";
import { useCart } from "../context/CartContext";
import { XMarkIcon, ShoppingBagIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

export default function CartDialog() {
  const { cart, removeFromCart, isCartDialogOpen, toggleCartOpen } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isCartDialogOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999] p-4">
      <div className="bg-white text-gray-900 p-6 rounded-lg max-w-md w-full sm:w-4/5 md:w-1/2 lg:w-1/3 h-full sm:h-auto sm:max-h-[90vh] flex flex-col shadow-xl">
        <div className="flex items-center justify-between mb-6 pb-2 border-b">
          <h3 className="text-2xl font-bold">Your Cart</h3>
          <ShoppingBagIcon className="h-7 w-7 text-gray-900" />
        </div>
        <div className="flex-grow overflow-y-auto scrollbar-hide">
          {cart.length === 0 ? (
            <p className="text-gray-600 text-center py-4">Your cart is empty</p>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center mb-4 pb-4 border-b last:border-b-0"
                >
                  <div>
                    <h4 className="font-semibold text-lg">{item.name}</h4>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-4 font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-500 hover:text-gray-700 transition duration-300"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center font-bold text-xl">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={toggleCartOpen}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg text-sm font-medium transition duration-300"
          >
            Close
          </button>
          <Link href="/cart">
            <button
              className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg text-sm font-medium transition duration-300"
              onClick={toggleCartOpen}
            >
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
