import Slider from '@/shared/components/atoms/Slider';
import FilterSection from '@/features/room/components/molecules/FilterSection';
import RoomItem from '@/features/room/components/molecules/RootItem';
function Rooms() {
  return (
    <>
      <Slider images={["/bg.png", "/bg.png", "/bg.png"]} />

      <div>
        <FilterSection />

        <div>
          <RoomItem price="300" imgPath="/bg.png" link="#" />
          <RoomItem price="300" imgPath="/bg.png" link="#" />
          <RoomItem price="300" imgPath="/bg.png" link="#" />
        </div>
      </div>
    </>
  );
}

export default Rooms;
