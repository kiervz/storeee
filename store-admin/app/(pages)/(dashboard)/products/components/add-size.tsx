import { Trash, Trash2 } from "lucide-react";
import { Color, Product, Size } from "@prisma/client";
import { FieldArrayWithId } from "react-hook-form";

import { Button } from "@/app/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Heading2 } from "@/app/components/ui/heading";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

interface AddSizeProps {
  loading: boolean;
  variationSizeAppend: any;
  setVariationSizeCount: (value: number) => void;
  variationSizeCount: number;
  variationSizeFields: FieldArrayWithId<Product>[];
  variationSizeRemove: (value: number) => void;
  form: any;
  colors: Color[];
  currentSizes: Size[];
}

const AddSize: React.FC<AddSizeProps> = ({
  loading,
  variationSizeAppend,
  setVariationSizeCount,
  variationSizeCount,
  variationSizeFields,
  variationSizeRemove,
  form,
  colors,
  currentSizes,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <Heading2 title="Add Size" description="Specify sizes for each color." />
      <Button
        variant="outline"
        disabled={loading}
        className="mr-auto"
        type="button"
        onClick={() => {
          variationSizeAppend({
            variationSizeId: "",
            colorId: "",
            sizeId: "",
            quantity: 0,
          });
          setVariationSizeCount(variationSizeCount + 1);
        }}
      >
        Add Size
      </Button>
      {variationSizeFields.map((field, index) => {
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
                variationSizeRemove(index);

                form.setValue(
                  "variationSizes",
                  form
                    .getValues()
                    .variationSizes.filter((_: any, i: number) => i !== index)
                );

                setVariationSizeCount(variationSizeCount - 1);
              }}
              disabled={variationSizeCount === 1 || loading}
            >
              <Trash2 size={20} />
            </Button>
            <div className="flex justify-between flex-col md:flex-row gap-4 w-full">
              <FormField
                control={form.control}
                name={`variationSizes.${index}.colorId` as const}
                render={({ field }) => {
                  const formValues = form.getValues();
                  const selectedColors = formValues.variations
                    .map((variation: { colorId: string }) => variation.colorId)
                    .filter((colorId: string) => colorId !== undefined);

                  return (
                    <FormItem className="w-full md:w-6/12">
                      <FormLabel>
                        <span className="text-red-500">*</span> Color
                      </FormLabel>
                      <Select
                        disabled={loading}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
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
                          {colors.map((color: Color) => {
                            if (selectedColors.includes(color.id)) {
                              return (
                                <SelectItem key={color.id} value={color.id}>
                                  {color.name}
                                </SelectItem>
                              );
                            }
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <div className="flex flex-row gap-4 w-full">
                <div className="flex justify-normal gap-4 w-full">
                  <FormField
                    control={form.control}
                    name={`variationSizes.${index}.sizeId` as const}
                    render={({ field }) => (
                      <FormItem className="w-6/12">
                        <FormLabel>
                          <span className="text-red-500">*</span> Size
                        </FormLabel>
                        <Select
                          disabled={loading}
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                defaultValue={field.value}
                                placeholder="Select a size"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {currentSizes.map((size: Size) => (
                              <SelectItem key={size.id} value={size.id}>
                                {size.name}
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
                    name={`variationSizes.${index}.quantity` as const}
                    render={({ field }) => {
                      return (
                        <FormItem className="w-6/12 md:w-3/12">
                          <FormLabel>
                            <span className="text-red-500">*</span> Quantity
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              disabled={loading}
                              placeholder="0"
                              {...field}
                              onChange={(e) => {
                                field.onChange(parseInt(e.target.value));
                              }}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
              </div>
              <div>
                <Button
                  className="mt-8 hidden md:flex"
                  variant="destructive"
                  size="icon"
                  type="button"
                  onClick={() => {
                    variationSizeRemove(index);

                    form.setValue(
                      "variationSizes",
                      form
                        .getValues()
                        .variationSizes.filter(
                          (_: any, i: number) => i !== index
                        )
                    );

                    setVariationSizeCount(variationSizeCount - 1);
                  }}
                  disabled={variationSizeCount === 1}
                >
                  <Trash />
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AddSize;
