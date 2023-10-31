"use client";

import { User } from "@/types";

interface PurchaseByProps {
  user: User;
}

const PurchaseBy = ({ user }: PurchaseByProps) => {
  return (
    <div>
      <p className="text-sm md:text-lg font-semibold">Purchase By</p>
      <p className="mt-4 text-sm font-semibold">{user.name}</p>
      <p className="text-sm">{user.email}</p>
    </div>
  );
};

export default PurchaseBy;
