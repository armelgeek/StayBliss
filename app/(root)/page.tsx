import type { Metadata } from 'next';
import HeroSection from '@/features/home/components/atoms/HeroSection';

export const metadata: Metadata = {
  title: 'StayBliss',
  description: "Votre havre de confort et d’élégance",
};

export default function Home() {
  return (
    <>
      <HeroSection/>
    </>
  );
}
