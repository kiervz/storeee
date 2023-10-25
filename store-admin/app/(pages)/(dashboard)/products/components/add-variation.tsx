import { Color, Product } from "@prisma/client";
import { Trash, Trash2 } from "lucide-react";

import { Heading2 } from "@/app/components/ui/heading";
import { Button } from "@/app/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import UploadImage from "./upload-image";
import { Input } from "@/app/components/ui/input";
import { FieldArrayWithId } from "react-hook-form";

interface AddVariationProps {
  loading: boolean;
  variationAppend: any;
  setVariationCount: (value: number) => void;
  variationCount: number;
  variationFields: FieldArrayWithId<Product>[];
  variationRemove: (value: number) => void;
  form: any;
  colors: Color[];
  handleUnitPriceChange: (index: number, value: number) => void;
  handleDiscountChange: (index: number, value: number) => void;
  onSelectedFile: (index: number, url: string) => void;
  onRemoveFile: (index: number, url: string) => void;
}

const AddVariation: React.FC<AddVariationProps> = ({
  loading,
  variationAppend,
  setVariationCount,
  variationCount,
  variationFields,
  variationRemove,
  form,
  colors,
  handleUnitPriceChange,
  handleDiscountChange,
  onSelectedFile,
  onRemoveFile,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <Heading2
        title="Add Variation"
        description="Add variations when the product has multiple colors, or configure the single available color."
      />
      <Button
        variant="outline"
        disabled={loading}
        className="mr-auto"
        type="button"
        onClick={() => {
          variationAppend({
            variationId: "",
            colorId: "",
            sku: "",
            unit_price: 0,
            discount: 0,
            actual_price: 0,
            images: [],
          });
          setVariationCount(variationCount + 1);
        }}
      >
        Add Variation
      </Button>
      {variationFields.map((field, index) => {
        return (
          <div
            key={field.id}
            className="flex justify-normal gap-2 items-start border p-2 relative"
          >
            <Button
              type="button"
              className="absolute top-[1px] right-[1px] rounded-full h-8 w-8 px-0 text-red-500 flex md:hidden"
              variant={"ghost"}
              size={"sm"}
              onClick={() => {
                variationRemove(index);

                form.setValue(
                  "variations",
                  form
                    .getValues()
                    .variations.filter((_: any, i: number) => i !== index)
                );

                setVariationCount(variationCount - 1);
              }}
              disabled={variationCount === 1}
            >
              <Trash2 size={20} />
            </Button>
            <div className="flex justify-normal flex-col w-full gap-4">
              <div className="flex justify-between flex-col md:flex-row gap-4 w-full">
                <div className="flex justify-normal gap-4 w-full">
                  <FormField
                    control={form.control}
                    name={`variations.${index}.colorId` as const}
                    render={({ field }) => (
                      <FormItem className="w-full md:w-6/12">
                        <FormLabel>
                          <span className="text-red-500">*</span> Color
                        </FormLabel>
                        <Select
                          defaultValue={field.value}
                          disabled={loading}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                defaultValue={field.value}
                                placeholder="Select a color"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {colors.map((color: Color) => (
                              <SelectItem key={color.id} value={color.id}>
                                {color.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`variations.${index}.sku` as const}
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full md:w-6/12">
                          <FormLabel>
                            <span className="text-red-500">*</span> SKU
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={loading}
                              placeholder="SKU"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <Button
                  className="mt-8 hidden md:flex"
                  variant="destructive"
                  size="icon"
                  type="button"
                  onClick={() => {
                    variationRemove(index);

                    form.setValue(
                      "variations",
                      form
                        .getValues()
                        .variations.filter((_: any, i: number) => i !== index)
                    );

                    setVariationCount(variationCount - 1);
                  }}
                  disabled={variationCount === 1}
                >
                  <Trash />
                </Button>
              </div>
              <div className="flex justify-normal gap-4 w-full">
                <FormField
                  control={form.control}
                  name={`variations.${index}.unit_price` as const}
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full md:w-3/12">
                        <FormLabel>
                          <span className="text-red-500">*</span> Unit Price
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            disabled={loading}
                            placeholder="Unit Price"
                            {...field}
                            onChange={(e) => {
                              handleUnitPriceChange(
                                index,
                                Number(e.target.value)
                              );
                            }}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name={`variations.${index}.discount` as const}
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full md:w-2/12">
                        <FormLabel>Discount</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            disabled={loading}
                            placeholder="0"
                            {...field}
                            onChange={(e) => {
                              handleDiscountChange(
                                index,
                                parseFloat(e.target.value)
                              );
                            }}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  disabled
                  control={form.control}
                  name={`variations.${index}.actual_price` as const}
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full md:w-3/12">
                        <FormLabel>Actual Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="flex justify-normal gap-4 w-full">
                <FormField
                  control={form.control}
                  name={`variations.${index}.images` as const}
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormLabel>Images</FormLabel>
                        <FormControl>
                          <UploadImage
                            index={index}
                            disabled={loading}
                            value={field.value}
                            onChange={onSelectedFile}
                            onRemove={onRemoveFile}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AddVariation;
