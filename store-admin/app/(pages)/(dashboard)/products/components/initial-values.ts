export const initialValues = {
  name: "",
  description: "",
  categoryId: "",
  brandId: "",
  variations: [
    {
      variationId: "",
      colorId: "",
      sku: "",
      unit_price: 0,
      discount: 0,
      actual_price: 0,
      images: [],
    },
  ],
  variationSizes: [
    { variationSizeId: "", colorId: "", sizeId: "", quantity: 0 },
  ],
};
