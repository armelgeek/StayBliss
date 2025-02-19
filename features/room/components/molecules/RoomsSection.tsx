import { filterRoomsByDate } from "@/core/application/use-cases/room/filter-rooms-by-date.use-case";
import { getAllRooms } from "@/core/application/use-cases/room/get-rooms.use-case";
import { isValid } from "date-fns";
import RoomItem from "./RootItem";

async function RoomsSection({ filter, range }:{
  filter: string
  range: string
}) {
  const rooms = await getAllRooms();

  await filterRoomsByDate();

  let filteredRooms = rooms;

  if (range && isValid(new Date(range.split("_")?.at(0))) && isValid(new Date(range.split("_")?.at(1)))) {
    const arrivalDate = range.split("_")?.at(0);
    const departureDate = range.split("_")?.at(1);
    filteredRooms = await filterRoomsByDate(arrivalDate, departureDate);
  }

  switch (filter) {
    case "high-price":
      filteredRooms = filteredRooms.sort((a, b) => b.price - a.price);
      break;
    case "low-price":
      filteredRooms = filteredRooms.sort((a, b) => a.price - b.price);
      break;

    case "min-guests":
      filteredRooms = filteredRooms.sort((a, b) => b.capacity - a.capacity);
      break;

    case "max-guests":
      filteredRooms = filteredRooms.sort((a, b) => a.capacity - b.capacity);
      break;
    default:
      filteredRooms = filteredRooms;
  }

  return (
    <div>
      {filteredRooms.map((item) => (
        <RoomItem key={item.id} id={item.id} title={item.name} price={item.price} imgPath={item.thumbnail} link="#" />
      ))}
    </div>
  );
}

export default RoomsSection;
