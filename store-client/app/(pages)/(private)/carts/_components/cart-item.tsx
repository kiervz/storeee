"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Cart } from "@/types";
import { FormatCurrency } from "@/app/lib/format";
import { Heart, Trash2 } from "lucide-react";
import { Separator } from "@/app/components/ui/separator";

interface CartProps {
  carts: Cart[];
  handleFavourite: () => void;
  handleTrash: (id: string) => void;
}

const CartItem: React.FC<CartProps> = ({
  carts,
  handleFavourite,
  handleTrash,
}) => {
  return (
    <>
      <div className="flex justify-normal flex-col gap-10">
        {carts.map((item: Cart, index: number) => (
          <div key={item.id} className="flex justify-normal flex-col gap-10">
            <div className="flex justify-normal gap-4">
              <Image
                src={item.productVariation.ProductVariationImage[0].name}
                alt={item.product.name}
                className="w-[80px] md:w-[150px] h-[80px] md:h-[150px] aspect-square"
                width={0}
                height={0}
                priority
                sizes="100vw"
                quality={100}
                style={{
                  objectFit: "cover",
                }}
              />
              <div className="flex justify-between flex-col w-full">
                <div className="flex justify-between flex-col">
                  <div className="flex justify-normal flex-col md:justify-between md:flex-row items-start md:items-center">
                    <Link
                      href={`/product/${item.product.slug}?sku=${item.productVariation.sku}`}
                      className="font-semibold text-sm md:text-lg"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm md:text-base">
                      {FormatCurrency(
                        item.productVariation.unit_price,
                        "₱",
                        item.productVariation.discount
                      )}
                    </p>
                  </div>
                  <p className="text-sm md:text-base">{`${item.product.category.name}'s Shoes`}</p>
                  <p className="text-sm md:text-base">
                    Color: {item.productVariation.color.name}
                  </p>
                  <div className="flex justify-normal gap-4">
                    <div className="flex justify-normal items-center text-sm md:text-base">
                      <p>
                        Size: <span>{item.productVariationSize.size.name}</span>
                      </p>
                    </div>
                    <div className="flex justify-normal items-center text-sm md:text-base">
                      <p>
                        Quantity: <span>{item.quantity}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-normal gap-4">
                  <Heart className="cursor-pointer" onClick={handleFavourite} />
                  <Trash2
                    className="cursor-pointer"
                    onClick={() => {
                      handleTrash(item.id);
                    }}
                  />
                </div>
              </div>
            </div>
            {index !== carts.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </>
  );
};

export default CartItem;
