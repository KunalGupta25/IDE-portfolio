"use client";

import { ClientBootWrapper } from "@/components/ClientBootWrapper";
import { HomeContent } from "@/components/HomeContent";
import { OrbitingLogos } from "@/components/Background/OrbitingLogos";
import { useIDEWindow } from "@/contexts/IDEWindowContext";

export default function Home() {
  return (
    <div className="relative flex min-h-full w-full flex-col items-center text-gray-300">
      <ClientBootWrapper>
        <HomePageContent />
      </ClientBootWrapper>
    </div>
  );
}

function HomePageContent() {
  const { windowSize } = useIDEWindow();
  const isLargeWindow = windowSize.width >= 1400;

  return (
    <div className="relative w-full flex items-center justify-center py-8 px-4 min-h-full">
      <div 
        className={`relative w-full max-w-[1800px] flex items-center ${
          isLargeWindow ? 'flex-row justify-center gap-12' : 'flex-col justify-center gap-12'
        }`}
      >
        <div className={`flex-shrink-0 ${isLargeWindow ? 'flex-1 max-w-2xl' : 'w-full max-w-4xl'}`}>
          <HomeContent />
        </div>
        <div className={`flex-shrink-0 flex items-center justify-center ${
          isLargeWindow ? 'flex-1 max-w-lg' : 'w-full max-w-md'
        }`}>
          <OrbitingLogosPositioned />
        </div>
      </div>
    </div>
  );
}

function OrbitingLogosPositioned() {
  return (
    <div className="ide-responsive-logos">
      <OrbitingLogos />
    </div>
  );
}
