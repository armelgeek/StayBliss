import RoomDescription from "./RoomDescription";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getRoomById } from "@/core/application/use-cases/room/get-room-by-id.use-case";
import { getRoomImages } from "@/core/application/use-cases/room/get-room-images.use-case";
import { bookingSchema } from "@/core/domain/schema/booking.schema";
import Features from "@/features/booking/components/molecules/Features";
import RoomSlider from "./RoomSlider";
import RoomBookingForm from "@/features/booking/components/molecules/RoomBookingForm";
import Facilities from "@/features/booking/components/molecules/Facilities";
import BookingPolicy from "@/features/booking/components/molecules/BookingPolicy";

async function RoomContainer({ params }:{
    params: {
        room_slug: string;
    }
}) {
  console.log(params?.room_slug);
  const room = await getRoomById(params?.room_slug);
  console.log('room', room)
  const room_images = await getRoomImages(params?.room_slug ?? []);
  const images = room_images.map((item) => `${item.image}`);

  if (!room) notFound();


  async function bookingAction(prevState:{
    isBooking: boolean
  }, formData: FormData) {
    "use server";

    prevState = { ...prevState, isBooking: true };
    const start_date = formData.get("start_date");
    const end_date = formData.get("end_date");
    const guests_count = parseInt(formData.get("guests_count"));
    const room_id = formData.get("room_id");

    // FORM VALIDATION
    let isValid = true;
    try {
      bookingSchema.parse({ start_date, end_date, guests_count });
    } catch (err) {
      isValid = false;
      err.errors.forEach((element) => {
        prevState[element?.path[0] ?? "unknown"] = element.message;
      });

      return { ...prevState, isBooking: false };
    } finally {
      prevState = { ...prevState, isBooking: false };
    }

    if (isValid) {
      const reservation_cookies = await cookies();
      reservation_cookies.set("pending_reservation", JSON.stringify({ start_date, end_date, guests_count, room_id }));

      redirect(`/reservations/checkout`);
    }
  }

  return (
    <>
      <h2>{room.name}</h2>
      <Features room={room} />
      <RoomSlider images={images} />
      <RoomBookingForm bookingAction={bookingAction} room={room} />
      <RoomDescription />
      <Facilities />
      <BookingPolicy />
    </>
  );
}

export default RoomContainer;
