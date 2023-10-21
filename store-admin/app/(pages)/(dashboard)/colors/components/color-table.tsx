import Link from "next/link";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Color } from "@prisma/client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { FormatDateTime } from "@/app/lib/format";
import ColorAction from "./action";

interface ColumnsProps {
  label: string;
  value: keyof Color;
  isSort: boolean;
  className?: string;
}

interface ColorTableProps {
  columns: ColumnsProps[];
  searchParams: {
    orderBy: keyof Color;
    sort: "desc" | "asc";
  };
  colors: Color[];
}

const ColorTable = ({ columns, searchParams, colors }: ColorTableProps) => {
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
          {colors.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="w-full text-center">
                No colors found.
              </TableCell>
            </TableRow>
          )}

          {colors.map((color: Color) => (
            <TableRow key={color.id}>
              <TableCell className="whitespace-nowrap">{color.name}</TableCell>
              <TableCell className="whitespace-nowrap">{color.slug}</TableCell>
              <TableCell className="whitespace-nowrap">
                <div className="flex justify-normal items-center gap-4">
                  {color.hexValue}
                  <div
                    className="rounded-full h-8 w-8 border"
                    style={{ backgroundColor: color.hexValue }}
                  ></div>
                </div>
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {FormatDateTime(color.created_at.toString())}
              </TableCell>
              <TableCell>
                <ColorAction color={color} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ColorTable;
