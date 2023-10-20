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
  size: Omit<Size, "id">;
  sku: string;
  unit_price: number;
  discount: number;
  quantity: number;
}

export interface Size {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  created_at: Date;
  updated_at: Date;
}

export interface Color extends Omit<Size, "id"> {}
