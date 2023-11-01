"use client";

import Link from "next/link";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Product } from "@prisma/client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { FormatDateTime } from "@/app/lib/format";
import ProductAction from "./action";
import { ProductType } from "@/types";
import { Checkbox } from "@/app/components/ui/checkbox";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ColumnsProps {
  label: string;
  value: keyof ProductType;
  isSort: boolean;
  className?: string;
}

interface ProductTableProps {
  columns: ColumnsProps[];
  searchParams: {
    orderBy: keyof Product;
    sort: "desc" | "asc";
  };
  products: ProductType[];
}

const ProductTable = ({
  columns,
  searchParams,
  products,
}: ProductTableProps) => {
  const router = useRouter();

  const handlePostChange = async (product: ProductType) => {
    try {
      const { data } = await axios.post(`/api/products/${product.id}/post`, {
        is_post: !product.is_post,
      });

      toast.success(data.message);
      router.refresh();
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.value} className={column.className}>
                {column.isSort ? (
                  <Link
                    href={{
                      query: {
                        ...searchParams,
                        orderBy: column.value,
                        sort: searchParams.sort === "desc" ? "asc" : "desc",
                      },
                    }}
                  >
                    {column.label}
                    {column.value === searchParams.orderBy &&
                      (searchParams.sort === "desc" ? (
                        <ArrowUp className="inline h-4" />
                      ) : (
                        <ArrowDown className="inline h-4" />
                      ))}
                  </Link>
                ) : (
                  column.label
                )}
              </TableHead>
            ))}
            <TableHead className="w-1/12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="w-full text-center">
                No products found.
              </TableCell>
            </TableRow>
          )}

          {products.map((product: ProductType) => (
            <TableRow key={product.id}>
              <TableCell className="whitespace-nowrap">
                {product.name}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {product.category.name}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {product.brand.name}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <Checkbox
                  checked={product.is_post}
                  onCheckedChange={(value) => {
                    handlePostChange(product);
                  }}
                  className="form-checkbox h-4 w-4"
                />
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {Number(product._count.ProductVariation)}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {FormatDateTime(product.created_at.toString())}
              </TableCell>
              <TableCell>
                <ProductAction product={product} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ProductTable;
