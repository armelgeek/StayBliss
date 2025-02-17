"use client";
import BookingForm from '@/features/booking/components/molecules/BookingForm';
import Slider from '@/shared/components/atoms/Slider';
const images = ["/bg.png", "/bg.png", "/bg.png", "/bg.png"];

function HeroSection() {
  return (
    <Slider images={images}>
      <div className="flex flex-row w-full justify-center px-8">
        <div>
          <BookingForm />
        </div>
      </div>
    </Slider>
  );
}

export default HeroSection;
