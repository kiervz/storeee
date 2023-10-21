"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Category, Size } from "@prisma/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Button } from "@/app/components/ui/button";
import { AlertModal } from "@/app/components/ui/alert-modal";
import { ModalSize } from "./modal-size";

const SizeAction = ({ size }: { size: Size }) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [openSize, setOpenSize] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/sizes/${size.id}`);
      toast.success("Size deleted.");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <>
      {openSize && (
        <ModalSize
          initialData={size}
          isOpen={openSize}
          onClose={() => setOpenSize(false)}
        />
      )}
      {open && (
        <AlertModal
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={onConfirm}
          loading={loading}
        />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setOpenSize(true)}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default SizeAction;
