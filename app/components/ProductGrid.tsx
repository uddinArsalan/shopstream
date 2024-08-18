"use client"
import React,{useState} from "react";
import ProductCard from "./ProductCard";
import allProducts from "../data/products.json";
import Link from "next/link";
import { Product } from "../types/product";
import ProductInfoModal from "./ProductInfoModal";

function ProductGrid() {
  const featuredProducts = allProducts.slice(0, 4);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  return (
    <div id="featuredproducts" className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} setSelectedProduct={setSelectedProduct}/>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/products">
            <div className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors duration-300">
              View All Products
            </div>
          </Link>
        </div>
      </div>
      {selectedProduct && (
        <ProductInfoModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
}

export default ProductGrid;
