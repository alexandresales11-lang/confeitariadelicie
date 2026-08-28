import React from 'react';

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

export const ScallopBadgeLogo: React.FC<{ className?: string; showPhone?: boolean }> = ({
  className = '',
  showPhone = true,
}) => {
  return (
    <div className={`relative inline-flex flex-col items-center justify-center p-6 text-center select-none ${className}`}>
      {/* Scalloped lilac circle background */}
      <div className="relative w-44 h-44 rounded-full bg-gradient-to-br from-[#D89EE8] via-[#C485DA] to-[#AF6CD2] shadow-lg flex flex-col items-center justify-center border-4 border-white/90 ring-4 ring-[#EBD6F5]">
        {/* Floating cute sprinkle hearts and accents */}
        <div className="absolute top-3 text-[#E87A90] text-xs font-bold animate-pulse">♥ ♥</div>
        <div className="absolute left-4 top-8 text-[#56D4D8] text-xs font-bold rotate-[-15deg]">✦</div>
        <div className="absolute right-4 top-8 text-[#56D4D8] text-xs font-bold rotate-[15deg]">✦</div>

        {/* Brand Name */}
        <span className="text-white text-2xl font-black tracking-tight font-serif drop-shadow-sm mt-1">
          Deliciê
        </span>
        <span className="text-[#FDF2FF] font-script text-xl tracking-wider -mt-1 font-bold">
          Confeitaria
        </span>

        {/* Decorative flourishes */}
        <div className="flex items-center gap-1.5 my-1">
          <span className="text-[#4CE0E5] text-xs font-serif">~</span>
          <span className="text-[#FF4081] text-xs">♥</span>
          <span className="text-[#4CE0E5] text-xs font-serif">~</span>
        </div>

        {showPhone && (
          <span className="text-[11px] font-medium text-white/90 tracking-wide font-sans bg-[#8C3E9C]/40 px-2.5 py-0.5 rounded-full mt-0.5">
            (74) 99946-0882
          </span>
        )}
      </div>
    </div>
  );
};

export const Logo: React.FC<LogoProps> = ({ size = 'md', variant = 'header', className = '' }) => {
  if (variant === 'badge') {
    return <ScallopBadgeLogo className={className} />;
  }

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    hero: 'text-3xl sm:text-4xl',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Whisk Icon Iconography */}
      <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#EAD6EE] to-[#FCE7F0] border border-[#D8B4E2]/60 shadow-sm p-1">
        <WhiskIcon className="w-8 h-8 transform -rotate-12" />
      </div>

      <div className="flex flex-col">
        <span className="font-script text-[#B876CE] text-sm leading-none font-bold">
          Confeitaria
        </span>
        <span
          className={`font-serif font-black tracking-wider text-[#6D2E7B] uppercase leading-tight ${sizeClasses[size]}`}
        >
          DELICIÊ
        </span>
      </div>
    </div>
  );
};
