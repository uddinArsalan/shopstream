"use client";
import { useCart } from "../context/CartContext";
import { XMarkIcon, StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Product } from "../types/product";
import {useState} from "react"

interface ProductInfoModalType {
  product: Product;
  onClose: () => void;
}

export default function ProductInfoModal({
  product,
  onClose,
}: ProductInfoModalType) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000] p-4">
      <div className="bg-white text-gray-900 rounded-lg p-4 sm:p-6 md:p-8 max-w-4xl w-full h-[90vh] sm:h-auto sm:max-h-[90vh] flex flex-col relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-900 hover:text-gray-700 z-10"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 mt-8 sm:mt-4 flex-grow overflow-y-auto scrollbar-hide">
          <div className="lg:w-1/2 flex-shrink-0">
            <div className="relative aspect-square w-full max-w-sm mx-auto">
              <Image
                src={product.image}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>

          <div className="lg:w-1/2 flex flex-col">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3">
              {product.name}
            </h2>
            <p className="text-gray-600 text-sm lg:text-base mb-3 sm:mb-4">
              {product.description}
            </p>

            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-gray-500">
                In stock: {product.stock}
              </span>
            </div>

            <div className="mb-2 sm:mb-3 text-sm lg:text-base">
              <span className="font-semibold">Brand:</span> {product.brand}
            </div>

            <div className="mb-3 sm:mb-4 flex items-center text-sm lg:text-base">
              <span className="font-semibold mr-2">Rating:</span>
              <StarIcon className="h-4 w-4 lg:h-5 lg:w-5 text-yellow-400" />
              <span>{product.rating} / 5</span>
            </div>

            <div className="mb-4 sm:mb-6">
              <h3 className="font-semibold mb-1 text-sm lg:text-base">
                Features:
              </h3>
              <ul className="list-disc list-inside text-sm lg:text-base">
                {product.features.map((feature, index) => (
                  <li key={index} className="mb-1">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={handleAddToCart}
              className={`w-full px-6 py-2 lg:py-3 bg-gray-900 text-white text-sm rounded-lg  transition-all duration-300 ease-in-out font-semibold mt-auto ${
                isAdding ? "opacity-75 scale-95" : "hover:bg-gray-800"
              }`}
              disabled={isAdding}
            >
              {isAdding ? "Added!" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
