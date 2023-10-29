interface ProductDescriptionProps {
  description: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  description,
}) => {
  return (
    <>
      <div>{description}</div>
      <ul className="list-disc left-auto ml-10">
        <li>Lorem ipsum</li>
        <li>dolor sit amet</li>
        <li>consectetur</li>
        <li>Lorem ipsum</li>
        <li>dolor sit amet</li>
        <li>consectetur</li>
        <li>Lorem ipsum</li>
        <li>dolor sit amet</li>
        <li>consectetur</li>
      </ul>
    </>
  );
};

export default ProductDescription;
