import React from 'react';
import { STORE_INFO } from '../data/menuData';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showPhone?: boolean;
  className?: string;
  variant?: 'badge' | 'header' | 'minimal';
}

export const WhiskIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Whisk handle */}
    <rect x="52" y="24" width="38" height="10" rx="5" fill="#E87A90" stroke="#4A1E4B" strokeWidth="2.5" />
    <circle cx="85" cy="29" r="2.5" fill="#FAF6FB" />
    {/* Whisk cap */}
    <rect x="47" y="22" width="6" height="14" rx="2" fill="#D89EE8" stroke="#4A1E4B" strokeWidth="2" />
    {/* Whisk wires loops */}
    <ellipse cx="28" cy="29" rx="22" ry="16" stroke="#4A1E4B" strokeWidth="2.5" fill="none" />
    <ellipse cx="28" cy="29" rx="16" ry="11" stroke="#4A1E4B" strokeWidth="2" fill="none" />
    <ellipse cx="28" cy="29" rx="10" ry="6" stroke="#4A1E4B" strokeWidth="1.8" fill="none" />
    <line x1="6" y1="29" x2="48" y2="29" stroke="#4A1E4B" strokeWidth="2" />
  </svg>
);

export const ScallopBadgeLogo: React.FC<{ className?: string; showPhone?: boolean; src?: string }> = ({
  className = '',
  src = STORE_INFO.logoUrl,
}) => {
  return (
    <div className={`relative inline-flex flex-col items-center justify-center p-3 text-center select-none ${className}`}>
      {/* Soft outer glow */}
      <div className="absolute inset-0 rounded-full bg-[#EAD6EE]/60 blur-xl scale-95 pointer-events-none" />

      {/* Scalloped lilac circular frame container */}
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-[#D89EE8] shadow-xl flex items-center justify-center border-4 border-white ring-4 ring-[#EBD6F5] overflow-hidden group hover:ring-[#D89EE8] transition-all duration-300">
        <img
          src={src}
          alt="Confeitaria Deliciê Logo"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-[1.24] group-hover:scale-[1.28] transition-transform duration-500"
        />
      </div>
    </div>
  );
};

export const Logo: React.FC<LogoProps> = ({ size = 'md', variant = 'header', className = '' }) => {
  if (variant === 'badge') {
    return <ScallopBadgeLogo className={className} />;
  }

  const iconSizes = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12 sm:w-13 sm:h-13',
    lg: 'w-14 h-14',
    hero: 'w-16 h-16 sm:w-20 sm:h-20',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl',
    hero: 'text-3xl sm:text-4xl',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Circular Brand Logo Badge with high-clarity rendering */}
      <div
        className={`relative flex-shrink-0 flex items-center justify-center ${iconSizes[size]} rounded-full overflow-hidden border-2 border-white ring-2 ring-[#D8B4E2] shadow-sm bg-[#D89EE8]`}
      >
        <img
          src={STORE_INFO.logoUrl}
          alt="Deliciê Logo"
          referrerPolicy="no-referrer"
          loading="eager"
          decoding="sync"
          className="w-full h-full object-cover object-center transform scale-[1.24] filter contrast-[1.04] brightness-[1.02]"
          style={{ imageRendering: 'auto' }}
        />
      </div>

      <div className="flex flex-col justify-center">
        <span className="font-script text-[#B876CE] text-sm sm:text-base leading-none font-bold">
          Confeitaria
        </span>
        <span
          className={`font-serif font-black tracking-wider text-[#6D2E7B] uppercase leading-tight ${textSizes[size]}`}
        >
          DELICIÊ
        </span>
      </div>
    </div>
  );
};
