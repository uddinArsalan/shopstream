"use client";
import Image from "next/image";
import { Product } from "../types/product";
import { useCart } from "../context/CartContext";
import { useState } from "react";

interface ProductCardType {
  product: Product;
  setSelectedProduct : React.Dispatch<React.SetStateAction<Product | null>>
}

export default function ProductCard({ product ,setSelectedProduct}: ProductCardType) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105" 
      onClick={() => setSelectedProduct(product)}
    >
      <div className="relative w-full h-48">
        <Image
          src={product.image}
          alt={product.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-900 truncate">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-2">
          {product.description.substring(0, 100)}...
        </p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-gray-900 font-bold">
            ${product.price.toFixed(2)}
          </span>
          <button
            className={`bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium
                        transition-all duration-300 ease-in-out
                        ${
                          isAdding ? "opacity-75 scale-95" : "hover:bg-gray-800"
                        }`}
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? "Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}