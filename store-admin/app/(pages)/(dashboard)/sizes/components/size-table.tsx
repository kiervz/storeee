import Link from "next/link";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Category, Size } from "@prisma/client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { FormatDateTime } from "@/app/lib/format";
import SizeAction from "./action";
import { SizeType } from "@/types";

interface ColumnsProps {
  label: string;
  value: keyof Category | keyof Size;
  isSort: boolean;
  className?: string;
}

interface SizeTableProps {
  columns: ColumnsProps[];
  searchParams: {
    orderBy: keyof Category | keyof Size;
    sort: "desc" | "asc";
  };
  sizes: SizeType[];
}

const SizeTable = ({ columns, searchParams, sizes }: SizeTableProps) => {
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
          {sizes.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="w-full text-center">
                No sizes found.
              </TableCell>
            </TableRow>
          )}

          {sizes.map((size: SizeType) => (
            <TableRow key={size.id}>
              <TableCell className="whitespace-nowrap">
                {size.category.name}
              </TableCell>
              <TableCell className="whitespace-nowrap">{size.name}</TableCell>
              <TableCell className="whitespace-nowrap">{size.slug}</TableCell>
              <TableCell className="whitespace-nowrap">
                {FormatDateTime(size.created_at.toString())}
              </TableCell>
              <TableCell>
                <SizeAction size={size} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default SizeTable;
