"use client";

import React, { useCallback, useState } from "react";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormProps, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Brand, Category, Color, Size } from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Heading } from "@/app/components/ui/heading";
import { initialValues } from "./initial-values";
import { formSchema } from "./schema";
import AddVariation from "./add-variation";
import AddSize from "./add-size";

interface AddUpdateProductClientProps {
  brands: Brand[];
  categories: Category[];
  colors: Color[];
  sizes: Size[];
  productCategorySizes: Size[];
  product?: any;
}

const AddUpdateProductClient: React.FC<AddUpdateProductClientProps> = ({
  brands,
  categories,
  colors,
  sizes,
  productCategorySizes,
  product,
}) => {
  const router = useRouter();
  const [variationCount, setVariationCount] = useState<number>(
    product?.variations.length ?? 1
  );
  const [variationSizeCount, setVariationSizeCount] = useState<number>(
    product?.variationSizes.length ?? 1
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [currentSizes, setCurrentSizes] = useState<typeof sizes>(
    product ? productCategorySizes : sizes
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: product ? product : initialValues,
  });

  const useZodForm = <TSchema extends z.ZodType>({
    schema,
    ...props
  }: Omit<UseFormProps<TSchema["_input"]>, "resolver"> & {
    schema: TSchema;
  }) => {
    const form = useForm<TSchema["_input"]>({
      ...props,
      resolver: zodResolver(schema, undefined),
    });

    return form;
  };

  const { control, reset } = useZodForm({
    schema: formSchema,
    defaultValues: product ? product : initialValues,
  });

  const {
    fields: variationFields,
    append: variationAppend,
    remove: variationRemove,
  } = useFieldArray({
    name: "variations",
    control,
  });

  const {
    fields: variationSizeFields,
    append: variationSizeAppend,
    remove: variationSizeRemove,
  } = useFieldArray({
    name: "variationSizes",
    control,
  });

  const getSizesByCategoryId = async (categoryId: string) => {
    const { data } = await axios.get(`/api/sizes/category/${categoryId}`);

    const updatedVariationSizes = [...form.getValues().variationSizes];

    console.log({ updatedVariationSizes });

    for (let i = 0; i < updatedVariationSizes.length; i++) {
      updatedVariationSizes[i].sizeId = "";
    }

    form.setValue("variationSizes", updatedVariationSizes);

    setCurrentSizes(data);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log({ values });
    try {
      setLoading(true);
      if (product) {
        const { data } = await axios.patch(
          `/api/products/${product.id}`,
          values
        );

        toast.success(data.message);
      } else {
        const { data } = await axios.post(`/api/products`, values);
        toast.success(data.message);
      }

      router.push("/products");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleUnitPriceChange = useCallback(
    (index: number, newValue: number) => {
      const updatedVariations = [...form.getValues().variations];
      const discount =
        (updatedVariations[index].discount ?? 0 / 100) * newValue;

      updatedVariations[index].unit_price = newValue;
      updatedVariations[index].actual_price = newValue - discount;
      form.setValue("variations", updatedVariations);
    },
    [form]
  );

  const handleDiscountChange = useCallback(
    (index: number, newValue: number) => {
      if (isNaN(newValue)) newValue = 0;
      const updatedVariations = [...form.getValues().variations];
      const discount = (newValue / 100) * updatedVariations[index].unit_price;
      updatedVariations[index].discount = newValue;

      updatedVariations[index].actual_price =
        updatedVariations[index].unit_price - discount;
      form.setValue("variations", updatedVariations);
    },
    [form]
  );

  const onSelectedFile = useCallback(
    (index: number, url: string) => {
      const updatedVariations = [...form.getValues().variations];

      if (!Array.isArray(updatedVariations[index].images)) {
        updatedVariations[index].images = [];
      }

      updatedVariations[index].images.push(url);

      form.setValue("variations", updatedVariations);
    },
    [form]
  );

  const onRemoveFile = useCallback(
    (variationIndex: number, urlToRemove: string) => {
      const updatedVariations = [...form.getValues().variations];

      updatedVariations[variationIndex].images = updatedVariations[
        variationIndex
      ].images.filter((imageUrl) => imageUrl !== urlToRemove);

      form.setValue("variations", updatedVariations);
    },
    [form]
  );

  console.log({ form: form.getValues() });

  return (
    <div className="flex flex-col gap-6">
      <Heading
        title="Add Product"
        description="Create new products in your inventory"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="text-red-500">*</span> Product Name
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Ex. Nike Jordan 1 Low Coconut"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="text-red-500">*</span> Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ex. The Air Jordan 1 Low Coconut remakes the classic sneaker with new colours and textures."
                    // className='resize-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-normal flex-col md:flex-row gap-4">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="w-full md:w-6/12">
                  <FormLabel>
                    <span className="text-red-500">*</span> Category
                  </FormLabel>
                  <Select
                    disabled={loading}
                    defaultValue={field.value}
                    onValueChange={(newValue) => {
                      field.onChange(newValue);
                      getSizesByCategoryId(newValue);
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category: Category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
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
              name="brandId"
              render={({ field }) => (
                <FormItem className="w-full md:w-6/12">
                  <FormLabel>
                    <span className="text-red-500">*</span> Brand
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
                          placeholder="Select a brand"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {brands.map((brand: Brand) => (
                        <SelectItem key={brand.id} value={brand.id}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <AddVariation
            loading={loading}
            variationAppend={variationAppend}
            setVariationCount={setVariationCount}
            variationCount={variationCount}
            variationFields={variationFields}
            variationRemove={variationRemove}
            form={form}
            colors={colors}
            handleUnitPriceChange={handleUnitPriceChange}
            handleDiscountChange={handleDiscountChange}
            onSelectedFile={onSelectedFile}
            onRemoveFile={onRemoveFile}
          />

          <AddSize
            loading={loading}
            variationSizeAppend={variationSizeAppend}
            setVariationSizeCount={setVariationSizeCount}
            variationSizeCount={variationSizeCount}
            variationSizeFields={variationSizeFields}
            variationSizeRemove={variationSizeRemove}
            form={form}
            colors={colors}
            currentSizes={currentSizes}
          />

          <div className="space-x-2 flex items-center justify-end w-full">
            <Button disabled={loading} className="ml-auto px-10" type="submit">
              {product ? "UPDATE" : "SUBMIT"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddUpdateProductClient;
