"use client";

import React, { useEffect, useRef, useState } from "react";
import { Brand, Category, Color } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Settings2 } from "lucide-react";

import { cn } from "@/app/lib/utils";
import { Button } from "@/app/components/ui/button";
import { ReactCombobox } from "@/app/components/ui/react-combobox";
import { ProductType } from "@/types";
import Container from "@/app/components/container";
import FilterClient, { sortsData } from "./filter";
import FilterMobileMode from "./filter-mobile-mode";
import ProductList from "./product-list";

interface ShopClientProps {
  categories: Category[];
  brands: Brand[];
  colors: Color[];
  products: ProductType[];
}

const ShopClient = ({
  categories,
  brands,
  colors,
  products,
}: ShopClientProps) => {
  const ref = useRef<string | any>();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams?.toString());

  const [openFilter, setToggleFilter] = useState<boolean>(false);

  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [lastWindowWidth, setLastWindowWidth] = useState<number>(0);

  const handleSearchParams = (key: string, value: string) => {
    const searchCategories = urlSearchParams.getAll(key);

    if (searchCategories.includes(value)) {
      if (key !== "price") {
        const updatedCategories = searchCategories.filter(
          (item) => item !== value
        );

        urlSearchParams.delete(key);

        updatedCategories.forEach((value) =>
          urlSearchParams.append(key, value)
        );
      }
    } else {
      if (key === "price" || key === "orderBy") {
        urlSearchParams.delete(key);
      }

      urlSearchParams.append(key, value);
    }

    router.replace(`${pathname}?${urlSearchParams.toString()}`);
  };

  const handleToggleFilter = () => {
    setToggleFilter(!openFilter);

    if (!openFilter && windowWidth <= 768) {
      setToggleFilter(true);
    }
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    if (windowWidth > 768) {
      setToggleFilter(true);
    } else {
      if (windowWidth < 768) {
        if (lastWindowWidth === 0) {
          setToggleFilter(false);
        }
        if (windowWidth < lastWindowWidth) {
          setToggleFilter(false);
        }
      }
    }
  }, [windowWidth, lastWindowWidth]);

  const handleClick = (e: any) => {
    if (e.target.contains(ref.current)) {
      setToggleFilter(false);
    }
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    setLastWindowWidth(windowWidth);
  };

  useEffect(() => {
    if (windowWidth < 768) {
      if (openFilter) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }
  }, [windowWidth, openFilter]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <div className="flex justify-between items-center pb-4 flex-col sm:flex-row">
        <p className="text-xl">Shoes (123)</p>
        <div className="flex justify-normal items-center text-right py-2 gap-2">
          <Button
            onClick={handleToggleFilter}
            size="default"
            variant="outline"
            className=" font-normal hover:bg-white w-auto"
          >
            {windowWidth < 768
              ? "Filter"
              : windowWidth > 768 && openFilter
              ? "Hide Filter"
              : "Show Filter"}
            <Settings2 size="18" className="ml-2" />
          </Button>
          <ReactCombobox
            options={sortsData}
            handleSearchParams={handleSearchParams}
            initialValue={urlSearchParams.get("orderBy") ?? ""}
            placeholder="Sort By"
            placeholderItem="Sort"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-normal w-full gap-x-2">
        {windowWidth > 768 && (
          <div
            className={cn({
              "opacity-100 md:block md:w-2/12": openFilter,
              "hidden opacity-0": !openFilter,
            })}
          >
            <FilterClient
              categoriesData={categories}
              brandsData={brands}
              colorsData={colors}
              handleSearchParams={handleSearchParams}
            />
          </div>
        )}
        {products && (
          <div
            className={cn("px-2", {
              "w-full md:w-10/12": openFilter,
              "w-full": !openFilter,
            })}
          >
            <ProductList products={products} />
          </div>
        )}
      </div>

      <FilterMobileMode
        categories={categories}
        brands={brands}
        colors={colors}
        handleClick={handleClick}
        windowWidth={windowWidth}
        openFilter={openFilter}
        setToggleFilter={setToggleFilter}
        handleSearchParams={handleSearchParams}
      />
    </Container>
  );
};

export default ShopClient;
