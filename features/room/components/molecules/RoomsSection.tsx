import { RoomPayload } from "@/core/domain/types/room.type";
import { getAllRooms } from "@/core/application/use-cases/room/get-rooms.use-case";
import RoomItem from "./RootItem";

type Filter = "high-price" | "low-price" | "min-guests" | "max-guests" | "default";
type FilterRoom = {
    name: string;
    slug: string;
    id?: string | undefined;
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
    price: number;
    capacity: number;
    thumbnail: string;
}

async function RoomsSection({ filter = "default" }: { filter: Filter }) {
  const rooms: RoomPayload[] = await getAllRooms();

  const filteredRooms: FilterRoom[] = [...rooms];

  switch (filter) {
    case "high-price":
      filteredRooms.sort((a, b) => b.price - a.price);
      break;
    case "low-price":
      filteredRooms.sort((a, b) => a.price - b.price);
      break;

    case "min-guests":
      filteredRooms.sort((a, b) => b.capacity - a.capacity);
      break;

    case "max-guests":
      filteredRooms.sort((a, b) => a.capacity - b.capacity);
      break;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredRooms.map((item) => (
        <RoomItem
          key={item.id}
          className="shadow-lg rounded-lg p-4"
          title={item.name}
          price={item.price}
          imgPath={item.thumbnail}
          link="#"
        />
      ))}
    </div>
  );
}

export default RoomsSection;