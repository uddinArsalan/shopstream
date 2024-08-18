'use server'
import { cookies } from "next/headers";

export function verifyAndRemoveToken(token : string){
    const cookieStore = cookies();
    const checkoutToken = cookieStore.get('checkoutToken')?.value;
    if(!checkoutToken) return false
    if(checkoutToken === token){
      return true;
    }
    return false
  }