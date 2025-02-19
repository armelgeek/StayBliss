import { getAllRooms } from "@/core/application/use-cases/room/get-rooms.use-case";
import Image from "next/image";
async function Gallery() {
  const rooms = await getAllRooms();
  rooms.length = 8;
  return (
    <section className="bg-white py-8">
      <div className="container mx-auto px-6 md:px-12">
        <h3 className="text-3xl md:text-4xl font-bold leading-tight mt-0 mb-4 text-center">
          Gallery
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((item) => (
            <div key={item.id} className="relative">
              <Image
                src={`${item.thumbnail}`}
                alt=""
                fill
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
