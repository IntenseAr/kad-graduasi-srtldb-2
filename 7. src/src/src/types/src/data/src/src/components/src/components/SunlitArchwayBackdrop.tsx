import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { playGentleTap } from '../utils/audio';

import ARCH_LANTERN_DSLR from '../assets/images/arch_lantern_backdrop_dslr_1792981144480.jpg';
import DAPPLED_PLASTER_DSLR from '../assets/images/dappled_plaster_botanical_dslr_1792981147297.jpg';
import ARCH_CANDLES_VASE_DSLR from '../assets/images/arch_candles_vase_dslr_1792981147298.jpg';

export const OrnateGoldDivider: React.FC<{ className?: string; widthClass?: string }> = ({
  className = '',
  widthClass = 'w-44 sm:w-56',
}) => (
  <div
    className={`flex items-center justify-center gap-2 ${widthClass} mx-auto ${className}`}
    aria-hidden="true"
  >
    <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#B69354]/70" />
    <span className="w-1 h-1 rounded-full bg-[#B69354]/75" />
    <svg className="w-2.5 h-2.5 text-[#9A7438] shrink-0" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0 L9.8 6.2 L16 8 L9.8 9.8 L8 16 L6.2 9.8 L0 8 L6.2 6.2 Z" />
    </svg>
    <span className="w-1 h-1 rounded-full bg-[#B69354]/75" />
    <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#B69354]/70" />
  </div>
);

export const SectionScrollChevron: React.FC<{
  targetId?: string;
  onClick?: () => void;
  label?: string;
  className?: string;
}> = ({ targetId, onClick, label = 'Skrol ke bahagian seterusnya', className = '' }) => {
  const handleClick = (e: React.MouseEvent) => {
    playGentleTap();
    if (onClick) {
      e.preventDefault();
      onClick();
      return;
    }
    if (targetId) {
      e.preventDefault();
      const el = document.getElementById(targetId.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <a
      href={targetId ? `#${targetId.replace('#', '')}` : '#'}
      onClick={handleClick}
      aria-label={label}
      className={`inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#9E7B3E]/55 bg-[#FAF6F0]/95 hover:bg-white hover:border-[#9E7B3E] hover:translate-y-0.5 text-[#7A5820] shadow-[0_4px_12px_rgba(92,68,32,0.1)] transition-all duration-150 cursor-pointer ${className}`}
    >
      <ChevronDown className="w-4 h-4 stroke-[1.7]" />
    </a>
  );
};

export const RevealOnScroll: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

interface SunlitArchSectionProps {
  id?: string;
  scene: 'lantern-arch' | 'dappled-plaster' | 'dappled-plaster-alt' | 'candles-stepped-arch';
  children: React.ReactNode;
  className?: string;
}

export const SunlitArchSection: React.FC<SunlitArchSectionProps> = ({
  id,
  scene,
  children,
  className = '',
}) => {
  if (scene === 'dappled-plaster' || scene === 'dappled-plaster-alt') {
    const isAlt = scene === 'dappled-plaster-alt';
    return (
      <section
        id={id}
        className={`relative py-16 sm:py-24 bg-[#EFE6D8] border-b border-[#DFD1BC] overflow-hidden ${className}`}
      >
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <img
            src={DAPPLED_PLASTER_DSLR}
            alt=""
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover object-top ${
              isAlt ? '-scale-x-100 opacity-45' : 'opacity-70'
            }`}
          />
          <div
            className={`absolute inset-0 ${
              isAlt
                ? 'bg-gradient-to-b from-[#F4EDE2]/75 via-[#EFE6D8]/55 to-[#F4EDE2]/80'
                : 'bg-gradient-to-b from-[#FAF6F0]/50 via-[#F4EDE2]/30 to-[#F4EDE2]/65'
            }`}
          />
        </div>

        <div className="relative z-10">{children}</div>
      </section>
    );
  }

  if (scene === 'lantern-arch') {
    return (
      <section
        id={id}
        className={`relative py-0 md:py-10 lg:py-12 bg-gradient-to-b from-[#ECE2D0] via-[#E5D9C4] to-[#DFD1BA] border-b border-[#DFD1BC] overflow-hidden ${className}`}
      >
        <div className="relative z-10 w-full max-w-[840px] mx-auto md:px-4">
          <div className="relative w-full min-h-[690px] sm:min-h-[800px] md:min-h-0 md:aspect-[3/4] md:rounded-3xl overflow-hidden md:shadow-[0_24px_60px_-20px_rgba(68,50,26,0.24)] bg-[#EDE3D3]">
            <img
              src={ARCH_LANTERN_DSLR}
              alt="Gerbang plaster krim disinari cahaya pagi bersama tanglung tembaga dan dedaun emas kering"
              decoding="async"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
            />

            <div
              className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_48%_54%_at_50%_45%,rgba(251,248,242,0.58)_0%,rgba(251,248,242,0.2)_68%,transparent_100%)]"
              aria-hidden="true"
            />

            <div className="relative z-20 w-full h-full flex flex-col justify-between pt-20 pb-9 px-6 sm:pt-[19%] sm:pb-[5.5%] sm:px-12">
              {children}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id={id}
      className={`relative py-0 md:py-10 lg:py-12 bg-gradient-to-b from-[#EAE0CE] via-[#E3D6C0] to-[#DCCDB4] border-b border-[#D8C7AE] overflow-hidden ${className}`}
    >
      <div className="relative z-10 w-full max-w-[820px] mx-auto md:px-4">
        <div className="relative w-full min-h-[560px] sm:min-h-[660px] md:min-h-0 md:aspect-[3/4] md:rounded-3xl overflow-hidden md:shadow-[0_24px_60px_-20px_rgba(68,50,26,0.24)] bg-[#E9DEC9]">
          <img
            src={ARCH_CANDLES_VASE_DSLR}
            alt="Gerbang plaster bertangga batu travertine bersama tiga lilin menyala dan pasu seramik pampas"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-bottom select-none pointer-events-none"
          />

          <div
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_44%_38%_at_49.5%_40%,rgba(251,248,242,0.54)_0%,rgba(251,248,242,0.18)_70%,transparent_100%)]"
            aria-hidden="true"
          />

          <div className="relative z-20 w-full h-full flex flex-col items-center justify-start pt-20 pb-48 px-10 sm:pt-[17.5%] sm:pb-[34%] sm:px-[24%]">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};
