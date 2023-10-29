"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { toast } from "react-hot-toast";

import { Size } from "@prisma/client";
import { ProductType, VariationImages, Variations } from "@/types";
import { cn } from "@/app/lib/utils";
import { Button } from "@/app/components/ui/button";
import MainImage from "../_components/main-image";
import ProductListSize from "../_components/product-list-size";
import ProductTitleSmall from "../_components/product-title-small";
import ProductTitleLarge from "../_components/product-title-large";
import ProductDescription from "../_components/product-description";

interface ProductClientProps {
  product: ProductType;
  sizes: Size[];
}

const ProductClient = ({ product, sizes }: ProductClientProps) => {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const containerRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<string>();
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [variationIndex, setVariationIndex] = useState<number>(0);
  const [currentVariation, setCurrentVariation] = useState<Variations>();
  const [variationImages, setVariationImages] = useState<VariationImages[]>();
  const [error, setError] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<{
    sizeId: string;
    sizeSlug: string;
  }>({
    sizeId: "",
    sizeSlug: "",
  });

  const handlePreviousImage = () => {
    setCurrentImage(variationImages?.[imageIndex - 1].name);
    setImageIndex((prev) => prev - 1);
  };

  const handleNextImage = () => {
    setCurrentImage(variationImages?.[imageIndex + 1].name);
    setImageIndex((prev) => prev + 1);
  };

  const handleAddToCart = async () => {
    setIsLoading(true);
    if (!selectedSize.sizeId) {
      setError("Please select a size.");
      setIsLoading(false);
    }

    if (currentVariation) {
      try {
        await axios.post("/api/cart", {
          productId: product.id,
          productVariationId: currentVariation.id,
          sizeId: selectedSize.sizeId,
        });

        toast.success(`${product.name} has been added to your cart.`);
      } catch (error: any) {
        if (error.response.status === 403) {
          toast.error("Unauthenticated, please login first.");
          router.push(`/auth/signin?callbackUrl=${pathname}`);
        }
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (searchParams.get("sku")) {
      const desiredVariation = product.ProductVariation.find(
        (variation: any) => variation.sku === searchParams.get("sku")
      );

      if (desiredVariation) {
        setCurrentImage(desiredVariation.ProductVariationImage[0].name);
        setVariationImages(desiredVariation.ProductVariationImage);
        setCurrentVariation(desiredVariation);
        return;
      }
    }

    setCurrentImage(product.ProductVariation[0].ProductVariationImage[0].name);
    setVariationImages(product.ProductVariation[0].ProductVariationImage);
    setCurrentVariation(product.ProductVariation[0]);
  }, [params.sku, params.slug, product.ProductVariation, searchParams]);

  return (
    <div className="mx-auto max-w-7xl py-8">
      <div className="flex justify-normal flex-col lg:flex-row gap-10 relative">
        <div className="flex justify-normal flex-row w-full lg:w-7/12 lg:sticky lg:top-16 gap-4 h-auto lg:h-[669px]">
          {variationImages && (
            <div
              ref={containerRef}
              className="hidden relative lg:flex justify-normal items-center flex-col gap-2 w-3/12 lg:w-2/12 h-[535px] overflow-y-scroll no-scrollbar"
            >
              {variationImages.map((item, index) => (
                <Image
                  key={item.id}
                  src={item.name}
                  alt={item.name}
                  priority={imageIndex === 0}
                  width={60}
                  height={60}
                  className={cn(
                    "rounded-md aspect-square hover:cursor-pointer",
                    {
                      "border-2 border-black opacity-75": imageIndex === index,
                    }
                  )}
                  onClick={() => {
                    setCurrentImage(item.name);
                    setImageIndex(index);
                  }}
                />
              ))}
            </div>
          )}
          {currentVariation && (
            <div className="flex justify-normal flex-col gap-4 w-full lg:w-10/12 h-auto ">
              <div className="flex justify-normal flex-col px-4 md:px-0 md:hidden">
                <ProductTitleSmall
                  product={product}
                  currentVariation={currentVariation}
                />
              </div>
              {currentImage && (
                <MainImage
                  handlePreviousImage={handlePreviousImage}
                  handleNextImage={handleNextImage}
                  imageIndex={imageIndex}
                  currentImage={currentImage}
                  variationImageLength={
                    product.ProductVariation[variationIndex]
                      .ProductVariationImage.length
                  }
                />
              )}
            </div>
          )}
        </div>
        {currentVariation && (
          <div className="flex justify-normal flex-col gap-6 w-full lg:w-4/12 ml-0 lg:ml-10 h-auto px-4 lg:px-0">
            <div className="hidden md:flex justify-normal flex-col">
              <ProductTitleLarge
                product={product}
                currentVariation={currentVariation}
              />
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-5 gap-2">
              {product.ProductVariation.map((variation: any, index: number) => (
                <Image
                  key={variation.id}
                  src={variation.ProductVariationImage[0].name}
                  alt={`variation-${index}`}
                  priority
                  width={60}
                  height={60}
                  className={cn(
                    "rounded-md aspect-square hover:cursor-pointer",
                    {
                      "border-2 border-black opacity-75":
                        currentVariation?.id === variation.id,
                    }
                  )}
                  onClick={() => {
                    setCurrentImage(variation.ProductVariationImage[0].name);
                    setVariationImages(variation.ProductVariationImage);
                    setCurrentVariation(variation);
                    setImageIndex(0);
                    setSelectedSize({
                      sizeId: "",
                      sizeSlug: "",
                    });
                    setVariationIndex(index);
                    router.push(`/product/${params.slug}?sku=${variation.sku}`);
                  }}
                />
              ))}
            </div>
            <ProductListSize
              sizes={sizes}
              selectedSize={selectedSize}
              error={error}
              setSelectedSize={setSelectedSize}
              setError={setError}
              currentVariation={currentVariation}
            />
            <Button
              variant="default"
              size="lg"
              className="w-full rounded-full h-14 text-md"
              onClick={handleAddToCart}
              disabled={isLoading || (!error && !selectedSize.sizeId)}
            >
              Add to cart
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full rounded-full h-14 text-md"
            >
              Fovourites
            </Button>
            <ProductDescription description={product.description} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductClient;
