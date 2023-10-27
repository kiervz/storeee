"use client";

import React from "react";
import NoResult from "@/app/components/ui/no-result";
import ProductCard from "./product-card";
import { ProductType } from "@/types";

interface ProductListProps {
  products: ProductType[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="space-y-4">
      {products.length === 0 && <NoResult />}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
