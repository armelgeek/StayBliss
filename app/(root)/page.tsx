import type { Metadata } from 'next';
import HeroSection from '@/features/home/components/atoms/HeroSection';
import About from '@/features/home/components/atoms/About';
import Rooms from '@/features/room/components/molecules/Rooms';
import Gallery from '@/features/home/components/atoms/Gallery';
import Blog from '@/features/blog/components/molecules/Blog';

export const metadata: Metadata = {
  title: 'StayBliss',
  description: "Votre havre de confort et d’élégance",
};

export default function Home() {
  return (
    <>
      <HeroSection/>
      <About />
      <Rooms />
      <Gallery />
      <Blog />
    </>
  );
}
