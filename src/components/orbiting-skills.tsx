"use client"
import React, { useEffect, useState, memo } from 'react';

// --- Type Definitions ---
type IconType = 'html' | 'css' | 'javascript' | 'react' | 'nextjs' | 'tailwind' | 'typescript' | 'python' | 'salesforce' | 'mongodb' | 'postgresql';

type GlowColor = 'cyan' | 'purple';

interface SkillIconProps {
  type: IconType;
}

interface SkillConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  iconType: IconType;
  phaseShift: number;
  glowColor: GlowColor;
  label: string;
}

interface OrbitingSkillProps {
  config: SkillConfig;
  angle: number;
}

interface GlowingOrbitPathProps {
  radius: number;
  glowColor?: GlowColor;
  animationDelay?: number;
}

// --- Improved SVG Icon Components ---
const iconComponents: Record<IconType, { component: () => React.JSX.Element; color: string }> = {
  html: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#E34F26"/>
      </svg>
    ),
    color: '#E34F26'
  },
  css: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.751L12 19.351l5.379-1.443.744-8.157z" fill="#1572B6"/>
      </svg>
    ),
    color: '#1572B6'
  },
  javascript: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <rect width="24" height="24" fill="#F7DF1E"/>
        <path d="M22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" fill="#323330"/>
      </svg>
    ),
    color: '#F7DF1E'
  },
  react: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <circle cx="12" cy="12" r="2.05" fill="#61DAFB"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)"/>
        </g>
      </svg>
    ),
    color: '#61DAFB'
  },
  tailwind: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" fill="#06B6D4"/>
      </svg>
    ),
    color: '#06B6D4'
  },
  nextjs: {
    component: () => (
      <svg viewBox="0 0 256 256" fill="currentColor" className="w-full h-full">
        <rect width="256" height="256" fill="#242938" rx="60"/>
        <path fill="#fff" d="M121.451 28.054c-.43.039-1.799.176-3.031.273c-28.406 2.561-55.014 17.889-71.867 41.447C37.17 82.873 31.167 97.731 28.9 113.47c-.801 5.494-.899 7.117-.899 14.565c0 7.449.098 9.072.9 14.565c5.434 37.556 32.16 69.111 68.406 80.802c6.491 2.092 13.333 3.519 21.114 4.379c3.031.332 16.129.332 19.16 0c13.431-1.486 24.809-4.809 36.031-10.538c1.72-.879 2.053-1.114 1.818-1.309c-.156-.118-7.488-9.952-16.285-21.838l-15.992-21.603l-20.04-29.658c-11.026-16.305-20.097-29.639-20.176-29.639c-.078-.019-.156 13.158-.195 29.248c-.059 28.172-.078 29.306-.43 29.97c-.508.958-.899 1.349-1.721 1.78c-.625.312-1.173.371-4.125.371h-3.382l-.9-.567a3.65 3.65 0 0 1-1.31-1.427l-.41-.88l.04-39.198l.058-39.218l.606-.763c.313-.41.978-.938 1.447-1.192c.801-.391 1.114-.43 4.496-.43c3.989 0 4.653.156 5.69 1.29c.293.313 11.143 16.657 24.125 36.344a89122 89122 0 0 0 39.452 59.765l15.836 23.989l.802-.528c7.096-4.614 14.604-11.183 20.547-18.026c12.649-14.526 20.802-32.238 23.539-51.124c.801-5.493.899-7.116.899-14.565s-.098-9.071-.899-14.565c-5.435-37.556-32.161-69.11-68.407-80.801c-6.393-2.073-13.196-3.5-20.821-4.36c-1.877-.196-14.8-.41-16.422-.254m40.938 60.489c.938.469 1.701 1.368 1.975 2.306c.156.509.195 11.379.156 35.875l-.059 35.152l-6.197-9.502l-6.217-9.501v-25.552c0-16.52.078-25.807.195-26.257c.313-1.094.997-1.954 1.936-2.463c.801-.41 1.095-.45 4.164-.45c2.894 0 3.402.04 4.047.392"/>
      </svg>
    ),
    color: '#000000'
  },
  typescript: {
    component: () => (
      <svg viewBox="0 0 256 256" fill="currentColor" className="w-full h-full">
        <rect width="256" height="256" fill="#007ACC" rx="60"/>
        <path fill="#fff" d="m56.611 128.849l-.081 10.484h33.32v94.679h23.569v-94.679h33.32v-10.281c0-5.689-.121-10.443-.284-10.565c-.122-.162-20.399-.244-44.983-.203l-44.739.122zm149.956-10.741c6.501 1.626 11.459 4.511 16.01 9.224c2.357 2.52 5.851 7.112 6.136 8.209c.081.325-11.053 7.802-17.798 11.987c-.244.163-1.22-.894-2.317-2.519c-3.291-4.795-6.745-6.868-12.028-7.233c-7.761-.529-12.759 3.535-12.718 10.321c0 1.991.284 3.169 1.097 4.795c1.706 3.535 4.876 5.648 14.832 9.955c18.326 7.884 26.168 13.085 31.045 20.48c5.445 8.249 6.664 21.415 2.966 31.208c-4.063 10.646-14.141 17.879-28.323 20.277c-4.388.772-14.791.65-19.504-.203c-10.281-1.829-20.033-6.908-26.047-13.572c-2.357-2.601-6.949-9.387-6.664-9.875c.121-.162 1.178-.812 2.356-1.503c1.138-.65 5.446-3.129 9.509-5.486l7.355-4.267l1.544 2.276c2.154 3.291 6.867 7.802 9.712 9.305c8.167 4.308 19.383 3.698 24.909-1.259c2.357-2.154 3.332-4.389 3.332-7.68c0-2.967-.366-4.267-1.91-6.502c-1.991-2.844-6.054-5.242-17.595-10.24c-13.206-5.689-18.895-9.224-24.096-14.832c-3.007-3.25-5.852-8.452-7.03-12.8c-.975-3.616-1.219-12.678-.447-16.335c2.722-12.759 12.353-21.658 26.25-24.3c4.511-.853 14.994-.528 19.424.569"/>
      </svg>
    ),
    color: '#007ACC'
  },
  python: {
    component: () => (
      <svg viewBox="0 0 256 256" fill="currentColor" className="w-full h-full">
        <defs>
          <linearGradient id="pythonGrad0" x1="47.22" x2="146.333" y1="46.896" y2="145.02" gradientUnits="userSpaceOnUse">
            <stop stopColor="#387EB8"/>
            <stop offset="1" stopColor="#366994"/>
          </linearGradient>
          <linearGradient id="pythonGrad1" x1="108.056" x2="214.492" y1="109.905" y2="210.522" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFE052"/>
            <stop offset="1" stopColor="#FFC331"/>
          </linearGradient>
        </defs>
        <rect width="256" height="256" fill="#242938" rx="60"/>
        <path fill="url(#pythonGrad0)" d="M127.279 29c-50.772 0-47.602 22.018-47.602 22.018l.057 22.81h48.451v6.85H60.489S28 76.992 28 128.221s28.357 49.414 28.357 49.414h16.924v-23.773s-.912-28.357 27.905-28.357h48.054s26.999.436 26.999-26.094V55.546S180.338 29 127.279 29m-26.716 15.339a8.71 8.71 0 0 1 8.717 8.717a8.71 8.71 0 0 1-8.717 8.716a8.71 8.71 0 0 1-8.716-8.716a8.71 8.71 0 0 1 8.716-8.717"/>
        <path fill="url(#pythonGrad1)" d="M128.721 227.958c50.772 0 47.602-22.017 47.602-22.017l-.057-22.811h-48.451v-6.849h67.696S228 179.966 228 128.736s-28.357-49.413-28.357-49.413h-16.924v23.773s.912 28.357-27.905 28.357H106.76s-27-.437-27 26.093v43.866s-4.099 26.546 48.961 26.546m26.716-15.339a8.71 8.71 0 0 1-8.717-8.716a8.71 8.71 0 0 1 8.717-8.717a8.71 8.71 0 0 1 8.717 8.717a8.71 8.71 0 0 1-8.717 8.716"/>
      </svg>
    ),
    color: '#387EB8'
  },
  salesforce: {
    component: () => (
      <svg viewBox="0 0 256 180" fill="currentColor" className="w-full h-full">
        <path fill="#00A1E0" d="M106.553 19.651c8.248-8.594 19.731-13.924 32.43-13.924c16.883 0 31.612 9.414 39.455 23.389a54.5 54.5 0 0 1 22.3-4.74c30.449 0 55.134 24.9 55.134 55.615c0 30.719-24.685 55.62-55.134 55.62a54.7 54.7 0 0 1-10.86-1.083c-6.908 12.321-20.07 20.645-35.178 20.645a40.1 40.1 0 0 1-17.632-4.058c-7.002 16.47-23.316 28.019-42.33 28.019c-19.8 0-36.674-12.529-43.152-30.1c-2.83.602-5.763.915-8.772.915c-23.574 0-42.686-19.308-42.686-43.13a43.2 43.2 0 0 1 21.345-37.36a49.4 49.4 0 0 1-4.088-19.727C17.385 22.336 39.626.128 67.06.128c16.106 0 30.42 7.658 39.494 19.523"/>
      </svg>
    ),
    color: '#00A1E0'
  },
  mongodb: {
    component: () => (
      <svg viewBox="0 0 256 256" fill="currentColor" className="w-full h-full">
        <rect width="256" height="256" fill="#023430" rx="60"/>
        <path fill="#10AA50" d="M171.173 107.591c-10.537-46.481-32.497-58.855-38.099-67.602A99 99 0 0 1 126.949 28c-.296 4.13-.84 6.73-4.35 9.862c-7.047 6.283-36.977 30.673-39.496 83.486c-2.347 49.242 36.2 79.605 41.292 82.744c3.916 1.927 8.685.041 11.012-1.728c18.581-12.752 43.969-46.75 35.786-94.773"/>
        <path fill="#B8C4C2" d="M128.545 177.871c-.97 12.188-1.665 19.27-4.129 26.235c0 0 1.617 11.603 2.753 23.894h4.019a224 224 0 0 1 4.384-25.732c-5.203-2.56-6.827-13.702-7.027-24.397"/>
        <path fill="#12924F" d="M135.565 202.275c-5.258-2.429-6.779-13.806-7.013-24.404a500 500 0 0 0 1.136-52.545c-.276-9.194.13-85.158-2.265-96.28a92 92 0 0 0 5.651 10.936c5.602 8.754 27.569 21.128 38.099 67.609c8.203 47.941-17.047 81.849-35.608 94.684"/>
      </svg>
    ),
    color: '#10AA50'
  },
  postgresql: {
    component: () => (
      <svg viewBox="0 0 256 256" fill="currentColor" className="w-full h-full">
        <rect width="256" height="256" fill="#242938" rx="60"/>
        <path fill="#336791" d="M203.48 148.688c-20.32 4.19-21.796-2.693-21.796-2.693c21.466-31.852 30.445-72.282 22.696-82.175c-21.121-27-57.691-14.224-58.303-13.893l-.197.035a72.5 72.5 0 0 0-13.563-1.414c-9.197-.14-16.172 2.412-21.473 6.427c0 0-65.236-26.873-62.199 33.8c.647 12.909 18.493 97.734 39.797 72.07c7.847-9.436 15.37-17.361 15.37-17.361c3.727 2.482 8.206 3.748 12.896 3.291l.365-.309a14.2 14.2 0 0 0 .148 3.642c-5.484 6.131-3.867 7.207-14.836 9.464c-11.095 2.285-4.57 6.356-.323 7.425c5.161 1.294 17.1 3.122 25.172-8.17l-.324 1.286c2.152 1.723 3.656 11.201 3.403 19.793c-.253 8.593-.422 14.485 1.266 19.097s3.375 14.977 17.789 11.953c12.045-2.58 18.281-9.281 19.16-20.432c.619-7.932 2.011-6.765 2.11-13.852l1.125-3.361c1.286-10.758.21-14.224 7.628-12.607l1.807.162c5.464.246 12.615-.879 16.805-2.827c9.035-4.19 14.393-11.194 5.484-9.351z"/>
      </svg>
    ),
    color: '#336791'
  },
  huggingface: {
    component: () => (
      <svg viewBox="0 0 256 256" fill="currentColor" className="w-full h-full">
        <rect width="256" height="256" fill="#FFD21E" rx="60"/>
        <text x="50%" y="55%" fontSize="160" textAnchor="middle" dominantBaseline="middle">🤗</text>
      </svg>
    ),
    color: '#FFD21E'
  }
};

