import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, Medal } from 'lucide-react';
import { AwardRecipient } from '../types/invitation';
import { SchoolCrest } from './SchoolCrest';
import { playGentleTap } from '../utils/audio';

interface RecipientDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipient: AwardRecipient | null;
}

export const RecipientDetailModal: React.FC<RecipientDetailModalProps> = ({
  isOpen,
  onClose,
  recipient,
}) => {
  if (!isOpen || !recipient) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B2219]/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md bg-[#FAF6F0] rounded-3xl shadow-2xl border border-[#DBCBB4] overflow-hidden my-8"
        >
          <div className="flex items-center justify-between px-6 py-4 bg-[#3B3127] text-[#FAF6F0]">
            <div className="flex items-center gap-2">
              <Medal className="w-4 h-4 text-[#E5CE9E]" />
              <span className="font-crest text-xs tracking-wider uppercase text-[#E5CE9E] font-bold">
                Profil Penerima Anugerah
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                playGentleTap();
                onClose();
              }}
              className="p-1 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative p-6 text-center space-y-4">
            <div className="absolute inset-3 border border-[#C8A66A]/25 rounded-2xl pointer-events-none" />

            <div className="relative z-10 flex justify-center">
              <SchoolCrest size="sm" />
            </div>

            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] font-crest tracking-widest uppercase text-[#9A7438] font-bold">
                <span>{recipient.categoryLabel}</span>
                {recipient.subCategory && (
                  <>
                    {!recipient.categoryLabel.trim().endsWith(':') && (
                      <span aria-hidden="true" className="text-[#C8A66A]">·</span>
                    )}
                    <span className="text-[#5C4934]">{recipient.subCategory}</span>
                  </>
                )}
              </div>

              <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#3B3127] mt-2 text-balance">
                {recipient.name}
              </h3>
              <p className="font-sans-refined text-xs text-[#8C7A64] font-semibold mt-0.5">
                {recipient.class} · SRTLDB Muara
              </p>
            </div>

            {recipient.achievement && (
              <div className="relative z-10 bg-[#F3EBDD] p-4 rounded-2xl border border-[#DFD1BC] text-xs text-[#3B3127]">
                <div className="flex items-center justify-center gap-1.5 font-bold text-[#7D5E2D] mb-1">
                  <Award className="w-3.5 h-3.5 text-[#9A7438]" />
                  <span>Pencapaian &amp; Pengiktirafan</span>
                </div>
                <p className="font-medium leading-relaxed">{recipient.achievement}</p>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                playGentleTap();
                onClose();
              }}
              className="relative z-10 w-full py-2.5 bg-[#3B3127] hover:bg-[#524436] text-[#FAF6F0] text-xs font-sans-refined uppercase tracking-widest font-semibold rounded-full transition-colors cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
