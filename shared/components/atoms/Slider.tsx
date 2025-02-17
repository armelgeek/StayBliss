"use client";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";

const Slider = ({ children }: { children: JSX.Element[] }) => {
  const [carouselAPI, setCarouselAPI] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!carouselAPI) return;

    setSelectedIndex(carouselAPI.selectedScrollSnap());
  }, [carouselAPI]);

  const scrollTo = (index: number) => {
    if (!carouselAPI) return;

    carouselAPI.scrollTo(index);
  };

  useEffect(() => {
    if (!carouselAPI) return;

    onSelect();

    setScrollSnaps(carouselAPI.scrollSnapList());

    carouselAPI.on("select", onSelect);
  }, [carouselAPI, onSelect]);

  return (
    <div className="relative w-full pt-3">
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        {children}
      </div>
      <Carousel
        plugins={[Autoplay({ delay: 2500 })]}
        orientation="horizontal"
        style={{
          height: "32rem",
        }}
        opts={{ loop: true, align: "center" }}
        setApi={setCarouselAPI}
      >
        <CarouselContent style={{
          height: "32rem",
        }}>
          {[...Array(6)].map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2">
              <div className="border rounded-md h-full bg-muted/50 flex items-center justify-center md:h-[15rem]">
                <p className="font-bold text-2xl text-muted-foreground">
                  {index + 1}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
     
    </div>
  );
};
export default Slider;