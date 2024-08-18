"use client"
import React,{useState} from 'react';
import ProductCard from '../components/ProductCard';
import allProducts from '../data/products.json';
import { Product } from '../types/product';
import ProductInfoModal from '../components/ProductInfoModal';

export default function ProductsPage() {
  const [selectedProduct,setSelectedProduct] = useState<Product | null>(null);
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {allProducts.map(product => (
            <ProductCard key={product.id} product={product} setSelectedProduct={setSelectedProduct}/>
          ))}
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