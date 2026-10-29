import React from 'react';

interface SchoolCrestProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtext?: boolean;
}

const OFFICIAL_LOGO_URL = 'https://i.imgur.com/fAXr20J.png';

export const SchoolCrest: React.FC<SchoolCrestProps> = ({
  className = '',
  size = 'md',
  showSubtext = false,
}) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-20 h-20',
    lg: 'w-28 h-28',
    xl: 'w-36 h-36',
  };

  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      <div className={`relative ${sizeMap[size]} transition-transform duration-500 hover:scale-105`}>
        <div className="absolute inset-0 bg-[#C6A56B]/20 rounded-full blur-xl pointer-events-none" />

        <img
          src={OFFICIAL_LOGO_URL}
          alt="Lambang Rasmi SRTLDB Muara"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(198,165,107,0.35)] relative z-10"
        />
      </div>

      {showSubtext && (
        <div className="mt-2 text-center">
          <p className="font-crest text-xs tracking-[0.2em] uppercase text-[#C6A56B] font-semibold">
            Sekolah Rendah TLDB Muara
          </p>
          <p className="text-[11px] font-serif-luxury italic text-[#272522]/70">
            Dewan SRTLDB
          </p>
        </div>
      )}
    </div>
  );
};
