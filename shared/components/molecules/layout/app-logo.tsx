"use client";

import { cn } from "@/shared/lib/utils";
import { kAppAbbr, kAppName } from "@/core/domain/constants/app.constant";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from 'next/link';

export function AppLogo() {
  return (

    <Link href='/' className="flex items-center gap-3">
      <div className="relative">
        <img src="/logo.png" alt="vector" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex justify-start items-center bg-black bg-opacity-0 ml-2">
         <p className="pl-8 text-white text-2xl pacifico-regular"> {kAppName}</p>
        </div>
      </div>
    </Link>
  );
}
