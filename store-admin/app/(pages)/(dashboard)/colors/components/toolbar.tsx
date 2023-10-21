"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { ModalColor } from "./modal-color";
import { Button } from "@/app/components/ui/button";

const ToolBar = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <>
      {openModal && (
        <ModalColor isOpen={openModal} onClose={() => setOpenModal(false)} />
      )}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Button onClick={() => setOpenModal(true)} className="ml-auto">
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
    </>
  );
};

export default ToolBar;
