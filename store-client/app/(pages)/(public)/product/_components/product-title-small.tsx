import { FormatCurrency } from "@/app/lib/format";
import { ProductType, Variations } from "@/types";

interface ProductTitleSmallProps {
  product: ProductType;
  currentVariation: Variations;
}

const ProductTitleSmall: React.FC<ProductTitleSmallProps> = ({
  product,
  currentVariation,
}) => {
  return (
    <>
      <p className="text-lg sm:text-2xl">{product.name}</p>
      <p className="text-base">{`${product.category.name}'s Shoes`}</p>
      <p>
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

export default ProductTitleSmall;
