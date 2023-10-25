import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(8).max(191),
  description: z.string().min(30),
  categoryId: z.string().min(1, "Category is required."),
  brandId: z.string().min(1, "Brand is required."),
  variations: z.array(
    z.object({
      variationId: z.string().nullable().optional(),
      colorId: z.string().min(1, "Color is required"),
      sku: z.string().min(1, "SKU is required."),
      unit_price: z.number().min(1, "Unit price is required."),
      discount: z
        .number()
        .min(0, "Discount cannot be negative.")
        .max(100, "Discount cannot exceed 100%.")
        .default(0),
      actual_price: z.number().default(0),
      images: z.array(z.string()).min(1, "At least 1 image is required."),
    })
  ),
  variationSizes: z.array(
    z.object({
      variationSizeId: z.string().nullable().optional(),
      colorId: z.string().min(1, "Color is required."),
      sizeId: z.string().min(1, "Size is required."),
      quantity: z
        .number()
        .min(1, "Quantity must be greater than 0.")
        .max(100, "Quantity must not be greater than 100."),
    })
  ),
});
