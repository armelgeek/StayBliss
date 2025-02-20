"use client";
import BookingForm from '@/features/booking/components/molecules/BookingForm';
import Slider from '@/shared/components/atoms/Slider';
const images = ["/bg.png", "/bg.png", "/bg.png", "/bg.png"];

function HeroSection({ bookingSearchAction }: { bookingSearchAction: (date: string) => Promise<void> }) {
  return (
    <Slider images={images}>
      <div className="flex flex-row w-full justify-center px-8">
        <div>
          <BookingForm bookingSearchAction={bookingSearchAction} />
        </div>
      </div>
    </Slider>
  );
}

export default HeroSection;
