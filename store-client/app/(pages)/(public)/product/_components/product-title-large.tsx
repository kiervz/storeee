import { FormatCurrency } from "@/app/lib/format";
import { ProductType, Variations } from "@/types";

interface ProductTitleLargeProps {
  product: ProductType;
  currentVariation: Variations;
}

const ProductTitleLarge: React.FC<ProductTitleLargeProps> = ({
  product,
  currentVariation,
}) => {
  return (
    <>
      <p className="text-2xl">{product.name}</p>
      <p className="text-base mb-4">{`${product.category.name}'s Shoes`}</p>
      <p className="text-base">
        {FormatCurrency(
          Number(currentVariation.unit_price),
          "₱",
          Number(currentVariation.discount)
        )}
        {Number(currentVariation.discount) > 0 && (
          <>
            <span className="ml-2 line-through text-gray-500">
              {FormatCurrency(Number(currentVariation.unit_price))}
            </span>
            <span className="ml-2 text-green-700">
              {Number(currentVariation.discount)}% off
            </span>
          </>
        )}
      </p>
    </>
  );
};

export default ProductTitleLarge;
