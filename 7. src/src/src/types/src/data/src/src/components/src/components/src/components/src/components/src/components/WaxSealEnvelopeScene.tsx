import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Volume2, VolumeX, FastForward, ChevronDown } from 'lucide-react';
import { OrnateGoldDivider } from './SunlitArchwayBackdrop';
import {
  playWaxSealRelease,
  playGentleTap,
  preloadBackgroundMusic,
  startBackgroundMusic,
  toggleBackgroundMusic,
  setSoundEnabled,
  useAudioState,
} from '../utils/audio';

import CLOSED_ENVELOPE_DSLR from '../assets/images/intro_closed_envelope_dslr_1792981138873.jpg';
import GRADUATION_CARD_FALLBACK from '../assets/images/graduation_reveal_card.jpg';

const GRADUATION_CARD_URL = 'https://i.imgur.com/aFS9lWR.jpeg';

const UPPER_FLAP_CLIP =
  'polygon(0% 0%, 100% 0%, 100% 28.2%, 84.3% 28.2%, 58.2% 49.6%, 58.6% 53.6%, 57.0% 57.2%, 53.8% 59.1%, 50.2% 59.6%, 46.6% 59.1%, 43.6% 57.0%, 42.0% 53.4%, 42.6% 49.6%, 16.3% 28.2%, 0% 28.2%)';

const LOWER_POCKET_CLIP =
  'polygon(0% 27.5%, 17.2% 27.5%, 50.2% 53.6%, 83.2% 27.5%, 100% 27.5%, 100% 100%, 0% 100%)';

const SUNLIT_BOKEH_MOTES = [
  { id: 1, left: '66%', top: '22%', size: 5.5, delay: 0.3, dx: -16, dy: -26 },
  { id: 2, left: '54%', top: '30%', size: 4.5, delay: 0.65, dx: -12, dy: -22 },
  { id: 3, left: '74%', top: '36%', size: 5, delay: 0.45, dx: -18, dy: -24 },
  { id: 4, left: '46%', top: '44%', size: 4, delay: 0.95, dx: -10, dy: -20 },
  { id: 5, left: '62%', top: '50%', size: 4.5, delay: 1.25, dx: -14, dy: -26 },
];

interface WaxSealEnvelopeSceneProps {
  onComplete: () => void;
  isReplay?: boolean;
}

