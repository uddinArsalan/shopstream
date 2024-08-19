"use client";
import React from "react";
import CartItem from "./CartItem";
import { useCart } from "../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import { Coupon, CouponCode } from "../types/card";
import { useRouter } from "next/navigation";
import { useCartLogic } from "../lib/hooks/useCartLogic";
import EmptyCartMessage from "./EmptyCartMessage";
import { useApp } from "../context/AppProvider";

const PUBLIC_STRIPE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";

const stripePromise = loadStripe(PUBLIC_STRIPE_PUBLISHABLE_KEY);

function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const {startLoader,completeLoader} = useApp();
  const availableCoupons: Coupon[] = [
    { code: "FLAT20", type: "percentage", value: 20 },
    { code: "BIGSPEND50", type: "amount", value: 50 },
    { code: "WELCOME25", type: "percentage", value: 25 },
  ];
  const {
    appliedDiscount,
    applyDiscountCode,
    discountCode,
    errorMessage,
    removeDiscount,
    setDiscountCode,
    subtotal,
    total,
    setErrorMessage,
  } = useCartLogic(availableCoupons);
  const router = useRouter();

  const proceedToCheckout = async () => {
    const loaderId = startLoader();
    try {
      const response = await fetch("/api/createCheckout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          couponCode: appliedDiscount?.code,
        }),
      });

      if (!response.ok) {
        throw new Error("Checkout failed. Please try again.");
      }

      const { url } = await response.json();
      router.push(url);
    } catch (error) {
      console.error("Checkout error:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }finally{
      completeLoader(loaderId)
    }
  };

  if (cart.length === 0) {
    return <EmptyCartMessage />;
  }

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {appliedDiscount && (
              <div className="flex justify-between mb-2 text-green-600">
                <span>Discount ({appliedDiscount.code}):</span>
                <span>
                  -
                  {appliedDiscount.type === "percentage"
                    ? `${appliedDiscount.value}%`
                    : `$${appliedDiscount.value}`}
                </span>
              </div>
            )}
            <div className="flex justify-between font-semibold text-lg mb-4">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {!appliedDiscount ? (
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Enter discount code"
                  className="w-full p-2 border rounded mb-2"
                  value={discountCode}
                  aria-label="Discount code"
                  onChange={(e) =>
                    setDiscountCode(e.target.value as CouponCode)
                  }
                />
                {errorMessage && (
                  <div className="text-red-600 text-sm mb-2">
                    {errorMessage}
                  </div>
                )}
                <button
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-300"
                  aria-label="Apply discount code"
                  onClick={applyDiscountCode}
                >
                  Apply Discount
                </button>
              </div>
            ) : (
              <button
                className="w-full mb-4 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition duration-300"
                onClick={removeDiscount}
              >
                Remove Discount
              </button>
            )}

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Available Discount Codes:</h3>
              <div className="space-y-2 text-sm">
                {availableCoupons.map((discount) => (
                  <div key={discount.code} className="bg-gray-100 p-2 rounded">
                    <span className="font-medium">{discount.code}</span>:
                    {discount.type === "percentage"
                      ? ` ${discount.value}% off`
                      : ` $${discount.value} off`}
                  </div>
                ))}
              </div>
            </div>

            <button
              className="w-full bg-gray-900 text-white py-3 rounded-full hover:bg-gray-800 transition duration-300"
              onClick={proceedToCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
