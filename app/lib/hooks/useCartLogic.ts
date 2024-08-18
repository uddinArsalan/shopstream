import { useCart } from "@/app/context/CartContext";
import { useState,useMemo } from "react";
import { CouponCode,Coupon } from "@/app/types/card";

export const useCartLogic = (availableCoupons : Coupon[]) => {

  const { cart } = useCart();
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [discountCode, setDiscountCode] = useState<CouponCode>("FLAT20");
  const [appliedDiscount, setAppliedDiscount] = useState<Coupon>();
  const [errorMessage,setErrorMessage] = useState<string>("");

  const subtotal = useMemo(() => 
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const total = useMemo(() => subtotal - discountValue, [subtotal, discountValue]);

  const applyDiscountCode = () => {
    setErrorMessage(''); 
    const discountToApply = availableCoupons.find(coupon => coupon.code === discountCode);
    if (!discountToApply) {
      setErrorMessage('Invalid Discount Coupon Code');
      return;
    }
    setAppliedDiscount(discountToApply);
    setDiscountValue(
      discountToApply.type === "percentage" 
        ? subtotal * discountToApply.value / 100
        : discountToApply.value
    );
  };

  const removeDiscount = () => {
    setDiscountValue(0);
    setAppliedDiscount(undefined);
    setErrorMessage('')
  };

  return {
    discountCode,
    setDiscountCode,
    appliedDiscount,
    errorMessage,
    applyDiscountCode,
    removeDiscount,
    subtotal,
    discountValue,
    total,
    setErrorMessage
  };

  };