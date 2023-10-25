"use client";

import React from "react";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { AvatarProps } from "@radix-ui/react-avatar";
import { User } from "next-auth";
import Image from "next/image";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "image" | "name">;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, ...props }) => {
  return (
    <Avatar {...props}>
      {user.image ? (
        <div className="relative aspect-square h-full w-full">
          <Image
            fill
            src={user.image}
            alt={"User Image"}
            referrerPolicy="no-referrer"
            sizes="auto"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.name}</span>
          <Image
            src="/images/user.jpg"
            className="h-4 w-4"
            alt={"User Image"}
            width={16}
            height={16}
          />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