// --- Memoized Icon Component ---
const SkillIcon = memo(({ type }: SkillIconProps) => {
  const IconComponent = iconComponents[type]?.component;
  return IconComponent ? <IconComponent /> : null;
});
SkillIcon.displayName = 'SkillIcon';

// --- Configuration for the Orbiting Skills ---
const skillsConfig: SkillConfig[] = [
  // Inner Orbit (cyan)
  { 
    id: 'html',
    orbitRadius: 100, 
    size: 40, 
    speed: 1, 
    iconType: 'html', 
    phaseShift: 0, 
    glowColor: 'cyan',
    label: 'HTML5'
  },
  { 
    id: 'css',
    orbitRadius: 100, 
    size: 45, 
    speed: 1, 
    iconType: 'css', 
    phaseShift: (2 * Math.PI) / 3, 
    glowColor: 'cyan',
    label: 'CSS3'
  },
  { 
    id: 'javascript',
    orbitRadius: 100, 
    size: 40, 
    speed: 1, 
    iconType: 'javascript', 
    phaseShift: (4 * Math.PI) / 3, 
    glowColor: 'cyan',
    label: 'JavaScript'
  },
  // Middle Orbit (purple)
  { 
    id: 'react',
    orbitRadius: 140, 
    size: 45, 
    speed: -0.7, 
    iconType: 'react', 
    phaseShift: 0, 
    glowColor: 'purple',
    label: 'React'
  },
  { 
    id: 'nextjs',
    orbitRadius: 140, 
    size: 45, 
    speed: -0.7, 
    iconType: 'nextjs', 
    phaseShift: (2 * Math.PI) / 4, 
    glowColor: 'purple',
    label: 'Next.js'
  },
  { 
    id: 'typescript',
    orbitRadius: 140, 
    size: 45, 
    speed: -0.7, 
    iconType: 'typescript', 
    phaseShift: (4 * Math.PI) / 4, 
    glowColor: 'purple',
    label: 'TypeScript'
  },
  { 
    id: 'tailwind',
    orbitRadius: 140, 
    size: 40, 
    speed: -0.7, 
    iconType: 'tailwind', 
    phaseShift: (6 * Math.PI) / 4, 
    glowColor: 'purple',
    label: 'Tailwind CSS'
  },
  // Outer Orbit (purple)
  { 
    id: 'python',
    orbitRadius: 180, 
    size: 45, 
    speed: 0.5, 
    iconType: 'python', 
    phaseShift: 0, 
    glowColor: 'purple',
    label: 'Python'
  },
  { 
    id: 'salesforce',
    orbitRadius: 180, 
    size: 45, 
    speed: 0.5, 
    iconType: 'salesforce', 
    phaseShift: (2 * Math.PI) / 4, 
    glowColor: 'purple',
    label: 'Salesforce'
  },
  { 
    id: 'mongodb',
    orbitRadius: 180, 
    size: 45, 
    speed: 0.5, 
    iconType: 'mongodb', 
    phaseShift: (4 * Math.PI) / 4, 
    glowColor: 'purple',
    label: 'MongoDB'
  },
  { 
    id: 'postgresql',
    orbitRadius: 180, 
    size: 45, 
    speed: 0.5, 
    iconType: 'postgresql', 
    phaseShift: (6 * Math.PI) / 4, 
    glowColor: 'purple',
    label: 'PostgreSQL'
  },
];

