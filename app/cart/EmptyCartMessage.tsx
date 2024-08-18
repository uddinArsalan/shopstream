import React from 'react';
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function EmptyCartMessage() {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingCartIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-2 text-lg font-medium text-gray-900">
            Your cart is empty
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Start shopping to add items to your cart!
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
  )
}

export default EmptyCartMessage