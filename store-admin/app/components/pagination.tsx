"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";

interface PaginationProps {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageCount = Math.ceil(itemCount / pageSize);

  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());

    router.push("?" + params.toString());
  };

  return (
    <div className="flex items-center gap-2 px-4">
      <p className="text-sm">
        Page {currentPage} of {pageCount}
      </p>
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <ChevronsLeft />
      </Button>
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeft />
      </Button>
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronRight />
      </Button>
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === pageCount}
        onClick={() => changePage(pageCount)}
      >
        <ChevronsRight />
      </Button>
    </div>
  );
};

export default Pagination;
