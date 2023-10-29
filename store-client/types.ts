export interface OrderType {
  id: string;
  user_id: string;
  status: string;
  total_amount: number;
  type: string;
  session_id: string;
  packed_at: string;
  shipped_at: string;
  delivered_at: string;
  cancel_at: string;
  created_at: string;
  OrderItem: OrderItemType[];
  OrderRefund: OrderRefundType[];
}

export interface OrderRefundType {
  id: string;
  reason: string;
}

export interface OrderItemType {
  id: string;
  product: OrderProductType;
  productVariation: OrderProductVariationType;
  price: number;
  quantity: number;
  total_price: number;
}

export interface OrderProductType {
  id: string;
  category: string;
  brand: string;
  name: string;
  slug: string;
  description: string;
}

export interface OrderProductVariationType {
  id: string;
  color: Color;
  size: Omit<SizeType, "id">;
  sku: string;
  unit_price: number;
  discount: number;
  quantity: number;
}

export interface SizeType {
  id: string;
  categoryId: string;
  category: Category;
  name: string;
  slug: string;
  created_at: Date;
  updated_at: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: Date;
  updated_at: Date;
}

export interface Color extends Omit<SizeType, "id"> {}

export interface ValueType {
  id: string;
  name: string;
  slug: string;
  created_at: Date;
  updated_at: Date;
}

export interface VariationImages {
  id: string;
  product_variationId: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface ProductVariationSizes {
  id: string;
  product_variationId: string;
  sizeId: string;
  size: ValueType;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

export interface Variations {
  id: string;
  productId: string;
  colorId: string;
  // color: ValueType;
  sku: string;
  unit_price: any;
  discount: any;
  actual_price: any;
  ProductVariationImage: VariationImages[];
  ProductVariationSize: ProductVariationSizes[];
  created_at: Date;
  updated_at: Date;
}

export interface ProductType {
  id: string;
  category: ValueType;
  categoryId: string;
  brand: ValueType;
  brandId: string;
  name: string;
  slug: string;
  description: string;
  is_post: boolean;
  is_feature: boolean;
  ProductVariation: Variations[];
  _count: {
    ProductVariation: number;
  };
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface Cart {
  id: string;
  userId: string;
  productId: string;
  product_variationId: string;
  product_variation_sizeId: string;
  quantity: number;
  status: string;
  is_selected: boolean;
  total_amount: number;
  product: CartProduct;
  productVariation: CartProductVariation;
  productVariationSize: CartProductVariationSizes;
}

export interface CartProduct {
  id: string;
  category: ValueType;
  brand: ValueType;
  name: string;
  slug: string;
  description: string;
}

export interface CartProductVariation {
  id: string;
  color: Color;
  sku: string;
  unit_price: number;
  discount: number;
  actual_price: number;
  ProductVariationImage: VariationImages[];
}

export interface CartProductVariationSizes {
  slug: string;
  quantity: number;
  size: SizeType;
}
