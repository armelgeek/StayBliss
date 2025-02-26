import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import Link from "next/link";

function RoomItem({ title, imgPath, className, price, link }: { 
  title?: string;
  imgPath?: string; 
  price?: number; 
  link?: string;
  className?: string; 
}) {
  return (
    <div className={cn("flex flex-col rounded-lg overflow-hidden shadow-lg", className)}>
      <div className="h-48 w-full relative">
        <Image 
          src={imgPath ?? "/bg.png"} 
          alt="Room preview" 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority
        />
      </div>
      <div className="flex flex-col p-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <Link href={link ?? "#"} className="text-blue-500 hover:underline">From ${price} / Night</Link>
      </div>
    </div>
  );
}

export default RoomItem;
