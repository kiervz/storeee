import prisma from "@/app/lib/prismadb";
import AddUpdateProductClient from "../components/add-update-product-client";
import delay from "delay";

const AddProductPage = async () => {
  const brands = await prisma.brand.findMany();
  const categories = await prisma.category.findMany();
  const colors = await prisma.color.findMany();
  const sizes = await prisma.size.findMany({
    include: {
      category: true,
    },
  });

  await delay(4000);
  return (
    <AddUpdateProductClient
      brands={brands}
      categories={categories}
      colors={colors}
      sizes={sizes}
      productCategorySizes={[]}
    />
  );
};

export default AddProductPage;
