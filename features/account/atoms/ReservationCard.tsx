import { Trash2 } from "lucide-react";
import Image from "next/image";

function ReservationCard({ title, guestsCount, date, price, status, thumbnailPath, className }: {
    title?: string
    guestsCount?: number
    date?: string
    price?: string
    status?: string
    thumbnailPath?: string
    className?: string
}) {
  return (
    <article className={`flex flex-col p-4 border border-gray-300 rounded-lg ${className}`}>
      <div className="relative w-full h-56">
        <Image
          src={thumbnailPath ?? "/room.png"}
          alt="Room"
          className="w-full h-full object-cover rounded-t-lg"
          width={32}
          height={32}
        />
      </div>
      <div className="space-y-2 p-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm">{guestsCount} Guests</p>
        <p className="text-sm">{date}</p>
        <p className="text-sm">{status}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-lg">{price}</p>
        <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
          <Trash2/>
        </button>
      </div>
    </article>
  );
}

export default ReservationCard;