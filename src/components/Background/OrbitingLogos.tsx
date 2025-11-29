"use client";

import React from "react";
import OrbitingSkills from "@/components/orbiting-skills";
import { useIDEWindow } from "@/contexts/IDEWindowContext";

export function OrbitingLogos() {
  const { windowSize } = useIDEWindow();

  // Use IDE window width to determine if we should show large or small version
  const isLargeWindow = windowSize.width >= 1400;
  
  // Calculate size based on available space
  // For large windows: use up to 500px but ensure it fits in the flex container
  // For small windows: use responsive sizing but cap at 450px
  const containerSize = isLargeWindow 
    ? Math.min(500, Math.max(400, (windowSize.width * 0.4)))
    : Math.min(450, Math.max(350, windowSize.width - 100));

  return (
    <div 
      className="relative flex items-center justify-center"
      style={{
        height: `${containerSize}px`,
        width: `${containerSize}px`,
        maxWidth: '100%',
        maxHeight: '100%',
        minWidth: '350px',
        minHeight: '350px',
      }}
    >
      <OrbitingSkills />
    </div>
  );
}
