import RoomContainer from "@/features/room/components/molecules/RoomContainer";
import { Suspense } from "react";

function RoomDetails({ params }: { params: { room_slug: string } }) {
  console.log(params);
  return (
    <section className="container">
       <Suspense
        fallback={
          <div className="global-loading">
            
          </div>
        }
      >
          <RoomContainer   params={params} />
      </Suspense>
    
    </section>
  );
}

export default RoomDetails;
