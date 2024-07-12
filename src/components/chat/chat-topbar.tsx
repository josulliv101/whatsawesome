import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
// import { UserData } from '@/app/data';
import { Info, Phone, Video } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { UserData } from "@/app/data";

interface ChatTopbarProps {
  selectedUser: UserData;
}

export const TopbarIcons = [{ icon: Phone }, { icon: Video }, { icon: Info }];

export default function ChatTopbar({ selectedUser }: ChatTopbarProps) {
  return (
    <div className="w-full min-h-20 flex p-4 justify-between items-center border-b">
      <div className="flex items-center gap-4">
        <Avatar className="flex justify-center items-center w-16 h-16 ">
          <AvatarImage
            src={selectedUser.avatar}
            alt={selectedUser.name}
            width={10}
            height={10}
            className="w-16 h-16 "
          />
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{selectedUser.name}</span>
          <span className="text-sm">
            AI Assistant &mdash; here to help you find new restaurants & dishes
            to try.
          </span>
          <div className="text-xs text-muted-foreground">
            The AI Assistant functionality is currently experimental. Check
            important info.
          </div>
        </div>
      </div>

      {/* <div>
        {TopbarIcons.map((icon, index) => (
          <Link
            key={index}
            href="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
            )}
          >
            <icon.icon size={20} className="text-muted-foreground" />
          </Link>
        ))}
      </div> */}
    </div>
  );
}
