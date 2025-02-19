import { RoomPayload } from "@/core/domain/types/room.type";
import { Bed, DollarSign, Users } from "lucide-react";

function Features({ room }: {
  room: RoomPayload
}) {
  return (
    <ul>
      <li>
        <span>
          <Bed />
        </span>
        <span>Sleeps:</span> {room.sleeps} Adults
      </li>
      <li>
        <span>
          <Users />
        </span>
        <span>Capacity:</span> {room.capacity}
      </li>
      <li>
        <span >
          <DollarSign/>
        </span>
        <span>Price:</span> from ${room.price} / night
      </li>
    </ul>
  );
}

export default Features;
