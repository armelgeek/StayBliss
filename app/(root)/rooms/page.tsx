import Banner from "@/features/home/components/atoms/Banner";
import FilterSection from "@/features/room/components/molecules/FilterSection";
import RoomsSection from "@/features/room/components/molecules/RoomsSection";
import { Suspense } from "react";

export const metadata = {
  title: "Rooms",
  description: "Discover and book a room at the Hotel Booking App ",
};

async function Rooms({ searchParams }:{
  searchParams: {
    sort: string
    range: string
  }
}) {
  const filter = await searchParams?.sort ?? "default";
  const range = await searchParams?.range ?? "";
  return (
    <>
      <Banner title={"Accomodation Options"} />

      <div className={`container`}>
        <FilterSection filters={{ filter, range }} />

        <Suspense
          key={`${filter}-${range}`}
          fallback={
            <div>
              
            </div>
          }
        >
          <RoomsSection filter={filter} range={range} />
        </Suspense>
      </div>
    </>
  );
}

export default Rooms;
