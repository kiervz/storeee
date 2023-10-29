"use client";

import { useEffect, useState } from "react";
import { Size } from "@prisma/client";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils";
import { Variations } from "@/types";

interface ProductListSizeProps {
  sizes: Size[];
  selectedSize: {
    sizeId: string;
    sizeSlug: string;
  };
  error: string;
  setSelectedSize: (value: { sizeId: string; sizeSlug: string }) => void;
  setError: (value: string) => void;
  currentVariation: Variations;
}

const ProductListSize: React.FC<ProductListSizeProps> = ({
  sizes,
  selectedSize,
  error,
  setSelectedSize,
  setError,
  currentVariation,
}) => {
  const [availableSizes, setAvailableSizes] = useState<Array<string>>([]);

  useEffect(() => {
    const sizes = currentVariation.ProductVariationSize.map(
      (size) => size.sizeId
    );
    setAvailableSizes(sizes);
  }, [currentVariation]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <p>Select Size</p>
        <Button variant="link" className="text-sm">
          Select Guide
        </Button>
      </div>

      <div
        className={cn("grid grid-cols-3 gap-2", {
          "border border-red-500 rounded-lg": !selectedSize.sizeId && error,
        })}
      >
        {sizes.map((size) => (
          <Button
            key={size.id}
            variant="outline"
            className={cn("py-6 font-normal text-base", {
              "border border-black": size.id === selectedSize.sizeId,
            })}
            onClick={() => {
              setSelectedSize({
                sizeId: size.id,
                sizeSlug: size.slug,
              });
              setError("");
            }}
            disabled={!availableSizes.includes(size.id)}
          >
            {size.name}
          </Button>
        ))}
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default ProductListSize;
