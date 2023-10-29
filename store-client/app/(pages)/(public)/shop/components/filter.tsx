"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Brand, Category, Color } from "@prisma/client";
import { Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { Checkbox } from "@/app/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils";

export const dataByPrice = [
  { id: "all-price", value: [0, 10000000], label: "All Prices" },
  { id: "under-3k", value: [0, 3000], label: "Under ₱ 3,000" },
  { id: "from-3k-to-6k", value: [3001, 6000], label: "₱ 3,001 - ₱ 6,000" },
  { id: "from-6k-to-12k", value: [6001, 12000], label: "₱ 6,001 - ₱ 12,000" },
  { id: "over-12k", value: [12001, 10000000], label: "Over 12,000" },
];

export const dataSaleOffers = [{ value: "sale", label: "Sale" }];

export const sortsData = [
  { value: "latest-arrival", label: "Latest Arrival" },
  { value: "featured", label: "Featured" },
  { value: "high-low", label: "Price: High Low" },
  { value: "low-high", label: "Price: Low High" },
];

interface FilterProps {
  categoriesData: Category[];
  brandsData: Brand[];
  colorsData: Color[];
  setCloseFilter?: (value: boolean) => void;
  handleSearchParams: (key: string, value: string) => void;
}

const FilterClient: React.FC<FilterProps> = ({
  categoriesData,
  brandsData,
  colorsData,
  setCloseFilter,
  handleSearchParams,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams?.toString());

  const handleClose = () => {
    setCloseFilter?.(false);
  };

  const handleClear = () => {
    router.push("/shop");
  };

  return (
    <div
      className={cn({
        "w-full h-screen overflow-y-auto flex justify-between items-center flex-col":
          window.innerWidth < 768,
      })}
    >
      <div
        className={cn("w-full", {
          "h-[85vh] overflow-y-auto mt-4 p-8": window.innerWidth < 768,
        })}
      >
        <Accordion type="single" collapsible defaultValue="item-categories">
          <AccordionItem className="border-none" value="item-categories">
            <AccordionTrigger className="lg:pt-0">Categories</AccordionTrigger>
            {categoriesData.map((category) => (
              <AccordionContent key={category.slug}>
                <div className="flex justify-start items-center gap-2">
                  <Checkbox
                    id={category.slug}
                    onCheckedChange={() =>
                      handleSearchParams("category", category.slug)
                    }
                    checked={urlSearchParams
                      .getAll("category")
                      .includes(category.slug)}
                  />
                  <label
                    htmlFor={category.slug}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.name}
                  </label>
                </div>
              </AccordionContent>
            ))}
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible defaultValue="item-brands">
          <AccordionItem value="item-brands">
            <AccordionTrigger>Brand</AccordionTrigger>
            {brandsData.map((brand) => (
              <AccordionContent key={brand.slug}>
                <div className="flex justify-start items-center gap-2">
                  <Checkbox
                    id={brand.slug}
                    onCheckedChange={() =>
                      handleSearchParams("brand", brand.slug)
                    }
                    checked={urlSearchParams
                      .getAll("brand")
                      .includes(brand.slug)}
                  />
                  <label
                    htmlFor={brand.slug}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {brand.name}
                  </label>
                </div>
              </AccordionContent>
            ))}
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible defaultValue="item-prices">
          <AccordionItem value="item-prices">
            <AccordionTrigger>By Price</AccordionTrigger>
            <RadioGroup>
              {dataByPrice.map((byPrice) => (
                <AccordionContent key={byPrice.id}>
                  <div className="flex justify-start items-center gap-2">
                    <RadioGroupItem
                      id={byPrice.id}
                      value={byPrice.id}
                      checked={urlSearchParams
                        .getAll("price")
                        .includes(byPrice.id)}
                      onClick={() => handleSearchParams("price", byPrice.id)}
                    />
                    <label
                      htmlFor={byPrice.id}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {byPrice.label}
                    </label>
                  </div>
                </AccordionContent>
              ))}
            </RadioGroup>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible defaultValue="item-sales">
          <AccordionItem value="item-sales">
            <AccordionTrigger>Sale & Offers</AccordionTrigger>
            {dataSaleOffers.map((saleOffer) => (
              <AccordionContent key={saleOffer.value}>
                <div className="flex justify-start items-center gap-2">
                  <Checkbox
                    onCheckedChange={() =>
                      handleSearchParams("saleOffer", saleOffer.value)
                    }
                    id={saleOffer.value}
                    checked={urlSearchParams
                      .getAll("saleOffer")
                      .includes(saleOffer.value)}
                  />
                  <label
                    htmlFor={saleOffer.value}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {saleOffer.label}
                  </label>
                </div>
              </AccordionContent>
            ))}
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible defaultValue="item-colors">
          <AccordionItem value="item-colors">
            <AccordionTrigger>Color</AccordionTrigger>
            <div className="grid grid-cols-5 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {colorsData.map((color) => (
                <AccordionContent
                  key={color.slug}
                  className="flex justify-center text-center"
                >
                  <div onClick={() => handleSearchParams("color", color.slug)}>
                    <div className="flex justify-center items-center flex-col">
                      <div
                        style={{
                          background:
                            color.slug !== "multi-color"
                              ? `${color.hexValue}`
                              : "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
                        }}
                        className={"border rounded-full h-8 w-8"}
                      >
                        <div className="flex justify-center items-center p-1">
                          {urlSearchParams
                            .getAll("color")
                            .includes(color.slug) &&
                            (color.slug === "white" ? (
                              <Check color="black" />
                            ) : (
                              <Check color="white" />
                            ))}
                        </div>
                      </div>
                    </div>
                    <p>{color.name}</p>
                  </div>
                </AccordionContent>
              ))}
            </div>
          </AccordionItem>
        </Accordion>
      </div>
      {window.innerWidth < 768 && (
        <div className="w-full h-[15vh] border-t-[1px] p-2 flex flex-col justify-center items-center">
          <div className="flex justify-center items-center align-middle gap-2">
            <Button
              size="lg"
              variant="outline"
              className="font-normal"
              onClick={handleClear}
            >
              Clear ({urlSearchParams.size})
            </Button>
            <Button
              size="lg"
              variant="default"
              className="font-normal"
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterClient;
