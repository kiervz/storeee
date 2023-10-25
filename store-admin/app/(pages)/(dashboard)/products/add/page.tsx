import prisma from "@/app/lib/prismadb";
import AddProductClient from "../components/add-update-product-client";

const AddProductPage = async () => {
  const brands = await prisma.brand.findMany();
  const categories = await prisma.category.findMany();
  const colors = await prisma.color.findMany();
  const sizes = await prisma.size.findMany({
    include: {
      category: true,
    },
  });

  return (
    <AddProductClient
      brands={brands}
      categories={categories}
      colors={colors}
      sizes={sizes}
      productCategorySizes={[]}
    />
  );
};

export default AddProductPage;