export const WaxSealEnvelopeScene: React.FC<WaxSealEnvelopeSceneProps> = ({
  onComplete,
}) => {
  const [phase, setPhase] = useState<'closed' | 'opening' | 'risen' | 'transitioning'>('closed');
  const [cardImgSrc, setCardImgSrc] = useState<string>(GRADUATION_CARD_URL);
  const { soundEnabled, musicPlaying } = useAudioState();
  const prefersReducedMotion = useReducedMotion();
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    preloadBackgroundMusic();

    const envImg = new Image();
    envImg.src = CLOSED_ENVELOPE_DSLR;

    const gradImg = new Image();
    gradImg.referrerPolicy = 'no-referrer';
    gradImg.onerror = () => {
      setCardImgSrc(GRADUATION_CARD_FALLBACK);
    };
    gradImg.src = GRADUATION_CARD_URL;

    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const clearAllTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  const isOpened = phase === 'opening' || phase === 'risen' || phase === 'transitioning';

  const handleToggleMusicControl = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOpened) {
      toggleBackgroundMusic();
    } else {
      setSoundEnabled(!soundEnabled);
    }
  };

  const handleProceedToMain = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (phase === 'transitioning') return;
    clearAllTimers();
    playGentleTap();
    setPhase('transitioning');
    const tEnd = window.setTimeout(() => {
      onComplete();
    }, 360);
    timersRef.current = [tEnd];
  };

  const handleSkipIntro = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearAllTimers();
    startBackgroundMusic();
    onComplete();
  };

  const handleOpenEnvelope = () => {
    if (phase !== 'closed') return;

    setPhase('opening');
    playWaxSealRelease();
    startBackgroundMusic();

    const tRise = window.setTimeout(() => {
      setPhase('risen');
    }, 320);

    const tAutoTransition = window.setTimeout(() => {
      setPhase('transitioning');
    }, 4560);

    const tComplete = window.setTimeout(() => {
      onComplete();
    }, 5000);

    timersRef.current = [tRise, tAutoTransition, tComplete];
  };

  return (
    <div
      onClick={
        phase === 'closed'
          ? handleOpenEnvelope
          : phase === 'risen'
            ? handleProceedToMain
            : undefined
      }
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,#F6EFE4_0%,#EAE0D0_68%,#DDD0BC_100%)] select-none ${
        phase === 'closed' || phase === 'risen' ? 'cursor-pointer' : 'cursor-default'
      }`}
      aria-label="Sampul Jemputan Rasmi Majlis Konvokesyen SRTLDB Muara"
    >
      <div className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-10 max-w-6xl mx-auto pointer-events-auto">
        <button
          type="button"
          onClick={handleToggleMusicControl}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[11px] font-sans-refined font-semibold tracking-wider uppercase bg-[#FAF6F0]/95 hover:bg-white text-[#3B3127] border border-[#D8C7AE] shadow-xs transition-colors cursor-pointer whitespace-nowrap shrink-0"
          aria-label={
            isOpened
              ? musicPlaying
                ? 'Hentikan muzik'
                : 'Mainkan muzik'
              : soundEnabled
                ? 'Matikan muzik auto'
                : 'Hidupkan muzik auto'
          }
        >
          {(isOpened ? musicPlaying : soundEnabled) ? (
            <Volume2 className="w-3.5 h-3.5 text-[#9A7438]" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-stone-400" />
          )}
          <span>
            {isOpened
              ? musicPlaying
                ? 'Henti Muzik'
                : 'Mainkan Muzik'
              : soundEnabled
                ? 'Muzik Auto'
                : 'Senyap'}
          </span>
        </button>

        <button
          type="button"
          onClick={handleSkipIntro}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[11px] font-sans-refined font-semibold tracking-wider uppercase bg-[#FAF6F0]/95 hover:bg-white text-[#3B3127] border border-[#D8C7AE] shadow-xs transition-colors cursor-pointer whitespace-nowrap shrink-0 group"
          aria-label="Langkau Intro"
        >
          <span>Langkau</span>
          <FastForward className="w-3 h-3 text-[#9A7438] group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      <motion.div
        className="relative z-20 w-[min(108vw,calc(100dvh*0.75))] sm:w-[min(94vw,calc(100dvh*0.75))] aspect-[3/4] flex items-center justify-center overflow-hidden sm:rounded-2xl sm:shadow-[0_24px_64px_-20px_rgba(58,42,22,0.28)]"
        animate={
          phase === 'transitioning'
            ? {
                scale: prefersReducedMotion ? 1 : 1.03,
                opacity: 0,
              }
            : { scale: 1, opacity: 1 }
        }
        transition={{ duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 cotton-paper-surface pointer-events-none"
            aria-hidden="true"
          />

          <motion.div
            className="relative z-10 w-[90%] sm:w-[88%] aspect-[1048/1224] rounded-xl sm:rounded-2xl bg-[#FBF7F0] p-1.5 sm:p-2.5 shadow-[0_20px_48px_-12px_rgba(42,28,12,0.3)] border border-[#E5D6BE] overflow-hidden will-change-transform"
            initial={false}
            animate={
              !isOpened
                ? {
                    opacity: 0,
                    scale: 0.74,
                    y: '8%',
                  }
                : prefersReducedMotion
                  ? {
                      opacity: 1,
                      scale: 1,
                      y: '0%',
                    }
                  : {
                      opacity: 1,
                      scale: [0.76, 0.985, 1.04],
                      y: ['8%', '0%', '-0.5%'],
                    }
            }
            transition={
              !isOpened
                ? { duration: 0.2 }
                : prefersReducedMotion
                  ? { duration: 0.5, ease: 'easeOut' }
                  : {
                      opacity: { duration: 0.25, ease: 'easeOut' },
                      scale: {
                        duration: 4.65,
                        times: [0, 0.22, 1],
                        ease: [0.22, 1, 0.36, 1],
                      },
                      y: {
                        duration: 4.65,
                        times: [0, 0.22, 1],
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }
            }
          >
            <div className="relative w-full h-full rounded-lg sm:rounded-xl overflow-hidden bg-[#F5EDE0]">
              <motion.img
                src={cardImgSrc}
                alt="Bukan pengakhiran, tetapi sebuah permulaan langkah ke gerbang kejayaan yang lebih besar"
                referrerPolicy="no-referrer"
                onError={() => {
                  if (cardImgSrc !== GRADUATION_CARD_FALLBACK) {
                    setCardImgSrc(GRADUATION_CARD_FALLBACK);
                  }
                }}
                initial={false}
                animate={
                  isOpened && !prefersReducedMotion
                    ? { scale: [1, 1.035] }
                    : { scale: 1 }
                }
                transition={{ duration: 4.7, ease: [0.25, 0.85, 0.35, 1] }}
                className="w-full h-full object-cover origin-[54%_7%] select-none pointer-events-none will-change-transform"
                draggable={false}
              />

              {isOpened && !prefersReducedMotion && (
                <>
                  <motion.div
                    initial={{ x: '-130%', opacity: 0.55 }}
                    animate={{ x: '145%', opacity: 0 }}
                    transition={{ duration: 1.35, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-y-0 w-2/3 -skew-x-18 bg-gradient-to-r from-transparent via-[#FFFCF4]/50 to-transparent pointer-events-none will-change-transform"
                    aria-hidden="true"
                  />

                  {SUNLIT_BOKEH_MOTES.map((mote) => (
                    <motion.span
                      key={mote.id}
                      initial={{ opacity: 0, x: 0, y: 0, scale: 0.7 }}
                      animate={{
                        opacity: [0, 0.85, 0],
                        x: mote.dx,
                        y: mote.dy,
                        scale: [0.7, 1.1, 0.8],
                      }}
                      transition={{
                        duration: 3.2,
                        delay: mote.delay,
                        ease: 'easeOut',
                      }}
                      style={{
                        left: mote.left,
                        top: mote.top,
                        width: mote.size,
                        height: mote.size,
                      }}
                      className="absolute rounded-full bg-[#FFF7DC] pointer-events-none will-change-transform"
                      aria-hidden="true"
                    />
                  ))}
                </>
              )}

              <motion.div
                initial={false}
                animate={isOpened ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.28, ease: 'easeOut' }}
                className="absolute inset-x-0 bottom-0 z-10 pt-12 sm:pt-16 pb-4 sm:pb-6 px-5 sm:px-8 bg-gradient-to-t from-[#140F0A]/90 via-[#1E160E]/64 to-transparent flex flex-col items-center text-center pointer-events-none"
              >
                <motion.div
                  initial={false}
                  animate={
                    !isOpened
                      ? { opacity: 0, y: prefersReducedMotion ? 0 : 10 }
                      : { opacity: 1, y: 0 }
                  }
                  transition={{
                    duration: prefersReducedMotion ? 0.35 : 0.85,
                    delay: prefersReducedMotion ? 0.15 : 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex flex-col items-center max-w-[94%]"
                >
                  <div className="w-20 sm:w-28 gold-divider mb-2 sm:mb-2.5 opacity-90" aria-hidden="true" />
                  <h2 className="font-serif-luxury text-[15px] sm:text-[19px] md:text-[20px] leading-[1.32] font-medium tracking-[0.015em] text-[#FAF6EE] text-balance drop-shadow-[0_2px_6px_rgba(10,7,4,0.85)]">
                    Bukan pengakhiran, tetapi sebuah permulaan langkah ke gerbang kejayaan yang lebih besar
                  </h2>
                </motion.div>
              </motion.div>

              <div
                className="absolute inset-2 sm:inset-2.5 z-20 rounded-md sm:rounded-lg border border-[#C8A66A]/32 pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </motion.div>

          <AnimatePresence>
            {isOpened && (
              <motion.div
                key="lower-envelope-pocket"
                initial={{ y: '0%', opacity: 1 }}
                animate={{
                  y: prefersReducedMotion ? '12%' : '106%',
                  opacity: prefersReducedMotion ? 0 : [1, 1, 0],
                }}
                exit={{ opacity: 0 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.4, ease: 'easeOut' }
                    : {
                        y: { duration: 1.0, delay: 0.04, ease: [0.33, 0.04, 0.2, 1] },
                        opacity: { duration: 1.0, times: [0, 0.84, 1] },
                      }
                }
                className="absolute inset-0 w-full h-full pointer-events-none z-20 will-change-transform"
              >
                <div
                  className="w-full h-full"
                  style={{
                    clipPath: LOWER_POCKET_CLIP,
                    WebkitClipPath: LOWER_POCKET_CLIP,
                  }}
                >
                  <img
                    src={CLOSED_ENVELOPE_DSLR}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover select-none"
                    draggable={false}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isOpened && (
              <motion.div
                key="upper-envelope-flap"
                initial={{ y: '0%', opacity: 1 }}
                animate={{
                  y: prefersReducedMotion ? '-12%' : '-106%',
                  opacity: prefersReducedMotion ? 0 : [1, 1, 0],
                }}
                exit={{ opacity: 0 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.4, ease: 'easeOut' }
                    : {
                        y: { duration: 0.96, ease: [0.33, 0.04, 0.2, 1] },
                        opacity: { duration: 0.96, times: [0, 0.84, 1] },
                      }
                }
                className="absolute inset-0 w-full h-full pointer-events-none z-30 will-change-transform"
              >
                <div
                  className="w-full h-full"
                  style={{
                    clipPath: UPPER_FLAP_CLIP,
                    WebkitClipPath: UPPER_FLAP_CLIP,
                  }}
                >
                  <img
                    src={CLOSED_ENVELOPE_DSLR}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover select-none"
                    draggable={false}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!isOpened && (
            <div className="absolute inset-0 w-full h-full z-30">
              <img
                src={CLOSED_ENVELOPE_DSLR}
                alt="Sampul surat kapas timbul dengan cop lilin emas botani"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
              />
            </div>
          )}

          <AnimatePresence>
            {!isOpened && (
              <>
                <motion.div
                  key="closed-top-ornament"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-[12.5%] inset-x-0 flex justify-center pointer-events-none z-40"
                >
                  <OrnateGoldDivider widthClass="w-36 sm:w-48" />
                </motion.div>

                <motion.div
                  key="closed-bottom-prompt"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-[6.5%] inset-x-4 flex flex-col items-center text-center pointer-events-none z-40"
                >
                  <div className="px-6 py-3 rounded-3xl flex flex-col items-center bg-[radial-gradient(ellipse_at_center,rgba(251,247,240,0.86)_0%,rgba(251,247,240,0.48)_58%,transparent_88%)]">
                    <span className="font-serif-luxury text-xs sm:text-sm tracking-[0.28em] uppercase text-[#3B3127] font-semibold">
                      Sentuh Untuk Buka
                    </span>

                    <OrnateGoldDivider widthClass="w-40 sm:w-52" className="my-2.5" />

                    <div className="mt-0.5 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#9E7B3E]/60 bg-[#FAF6F0]/92 flex items-center justify-center text-[#7A5820] shadow-[0_4px_12px_rgba(78,56,26,0.12)]">
                      <ChevronDown className="w-4 h-4 stroke-[1.7]" />
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <AnimatePresence>
        {phase === 'transitioning' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.44, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-[#F4EDE2] pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
};
