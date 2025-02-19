import RoomCard from '@/features/room/components/atoms/RoomCard';
import { getAllRooms } from "@/core/application/use-cases/room/get-rooms.use-case";

async function Rooms() { 
  const rooms = await getAllRooms();
  rooms.length = 6;

  return (
    <section className="bg-[#F7F7F7] py-14">
      <div className="container">
        <h2 className="text-center text-3xl font-bold">Our Rooms</h2>
        <p className="text-center text-lg text-gray-600">
          Lorem Ipsum is available,
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-3">
          {rooms.map((item) => (
            <RoomCard key={item.id} className="p-6" />
          ))}
        </div>
      </div>
    </section>
  );
}
export default Rooms;
