import type { Metadata } from 'next';
import HeroSection from '@/features/home/components/atoms/HeroSection';
import About from '@/features/home/components/atoms/About';
import Rooms from '@/features/room/components/molecules/Rooms';
import Gallery from '@/features/home/components/atoms/Gallery';
import Blog from '@/features/blog/components/molecules/Blog';
import Contact from '@/features/contact/components/molecules/Contact';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'StayBliss',
  description: "Votre havre de confort et d’élégance",
};

export default function Home() {
   async function bookingSearchAction(formatedRange: string) {
    "use server";
    redirect(`/rooms?range=${formatedRange}`);
  }
  return (
    <>
      <HeroSection bookingSearchAction={bookingSearchAction} />
      <About />
      <Suspense
        fallback={
          <div className="global-loading">
          
          </div>
        }
      >
        <Rooms />
        <Gallery />
      </Suspense>
      <Blog />
      <Contact />
    </>
  );
}
