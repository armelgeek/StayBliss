import Features from '@/features/booking/components/molecules/Features';
import RoomSlider from '@/features/room/components/molecules/RoomSlider';
import RoomBookingForm from '@/features/booking/components/molecules/RoomBookingForm';
import RoomDescription from '@/features/room/components/molecules/RoomDescription';
import Facilities from '@/features/booking/components/molecules/Facilities';
import BookingPolicy from '@/features/booking/components/molecules/BookingPolicy';

function RoomDetails({ params }: { params: { room_slug: string } }) {
  console.log(params);
  return (
    <section className="container">
      <h2 >King Room</h2>
      <Features />
      <RoomSlider />
      <RoomBookingForm />
      <RoomDescription />
      <Facilities />
      <BookingPolicy />
    </section>
  );
}

export default RoomDetails;
