"use client";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import Link from "next/Link";
export default function CartDialog() {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (cart.length > 2) {
      setIsOpen(true);
    }
  }, [cart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999] p-4">
      <div className="bg-white text-gray-900 p-6 rounded-lg max-w-md w-full h-[90vh] sm:h-auto sm:max-h-[90vh] flex flex-col shadow-xl">
        <h3 className="text-2xl font-bold mb-6 pb-2 border-b">Your Cart</h3>
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
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
        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={() => setIsOpen(false)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg text-sm font-medium transition duration-300"
          >
            Close
          </button>
          <Link href="/checkout">
            <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg text-sm font-medium transition duration-300">
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
