import { CartItemType } from "@/app/types/card";
import { NextRequest, NextResponse } from "next/server";
import { CouponCode } from "@/app/types/card";
import Stripe from "stripe";
import { uuidv4 } from "@/app/lib/utils";
import { cookies } from "next/headers";

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY || "";
const DOMAIN = "http://localhost:3000";
const stripe = new Stripe(STRIPE_KEY);

interface payloadType {
  items: CartItemType[];
  couponCode:  CouponCode | undefined;
}

const couponMap: { [key: string]: string } = {
  'FLAT20': process.env.STRIPE_COUPON_FLAT20 || '',
  'WELCOME25': process.env.STRIPE_COUPON_WELCOME25 || '',
  'BIGSPEND50': process.env.STRIPE_COUPON_BIGSPEND50 || '',
};

export async function POST(req: NextRequest) {
  const payload: payloadType = await req.json();
  const checkoutToken = uuidv4();
  console.log("CheckoutToken ", checkoutToken);
  cookies().set('checkoutToken', checkoutToken);
  const origin =  `${DOMAIN}/checkout`;
  const { items, couponCode } = payload;
  try {
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/success?token=${checkoutToken}`,
      cancel_url: `${origin}/cancel?token=${checkoutToken}`,
    };

    if (couponCode && couponMap[couponCode]) {
      // adding the corresponding Stripe coupon ID
      sessionParams.discounts = [{ coupon: couponMap[couponCode] }];
    }

    const session = await stripe.checkout.sessions.create(sessionParams);
    if (session.url) {
      return NextResponse.json({ url: session.url },{status : 200});
    } else {
      throw new Error("Failed to create Stripe checkout session.");
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
