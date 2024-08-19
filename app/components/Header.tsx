"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Avatar from "./Avatar";
import {
  ShoppingBagIcon,
  Bars3Icon,
  ChevronDownIcon,
  UserIcon
} from "@heroicons/react/16/solid";
import { useCart } from "../context/CartContext";
import { useApp } from "../context/AppProvider";

function Header() {
  const { cart,toggleCartOpen } = useCart();
  const cartCount = cart.length;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn, userProfile, logoutUser } = useApp();

  return (
    <header className="bg-white text-black sticky top-0 left-0 right-0 z-50">
      <div className="bg-gray-900 text-white text-sm py-2 text-center">
        <p>$50 off on orders above $2000</p>
      </div>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-4 ">
              <Image alt="logo" src="/logo.png" width={40} height={42} />
              <span className="text-xl font-bold">SHOPSTREAM</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-6"> <ul className="flex space-x-6 text-sm font-medium">
              <li>
                <Link href="/" className="hover:text-gray-600">
                  HOME
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-gray-600">
                  PRODUCTS
                </Link>
              </li>
              <li>
                <Link href="/#aboutus" className="hover:text-gray-600">
                  ABOUT US
                </Link>
              </li>
              <li>
                <Link href="/#contactus" className="hover:text-gray-600">
                  CONTACT US
                </Link>
              </li>
            </ul></div>

          <div className="hidden md:flex items-center space-x-6">
           

            <div className="relative">
              <button
                className="flex items-center space-x-1 p-2 hover:bg-gray-100 rounded-full"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {isLoggedIn ? <Avatar /> : <UserIcon className="w-6 h-6 "/>}
                <ChevronDownIcon className="w-4 h-4" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  {isLoggedIn ? (
                    <>
                      <p className="px-4 py-2 text-sm text-gray-700">
                        {userProfile?.name}
                      </p>
                      <button
                        onClick={logoutUser}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/auth/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Login
                      </Link>
                      <Link
                        href="/auth/signup"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* <Link href="/cart"> */}
              <button className="p-2 hover:bg-gray-100 rounded-full relative" onClick={toggleCartOpen}>
                <ShoppingBagIcon className="w-6 h-6" />
                <div className="absolute left-1/2 -top-1/3 w-6 h-6 border text-xs flex justify-center items-center bg-white text-gray-900 rounded-full">
                  {cartCount}
                </div>
              </button>
            {/* </Link> */}
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="mt-4 md:hidden">
            <ul className="flex flex-col space-y-2 text-sm font-medium">
              <li>
                <Link href="/" className="block py-2 hover:text-gray-600">
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="block py-2 hover:text-gray-600"
                >
                  PRODUCTS
                </Link>
              </li>
              <li>
                <Link
                  href="/#aboutus"
                  className="block py-2 hover:text-gray-600"
                >
                  ABOUT US
                </Link>
              </li>
              <li>
                <Link
                  href="/#contactus"
                  className="block py-2 hover:text-gray-600"
                >
                  CONTACT US
                </Link>
              </li>
            </ul>
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
              {isLoggedIn ? <Avatar /> : <UserIcon className="w-6 h-6 "/>}
                <span className="text-sm font-medium">
                  {isLoggedIn ? userProfile?.name : "Guest"}
                </span>
              </div>
              {isLoggedIn ? (
                <button onClick={logoutUser} className="text-sm text-gray-700">
                  Logout
                </button>
              ) : (
                <div className="space-x-2">
                  <Link href="/auth/login" className="text-sm text-gray-700">
                    Login
                  </Link>
                  <Link href="/auth/signup" className="text-sm text-gray-700">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
            <div
              className="mt-4 flex items-center justify-between"
              
            >
              <span className="text-sm font-medium">Cart</span>
              <div className="p-2 hover:bg-gray-100 rounded-full relative" onClick={toggleCartOpen}>
                <ShoppingBagIcon className="w-6 h-6" />
                <div className="absolute left-1/2 -top-1/3 w-6 h-6 border text-xs flex justify-center items-center bg-white text-gray-900 rounded-full">
                  {cartCount}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
