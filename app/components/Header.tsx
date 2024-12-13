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
    <header className="bg-gradient-to-r from-gray-50 to-white text-black sticky top-0 left-0 right-0 z-50 shadow-md">
  <div className="bg-gray-800 text-white text-sm md:text-base py-2 text-center">
    <p>$50 off on orders above $2000</p>
  </div>
  <nav className="container mx-auto px-4 py-5">
    <div className="flex items-center justify-between">
      <Link href="/">
        <div className="flex items-center space-x-3 md:space-x-5">
          <Image alt="logo" src="/logo.png" className="w-12 md:w-14" width={52} height={52} />
          <span className="text-xl md:text-2xl font-bold tracking-tight">SHOPSTREAM</span>
        </div>
      </Link>

      <div className="hidden md:flex items-center space-x-8">
        <ul className="flex space-x-8 text-base font-semibold">
          <li>
            <Link href="/" className="hover:text-gray-700 transition-colors duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/products" className="hover:text-gray-700 transition-colors duration-300">
              Products
            </Link>
          </li>
          <li>
            <Link href="/#aboutus" className="hover:text-gray-700 transition-colors duration-300">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/#contactus" className="hover:text-gray-700 transition-colors duration-300">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>

      <div className="hidden md:flex items-center space-x-8">
        <div className="relative">
          <button
            className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-full transition duration-300"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {isLoggedIn ? <Avatar /> : <UserIcon className="w-6 h-6" />}
            <ChevronDownIcon className="w-5 h-5" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-md shadow-lg py-3 z-10">
              {isLoggedIn ? (
                <>
                  <p className="px-4 py-2 text-sm text-gray-800">
                    {userProfile?.name}
                  </p>
                  <button
                    onClick={logoutUser}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-300"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          )}
        </div>

        <button
          className="p-2 hover:bg-gray-200 rounded-full relative transition duration-300"
          onClick={toggleCartOpen}
        >
          <ShoppingBagIcon className="w-6 h-6" />
          <div className="absolute left-1/2 -top-2 w-6 h-6 border text-xs flex justify-center items-center bg-gray-100 text-black rounded-full">
            {cartCount}
          </div>
        </button>
      </div>

      <button
        className="md:hidden focus:outline-none"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Bars3Icon className="w-6 h-6" />
      </button>
    </div>

    {isMobileMenuOpen && (
      <div className="mt-5 md:hidden space-y-3">
        <ul className="flex flex-col space-y-3 text-base font-semibold">
          <li>
            <Link href="/" className="block py-2 hover:text-gray-700 transition-colors duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/products" className="block py-2 hover:text-gray-700 transition-colors duration-300">
              Products
            </Link>
          </li>
          <li>
            <Link href="/#aboutus" className="block py-2 hover:text-gray-700 transition-colors duration-300">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/#contactus" className="block py-2 hover:text-gray-700 transition-colors duration-300">
              Contact Us
            </Link>
          </li>
        </ul>

        <div className="mt-5 flex space-y-3 justify-between">
          <div className="flex items-center space-x-3">
            {isLoggedIn ? <Avatar /> : <UserIcon className="w-6 h-6" />}
            <span className="text-base font-medium">
              {isLoggedIn ? userProfile?.name : "Guest"}
            </span>
          </div>

          {isLoggedIn ? (
            <button
              onClick={logoutUser}
              className="text-sm text-gray-700 hover:text-gray-900 transition-colors duration-300"
            >
              Logout
            </button>
          ) : (
            <div className="space-x-3">
              <Link
                href="/auth/login"
                className="text-sm text-gray-700 hover:text-gray-900 transition-colors duration-300"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="text-sm text-gray-700 hover:text-gray-900 transition-colors duration-300"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between" onClick={toggleCartOpen}>
          <span className="text-base">Cart</span>
          <button
            className="p-2 hover:bg-gray-200 rounded-full relative transition duration-300"
          >
            <ShoppingBagIcon className="w-6 h-6" />
            <div className="absolute left-1/2 -top-2 w-6 h-6 border text-xs flex justify-center items-center bg-gray-200 text-black rounded-full">
              {cartCount}
            </div>
          </button>
        </div>
      </div>
    )}
  </nav>
</header>


  );
}

export default Header;
