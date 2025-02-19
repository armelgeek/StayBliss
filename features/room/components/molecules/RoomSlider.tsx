import Slider from '@/shared/components/atoms/Slider';

function RoomSlider({ images }: { images: string[] }) {
  return (
    <div>
      <Slider images={images}>
        {images.map((image, index) => (
          <div key={index} className="border rounded-md h-full bg-muted/50 flex items-center justify-center md:h-[15rem]">
            <p className="font-bold text-2xl text-muted-foreground">
              {index + 1}
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default RoomSlider;
