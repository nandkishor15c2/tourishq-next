import { BlurGlassHeader } from '@/components/BlurGlassHeader';
import { HeroSection } from '@/components/HeroSection';
import { SideTitleCarousel } from '@/components/SideTitleCarousel';
import { DestinationSideTitle } from '@/components/DestinationSideTitle';

export default function Home() {
  return (
    <>
      <BlurGlassHeader />
      <main>
        <HeroSection />
        <SideTitleCarousel />
        <DestinationSideTitle />
      </main>
    </>
  );
}