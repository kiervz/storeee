"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { ProductType } from "@/types";
import { FormatCurrency } from "@/app/lib/format";

interface ProductCardProps {
  product: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link className="group cursor-pointer" href={`/product/${product.slug}`}>
      <div className="aspect-square relative">
        <Image
          width={500}
          height={500}
          src={product.ProductVariation[0].ProductVariationImage[0].name}
          alt={product.name}
          className="aspect-square object-cover"
          priority
        />
        <div className="pt-2">
          <p className="text-sm text-black">{product.name}</p>
        </div>
        <p className="text-sm text-slate-500">{`${product.category.name}'s Shoes`}</p>
        <p className="text-sm text-slate-500">
          {product._count.ProductVariation} Colors
        </p>
        <div className="py-2">
          <p className="text-sm text-black">
            {FormatCurrency(
              product.ProductVariation[0].unit_price,
              "₱",
              product.ProductVariation[0].discount
            )}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
