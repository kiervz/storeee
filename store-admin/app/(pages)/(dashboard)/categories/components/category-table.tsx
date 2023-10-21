import Link from "next/link";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Category } from "@prisma/client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { FormatDateTime } from "@/app/lib/format";
import CategoryAction from "./action";

interface ColumnsProps {
  label: string;
  value: keyof Category;
  isSort: boolean;
  className?: string;
}

interface CategoryTableProps {
  columns: ColumnsProps[];
  searchParams: {
    orderBy: keyof Category;
    sort: "desc" | "asc";
  };
  categories: Category[];
}

const CategoryTable = ({
  columns,
  searchParams,
  categories,
}: CategoryTableProps) => {
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
          {categories.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="w-full text-center">
                No categories found.
              </TableCell>
            </TableRow>
          )}

          {categories.map((category: Category) => (
            <TableRow key={category.id}>
              <TableCell className="whitespace-nowrap">
                {category.name}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {category.slug}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {FormatDateTime(category.created_at.toString())}
              </TableCell>
              <TableCell>
                <CategoryAction category={category} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default CategoryTable;
