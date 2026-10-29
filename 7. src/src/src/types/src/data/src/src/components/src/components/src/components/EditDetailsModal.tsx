import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Edit3, RotateCcw } from 'lucide-react';
import { EventDetails } from '../types/invitation';
import { INITIAL_EVENT_DETAILS } from '../data/invitationData';
import { playGentleTap } from '../utils/audio';

interface EditDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventDetails;
  onSave: (updated: EventDetails) => void;
}

export const EditDetailsModal: React.FC<EditDetailsModalProps> = ({
  isOpen,
  onClose,
  event,
  onSave,
}) => {
  const [form, setForm] = useState<EventDetails>(event);

  if (!isOpen) return null;

  const handleChange = (field: keyof EventDetails, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    playGentleTap();
    onSave(form);
    onClose();
  };

  const handleReset = () => {
    playGentleTap();
    setForm(INITIAL_EVENT_DETAILS);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B2219]/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-xl bg-[#FAF6F0] rounded-3xl shadow-2xl border border-[#DBCBB4] overflow-hidden my-8"
        >
          <div className="flex items-center justify-between px-6 py-4 bg-[#3B3127] text-[#FAF6F0]">
            <div className="flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-[#E5CE9E]" />
              <span className="font-crest text-xs tracking-wider uppercase text-[#E5CE9E] font-bold">
                Sunting Butiran Majlis &amp; Maklumat Jemputan
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

          <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            <p className="text-xs text-[#6E5A42]">
              Ubah sebarang butiran acara di bawah. Maklumat ini akan dikemas kini serta-merta pada kad jemputan digital.
            </p>

            <div>
              <label className="block text-xs font-semibold text-[#3B3127] uppercase tracking-wider mb-1">
                Tajuk Majlis
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#DBCBB4] rounded-xl focus:outline-none focus:border-[#9A7438]"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#3B3127] uppercase tracking-wider mb-1">
                  Tarikh (Teks Melayu)
                </label>
                <input
                  type="text"
                  value={form.dateMalay}
                  onChange={(e) => handleChange('dateMalay', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#DBCBB4] rounded-xl focus:outline-none focus:border-[#9A7438]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3B3127] uppercase tracking-wider mb-1">
                  Waktu Majlis
                </label>
                <input
                  type="text"
                  value={form.timeMalay}
                  onChange={(e) => handleChange('timeMalay', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#DBCBB4] rounded-xl focus:outline-none focus:border-[#9A7438]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#3B3127] uppercase tracking-wider mb-1">
                  Nama Dewan / Venue
                </label>
                <input
                  type="text"
                  value={form.venueName}
                  onChange={(e) => handleChange('venueName', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#DBCBB4] rounded-xl focus:outline-none focus:border-[#9A7438]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3B3127] uppercase tracking-wider mb-1">
                  Pangkalan / Lokasi
                </label>
                <input
                  type="text"
                  value={form.baseLocation}
                  onChange={(e) => handleChange('baseLocation', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#DBCBB4] rounded-xl focus:outline-none focus:border-[#9A7438]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3B3127] uppercase tracking-wider mb-1">
                Alamat Penuh Dewan &amp; Sekolah
              </label>
              <textarea
                rows={2}
                value={form.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#DBCBB4] rounded-xl focus:outline-none focus:border-[#9A7438]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3B3127] uppercase tracking-wider mb-1">
                E-mel Rasmi Sekolah
              </label>
              <input
                type="email"
                value={form.contactEmail}
                onChange={(e) => handleChange('contactEmail', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#DBCBB4] rounded-xl focus:outline-none focus:border-[#9A7438]"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#E3D5C1]">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#6E5A42] hover:text-[#3B3127] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Pulihkan Asal</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    playGentleTap();
                    onClose();
                  }}
                  className="px-4 py-2 text-xs font-medium border border-[#D5C3A8] rounded-full hover:bg-[#EFE6D8] transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold uppercase tracking-wider bg-[#3B3127] hover:bg-[#524436] text-[#FAF6F0] rounded-full transition-colors cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5 text-[#E5CE9E]" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
