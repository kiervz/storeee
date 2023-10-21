import Link from "next/link";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Brand } from "@prisma/client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { FormatDateTime } from "@/app/lib/format";
import BrandAction from "./action";

interface ColumnsProps {
  label: string;
  value: keyof Brand;
  isSort: boolean;
  className?: string;
}

interface BrandTableProps {
  columns: ColumnsProps[];
  searchParams: {
    orderBy: keyof Brand;
    sort: "desc" | "asc";
  };
  brands: Brand[];
}

const BrandTable = ({ columns, searchParams, brands }: BrandTableProps) => {
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
          {brands.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="w-full text-center">
                No brands found.
              </TableCell>
            </TableRow>
          )}

          {brands.map((brand: Brand) => (
            <TableRow key={brand.id}>
              <TableCell className="whitespace-nowrap">{brand.name}</TableCell>
              <TableCell className="whitespace-nowrap">{brand.slug}</TableCell>
              <TableCell className="whitespace-nowrap">
                {FormatDateTime(brand.created_at.toString())}
              </TableCell>
              <TableCell>
                <BrandAction brand={brand} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default BrandTable;
