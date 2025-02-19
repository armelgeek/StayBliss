import Image from "next/image";
import { Card } from "@/components/ui/card";

function RoomCard({ room }:{
  room: {
    id: string
    name: string
    capacity: number
    thumbnail: string
  }
}) {
  return (
    <Card className="relative">
      <Image src={room.thumbnail} alt={room.name} fill className="object-cover w-full h-full" />
      <div className="flex items-center justify-center">
        <h2 className="text-white text-2xl">{room.name}</h2>
      </div>
    </Card>
  );
}

export default RoomCard;
