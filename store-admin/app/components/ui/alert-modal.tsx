"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/app/components/ui/modal";
import { Button } from "@/app/components/ui/button";

interface AlertModalProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  btnVariant?:
    | "destructive"
    | "link"
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  title = "Are you sure?",
  description = "This action cannot be undone.",
  isOpen,
  onClose,
  onConfirm,
  loading,
  btnVariant = "destructive",
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant={btnVariant} onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  );
};