// --- Memoized Orbiting Skill Component ---
const OrbitingSkill = memo(({ config, angle }: OrbitingSkillProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { orbitRadius, size, iconType, label } = config;

  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 20 : 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative w-full h-full p-2 bg-gray-800/90 backdrop-blur-sm
          rounded-full flex items-center justify-center
          transition-all duration-300 cursor-pointer
          ${isHovered ? 'scale-125 shadow-2xl' : 'shadow-lg hover:shadow-xl'}
        `}
        style={{
          boxShadow: isHovered
            ? `0 0 30px ${iconComponents[iconType]?.color}40, 0 0 60px ${iconComponents[iconType]?.color}20`
            : undefined
        }}
      >
        <SkillIcon type={iconType} />
        {isHovered && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900/95 backdrop-blur-sm rounded text-xs text-white whitespace-nowrap pointer-events-none">
            {label}
          </div>
        )}
      </div>
    </div>
  );
});
OrbitingSkill.displayName = 'OrbitingSkill';

// --- Optimized Orbit Path Component ---
const GlowingOrbitPath = memo(({ radius, glowColor = 'cyan', animationDelay = 0 }: GlowingOrbitPathProps) => {
  const glowColors = {
    cyan: {
      primary: 'rgba(6, 182, 212, 0.4)',
      secondary: 'rgba(6, 182, 212, 0.2)',
      border: 'rgba(6, 182, 212, 0.3)'
    },
    purple: {
      primary: 'rgba(147, 51, 234, 0.4)',
      secondary: 'rgba(147, 51, 234, 0.2)',
      border: 'rgba(147, 51, 234, 0.3)'
    }
  };

  const colors = glowColors[glowColor] || glowColors.cyan;

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        animationDelay: `${animationDelay}s`,
      }}
    >
      {/* Glowing background */}
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          background: `radial-gradient(circle, transparent 30%, ${colors.secondary} 70%, ${colors.primary} 100%)`,
          boxShadow: `0 0 60px ${colors.primary}, inset 0 0 60px ${colors.secondary}`,
          animation: 'pulse 4s ease-in-out infinite',
          animationDelay: `${animationDelay}s`,
        }}
      />

      {/* Static ring for depth */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `1px solid ${colors.border}`,
          boxShadow: `inset 0 0 20px ${colors.secondary}`,
        }}
      />
    </div>
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

// --- Main App Component ---
export default function OrbitingSkills({ skills = skillsConfig }: { skills?: SkillConfig[] }) {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setTime(prevTime => prevTime + deltaTime);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const orbitConfigs: Array<{ radius: number; glowColor: GlowColor; delay: number }> = [
    { radius: 100, glowColor: 'cyan', delay: 0 },
    { radius: 140, glowColor: 'purple', delay: 0.75 },
    { radius: 180, glowColor: 'purple', delay: 1.5 }
  ];

  // Map DB skills to their orbit radius based on orbitLevel
  const mappedSkills = skills.map((skill: any, index) => {
    let radius = 100;
    let speed = 1;
    let glowColor: GlowColor = 'cyan';
    
    if (skill.orbitLevel === 2) {
      radius = 140;
      speed = -0.7;
      glowColor = 'purple';
    } else if (skill.orbitLevel === 3) {
      radius = 180;
      speed = 0.5;
      glowColor = 'purple';
    }

    // Default sizing based on existing logic
    const size = skill.iconType === 'css' || skill.iconType === 'react' || skill.iconType === 'nextjs' || skill.iconType === 'typescript' || skill.iconType === 'python' || skill.iconType === 'salesforce' || skill.iconType === 'mongodb' || skill.iconType === 'postgresql' ? 45 : 40;
    
    return {
      id: skill.id || skill.label,
      orbitRadius: radius,
      size,
      speed,
      iconType: (skill.iconType || 'html') as IconType,
      phaseShift: (index * (Math.PI * 2)) / Math.max(1, skills.filter((s: any) => s.orbitLevel === skill.orbitLevel).length),
      glowColor,
      label: skill.label
    };
  });

  return (
    <main className="w-full h-full flex items-center justify-center overflow-hidden relative bg-gray-800">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-0">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #374151 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, #4B5563 0%, transparent 50%)`,
          }}
        />
      </div>

      <div 
        className="relative w-full h-full flex items-center justify-center"
        style={{
          aspectRatio: '1 / 1',
          maxWidth: '100%',
          maxHeight: '100%',
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        
        {/* Central "Code" Icon with enhanced glow */}
        <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center z-10 relative shadow-2xl">
          <div className="absolute inset-0 rounded-full bg-cyan-500/30 blur-xl animate-pulse"></div>
          <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#9333EA" />
                </linearGradient>
              </defs>
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
          </div>
        </div>

        {/* Render glowing orbit paths */}
        {orbitConfigs.map((config) => (
          <GlowingOrbitPath
            key={`path-${config.radius}`}
            radius={config.radius}
            glowColor={config.glowColor}
            animationDelay={config.delay}
          />
        ))}

        {/* Render orbiting skill icons */}
        {mappedSkills.map((config) => {
          const angle = time * config.speed + (config.phaseShift || 0);
          return (
            <OrbitingSkill
              key={config.id}
              config={config}
              angle={angle}
            />
          );
        })}
      </div>
    </main>
  );
}