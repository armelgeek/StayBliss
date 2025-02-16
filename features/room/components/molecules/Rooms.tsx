import RoomCard from '@/features/room/components/atoms/RoomCard';

function Rooms() {
  return (
    <section>
      <div className="container">
        <h2 className="text-center">Our Rooms</h2>
        <p className="text-center">Lorem Ipsum is available, but the majority have suffered</p>
        <div>
          {[1, 2, 1, 1, 1, 2].map((_, index: number) => (
            <RoomCard key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
export default Rooms;
