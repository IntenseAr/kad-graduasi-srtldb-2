import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  Award,
  Volume2,
  VolumeX,
  RotateCcw,
  Search,
  Edit,
  Medal,
} from 'lucide-react';
import { SchoolCrest } from './SchoolCrest';
import { EditDetailsModal } from './EditDetailsModal';
import { RecipientDetailModal } from './RecipientDetailModal';
import {
  SunlitArchSection,
  OrnateGoldDivider,
  SectionScrollChevron,
  RevealOnScroll,
} from './SunlitArchwayBackdrop';
import { EventDetails, AwardRecipient } from '../types/invitation';
import { PROGRAMME_ITEMS, AWARD_RECIPIENTS, CEMERLANG_KELAS_ORDER } from '../data/invitationData';
import {
  playGentleTap,
  toggleBackgroundMusic,
  useAudioState,
} from '../utils/audio';

// Preserved high-resolution photography assets (bundled for production deploy)
import ceremonyHallImg from '../assets/images/malay_islamic_hall_stage_1793286070353.jpg';
import celebrationPortraitImg from '../assets/images/malay_islamic_graduates_shoes_1793286093783.jpg';
import awardStageImg from '../assets/images/gallery_award_stage_1793285791613.jpg';
import classroomAspirationImg from '../assets/images/gallery_classroom_aspiration_1793285793318.jpg';
import familyBlessingImg from '../assets/images/gallery_family_blessing_1793285794131.jpg';

const GALLERY_MEMORIES = [
  {
    id: 'galeri-1',
    src: ceremonyHallImg,
    alt: 'Suasana Dewan Majlis Konvokesyen Melayu Islam SRTLDB',
    kicker: 'Dewan SRTLDB',
    title: 'Pentas Utama Majlis Konvokesyen SRTLDB',
    description:
      'Dilengkapi tata cahaya keemasan bagi meraikan kejayaan para graduan dan penerima anugerah.',
    gridClass: 'sm:col-span-1 lg:col-span-7',
    heightClass: 'h-80 sm:h-96',
    objectPositionClass: 'object-center',
  },
  {
    id: 'galeri-2',
    src: celebrationPortraitImg,
    alt: 'Graduan Cilik Berpakaian Jubah Konvokesyen Sopan Melayu Islam',
    kicker: 'Generasi Wawasan 2035',
    title: 'Senyuman Permata Hati',
    description:
      'Kejayaan awal yang menyalakan impian masa depan berwawasan tinggi.',
    gridClass: 'sm:col-span-1 lg:col-span-5',
    heightClass: 'h-80 sm:h-96',
    objectPositionClass: 'object-[50%_35%]',
  },
  {
    id: 'galeri-3',
    src: awardStageImg,
    alt: 'Graduan Cemerlang Bersama Sijil dan Trofi Anugerah',
    kicker: 'Detik Kecemerlangan',
    title: 'Kebanggaan Penerima Sijil & Anugerah',
    description:
      'Hasil usaha gigih dan ketekunan murid yang diraikan bersama rakan seperjuangan.',
    gridClass: 'sm:col-span-1 lg:col-span-4',
    heightClass: 'h-72 sm:h-80',
    objectPositionClass: 'object-center',
  },
  {
    id: 'galeri-4',
    src: classroomAspirationImg,
    alt: 'Aspirasi Murid Menimba Ilmu Bersama Rakan',
    kicker: 'Tunas Ilmu',
    title: 'Semangat Menimba Ilmu & Eksplorasi',
    description:
      'Menyemai budaya membaca, daya fikir kreatif serta nilai kerjasama sejak di bangku sekolah.',
    gridClass: 'sm:col-span-1 lg:col-span-4',
    heightClass: 'h-72 sm:h-80',
    objectPositionClass: 'object-center',
  },
  {
    id: 'galeri-5',
    src: familyBlessingImg,
    alt: 'Restu Ibu Bapa dan Pendidik Bersama Graduan',
    kicker: 'Kasih & Restu',
    title: 'Jalinan Erat Ibu Bapa & Pendidik',
    description:
      'Doa restu keluarga serta bimbingan guru menjadi pemangkin kejayaan setiap langkah murid.',
    gridClass: 'sm:col-span-2 lg:col-span-4',
    heightClass: 'h-72 sm:h-80',
    objectPositionClass: 'object-[50%_25%]',
  },
] as const;

interface MainInvitationViewProps {
  event: EventDetails;
  onUpdateEvent: (updated: EventDetails) => void;
  onReplayEnvelope: () => void;
}

export const MainInvitationView: React.FC<MainInvitationViewProps> = ({
  event,
  onUpdateEvent,
  onReplayEnvelope,
}) => {
  const { musicPlaying } = useAudioState();
  const [selectedRecipient, setSelectedRecipient] = useState<AwardRecipient | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [awardCategoryFilter, setAwardCategoryFilter] = useState<
    'all' | 'pra_a' | 'pra_b' | 'tahun6_a' | 'tahun6_b' | 'psr_cemerlang' | 'cemerlang_tahunan'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');

  const populatedRecipients = useMemo(
    () =>
      AWARD_RECIPIENTS.filter(
        (item) =>
          item.isPlaceholder || (item.name.trim() !== '' && !item.name.startsWith('[Ruang Nama'))
      ),
    []
  );

  const availableCategoryTabs = useMemo(() => {
    const countByCategory = (cat: AwardRecipient['category']) =>
      populatedRecipients.filter((item) => item.category === cat).length;

    return (
      [
        { key: 'pra_a' as const, label: `Pra A Darulehsan (${countByCategory('pra_a')})`, title: 'Pra A Darulehsan', sub: `${countByCategory('pra_a')} Murid Konvokesyen` },
        { key: 'pra_b' as const, label: `Pra B Darul Aman (${countByCategory('pra_b')})`, title: 'Pra B Darul Aman', sub: `${countByCategory('pra_b')} Murid Konvokesyen` },
        { key: 'tahun6_a' as const, label: `Tahun 6A Ijtihad (${countByCategory('tahun6_a')})`, title: 'Tahun 6A Ijtihad', sub: `${countByCategory('tahun6_a')} Murid Konvokesyen` },
        { key: 'tahun6_b' as const, label: `Tahun 6B Syafa’at (${countByCategory('tahun6_b')})`, title: 'Tahun 6B Syafa’at', sub: `${countByCategory('tahun6_b')} Murid Konvokesyen` },
        { key: 'psr_cemerlang' as const, label: 'Pelajar Cemerlang Tahun 6 Sesi 2026', title: 'Pelajar Cemerlang Tahun 6 Sesi 2026', sub: 'Penerima Hadiah Galakkan' },
        { key: 'cemerlang_tahunan' as const, label: 'Pelajar Cemerlang Mengikut Kelas', title: 'Pelajar cemerlang mengikut kelas:', sub: 'Tahun 1A – 5A · Kedudukan 1 – 3' },
      ]
    ).filter((tab) => countByCategory(tab.key) > 0);
  }, [populatedRecipients]);

  const { filteredAwards, standardFilteredAwards, cemerlangKelasGroups } = useMemo(() => {
    const normalizeSearch = (str: string) => str.toLowerCase().replace(/[’']/g, "'");
    const normalizedQuery = normalizeSearch(searchQuery);

    const filtered = populatedRecipients.filter((item) => {
      const matchesFilter =
        awardCategoryFilter === 'all' ? true : item.category === awardCategoryFilter;

      const matchesSearch =
        normalizedQuery === '' ||
        (!item.isPlaceholder && normalizeSearch(item.name).includes(normalizedQuery)) ||
        normalizeSearch(item.categoryLabel).includes(normalizedQuery) ||
        normalizeSearch(item.achievement).includes(normalizedQuery) ||
        Boolean(item.subCategory && normalizeSearch(item.subCategory).includes(normalizedQuery)) ||
        normalizeSearch(item.class).includes(normalizedQuery);

      return matchesFilter && matchesSearch;
    });

    const standard = filtered.filter((item) => item.category !== 'cemerlang_tahunan');
    const kelasGroups = CEMERLANG_KELAS_ORDER.map((className) => ({
      className,
      items: filtered
        .filter((item) => item.category === 'cemerlang_tahunan' && item.class === className)
        .sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0)),
    })).filter((group) => group.items.length > 0);

    return {
      filteredAwards: filtered,
      standardFilteredAwards: standard,
      cemerlangKelasGroups: kelasGroups,
    };
  }, [populatedRecipients, awardCategoryFilter, searchQuery]);

  return (
    <div className="relative min-h-screen bg-[#F4EDE2] text-[#3B3127] plaster-wall-texture">
      {/* 1. TOP BAR */}
      <header className="sticky top-0 z-40 bg-[#FAF6F0]/96 border-b border-[#E3D5C1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-8">
          <a
            href="#hero"
            className="font-crest text-sm sm:text-base font-bold tracking-[0.2em] text-[#3B3127] hover:text-[#A68246] transition-colors whitespace-nowrap shrink-0"
          >
            SRTLDB MUARA
          </a>

          <nav className="hidden md:flex items-center gap-7 text-xs font-sans-refined uppercase tracking-wider text-[#3B3127]/80 font-medium">
            <a
              href="#aturcara"
              className="hover:text-[#A68246] transition-colors whitespace-nowrap shrink-0"
            >
              Atur Cara
            </a>
            <a
              href="#amanat"
              className="hover:text-[#A68246] transition-colors whitespace-nowrap shrink-0"
            >
              Amanat
            </a>
            <a
              href="#anugerah"
              className="hover:text-[#A68246] transition-colors whitespace-nowrap shrink-0"
            >
              Penerima Hadiah
            </a>
            <a
              href="#galeri"
              className="hover:text-[#A68246] transition-colors whitespace-nowrap shrink-0"
            >
              Galeri
            </a>
          </nav>

          <button
            type="button"
            onClick={() => {
              playGentleTap();
              onReplayEnvelope();
            }}
            className="flex items-center gap-2 px-4 py-2 text-xs font-sans-refined font-semibold uppercase tracking-wider text-[#FAF6F0] bg-[#3B3127] hover:bg-[#524436] rounded-full shadow-xs transition-all cursor-pointer whitespace-nowrap shrink-0"
            title="Buka Semula Sampul Jemputan"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#DFC896]" />
            <span>Buka Semula Sampul</span>
          </button>
        </div>
      </header>

      <main>
        {/* 2. HERO SECTION */}
        <SunlitArchSection id="hero" scene="lantern-arch">
          <div className="w-full max-w-[330px] sm:max-w-[390px] mx-auto text-center">
            <RevealOnScroll>
              <div className="flex justify-center mb-3 sm:mb-4">
                <SchoolCrest size="md" />
              </div>

              <p
                className="text-lg sm:text-2xl font-serif-luxury font-semibold text-[#7A5820] mb-1 select-none"
                dir="rtl"
              >
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.12}>
              <h1 className="mt-3.5 sm:mt-4 font-serif-luxury text-[26px] sm:text-4xl font-medium tracking-tight text-[#3B3127] leading-[1.14] text-balance">
                <span className="gold-foil-text-animated font-semibold block">
                  Majlis Konvokesyen
                </span>
                <span className="italic font-normal text-[22px] sm:text-[32px] block mt-0.5">
                  Pra, Tahun 6
                </span>
                <span className="block font-normal text-[21px] sm:text-[30px] mt-0.5">
                  dan Anugerah Pelajar Cemerlang
                </span>
              </h1>

              <OrnateGoldDivider widthClass="w-36 sm:w-48" className="my-3.5 sm:my-4" />

              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-[10px] sm:text-[11px] font-sans-refined uppercase tracking-[0.18em] text-[#5C4934]">
                <span className="font-semibold">{event.institution}</span>
                <span aria-hidden="true" className="text-[#A68246]">·</span>
                <span className="font-semibold text-[#8A672D] tabular-nums">
                  Sesi Akademik 2026
                </span>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.22}>
              <div className="mt-5 sm:mt-6 max-w-[295px] sm:max-w-[330px] mx-auto space-y-3 sm:space-y-3.5 text-left tabular-nums">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-xl border border-[#C8A66A]/55 bg-[#FAF6F0]/88 flex items-center justify-center text-[#8A672D] shadow-2xs shrink-0">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.65]" />
                  </div>
                  <div>
                    <span className="block font-sans-refined text-xs sm:text-sm font-semibold uppercase tracking-[0.13em] text-[#6E5020]">
                      {event.dateMalay}
                    </span>
                    <span className="block text-[10.5px] sm:text-[11px] font-sans-refined uppercase tracking-[0.1em] text-[#5C4934]/85 mt-0.5">
                      Bersamaan 14 Jamadilakhir 1448H
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-xl border border-[#C8A66A]/55 bg-[#FAF6F0]/88 flex items-center justify-center text-[#8A672D] shadow-2xs shrink-0">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.65]" />
                  </div>
                  <div>
                    <span className="block font-sans-refined text-xs sm:text-sm font-semibold uppercase tracking-[0.13em] text-[#6E5020]">
                      {event.timeMalay}
                    </span>
                    <span className="block text-[10.5px] sm:text-[11px] font-sans-refined uppercase tracking-[0.1em] text-[#5C4934]/85 mt-0.5">
                      Pendaftaran dibuka jam 07:45 Pagi
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-xl border border-[#C8A66A]/55 bg-[#FAF6F0]/88 flex items-center justify-center text-[#8A672D] shadow-2xs shrink-0">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.65]" />
                  </div>
                  <div>
                    <span className="block font-sans-refined text-xs sm:text-sm font-semibold uppercase tracking-[0.13em] text-[#6E5020]">
                      {event.venueName}
                    </span>
                    <span className="block text-[10.5px] sm:text-[11px] font-sans-refined uppercase tracking-[0.1em] text-[#5C4934]/85 mt-0.5">
                      Sekolah Rendah TLDB Muara
                    </span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          <div className="mt-7 sm:mt-8 max-w-xl mx-auto text-center">
            <RevealOnScroll delay={0.2}>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <a
                  href="#anugerah"
                  className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#3B3127] hover:bg-[#524436] text-[#FAF6F0] text-[11px] sm:text-xs font-sans-refined font-semibold uppercase tracking-wider transition-colors shadow-xs cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Award className="w-3.5 h-3.5 text-[#DFC896]" />
                  <span>Senarai Penerima Hadiah</span>
                </a>

                <button
                  type="button"
                  onClick={toggleBackgroundMusic}
                  className="flex items-center gap-1.5 px-4 py-2 sm:py-2.5 rounded-full bg-[#FAF6F0]/95 hover:bg-white border border-[#D4C0A1] text-[11px] sm:text-xs font-sans-refined font-semibold text-[#3B3127] transition-colors shadow-xs cursor-pointer whitespace-nowrap shrink-0"
                  title={musicPlaying ? 'Hentikan Muzik' : 'Mainkan Muzik'}
                >
                  {musicPlaying ? (
                    <Volume2 className="w-3.5 h-3.5 text-[#9A7438]" />
                  ) : (
                    <VolumeX className="w-3.5 h-3.5 text-stone-400" />
                  )}
                  <span>{musicPlaying ? 'Henti Muzik' : 'Mainkan Muzik'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playGentleTap();
                    setIsEditModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 sm:py-2.5 rounded-full bg-[#FAF6F0]/88 hover:bg-white border border-[#D8C6AC]/80 text-[11px] sm:text-xs font-sans-refined text-[#5C4934] hover:text-[#3B3127] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  title="Sunting Butiran Acara"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Sunting Butiran</span>
                </button>
              </div>
            </RevealOnScroll>

            <div className="mt-5 sm:mt-6 flex justify-center">
              <SectionScrollChevron targetId="amanat" label="Skrol ke Amanat Guru Besar" />
            </div>
          </div>
        </SunlitArchSection>

        {/* 3. UCAPAN AMANAT GURU BESAR */}
        <SunlitArchSection id="amanat" scene="dappled-plaster">
          <div className="max-w-4xl mx-auto px-6">
            <RevealOnScroll className="text-center mb-12">
              <span className="text-xs font-crest uppercase tracking-[0.25em] text-[#9A7438] font-bold">
                Kata Aluan Pentadbir Sekolah
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-medium text-[#3B3127] mt-2 text-balance">
                Amanat Guru Besar SRTLDB Muara
              </h2>
              <OrnateGoldDivider className="mt-4" />
            </RevealOnScroll>

            <RevealOnScroll delay={0.12}>
              <div className="relative frosted-plaster-card rounded-3xl p-8 sm:p-12 overflow-hidden">
                <div className="absolute inset-3.5 border border-[#C8A66A]/25 rounded-2xl pointer-events-none" />

                <div className="absolute top-7 right-7 opacity-15 pointer-events-none">
                  <SchoolCrest size="md" />
                </div>

                <div className="relative z-10 max-w-none text-[#3B3127]/90 leading-relaxed font-serif-luxury text-base sm:text-lg space-y-5">
                  <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#9A7438] first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                    Assalamu&apos;alaikum Warahmatullahi Wabarakatuh dan Salam Sejahtera buat sekalian para ibu bapa, penjaga dan warga SRTLDB yang dimuliakan.
                  </p>

                  <p>
                    Setinggi-tinggi rasa kesyukuran kita panjatkan ke hadrat Allah Subhanahu Wata&apos;ala kerana dengan limpah kurnia dan izin-Nya jua, kita dapat bersama-sama melangkah ke hari yang penuh bermakna ini — <strong>Majlis Konvokesyen Pra, Tahun 6 dan Anugerah Pelajar Cemerlang Sekolah Rendah Tentera Laut Diraja Brunei Muara bagi Sesi 2026</strong> yang berlangsung pada <strong>Selasa, 24 November 2026</strong> di <strong>Dewan SRTLDB</strong>.
                  </p>

                  <p>
                    Hari ini merupakan detik bersejarah yang meraikan mercu tanda ketabahan, disiplin dan kejayaan anak-anak kita dalam menimba ilmu. Bermula daripada tunas cilik Pra-Sekolah yang diasuh dengan asas literasi, numerasi dan sahsiah mulia, sehinggalah ke barisan para graduan Tahun 6 yang kini bersiap siaga melangkah gagah ke alam persekolahan menengah dengan berbekalkan ilmu pengetahuan, jati diri waja dan akhlak terpuji.
                  </p>

                  <div className="my-8 py-6 px-6 text-center italic text-[#7D5E2D] text-lg sm:text-xl font-serif-luxury border-y border-[#C8A66A]/45 bg-[#FAF6F0]/70 rounded-xl">
                    &ldquo;Kecemerlangan sebenar bukan sekadar diukur pada helaian slip keputusan semata-mata, malah terpahat pada adab, akhlak mulia dan kesungguhan anak-anak berbakti kepada ugama, bangsa dan negara.&rdquo;
                  </div>

                  <p>
                    Sekalung tahniah dan terima kasih yang tidak terhingga saya rakamkan kepada sekalian ibu bapa dan penjaga di atas sokongan padu, doa yang tidak pernah putus, serta kerjasama erat bersama pihak sekolah sepanjang tahun. Begitu juga penghargaan tulus ikhlas kepada seluruh barisan guru dan staf sokongan SRTLDB yang telah mencurahkan keringat dan komitmen tanpa mengenal penat lelah.
                  </p>

                  <p>
                    Semoga anak-anak graduan kita terus belayar gagah mengharungi samudera ilmu dan menjadi insan yang membanggakan keluarga, sekolah dan Negara Brunei Darussalam.
                  </p>
                </div>

                <div className="relative z-10 mt-8 pt-6 border-t border-[#DFD1BC] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h4 className="font-crest text-sm font-bold text-[#3B3127] tracking-wider uppercase">
                      Cikgu Dayang Hjh Rozita binti Haji Daud
                    </h4>
                    <p className="text-xs font-sans-refined text-[#9A7438] font-semibold mt-0.5">
                      Guru Besar, Sekolah Rendah Tentera Laut Diraja Brunei
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="font-script text-2xl text-[#A68246] block">
                      Hjh Rozita
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-[#8C7A64] font-sans-refined">
                      Tandatangan Rasmi
                    </span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            <div className="mt-10 flex justify-center">
              <SectionScrollChevron targetId="aturcara" label="Skrol ke Atur Cara Majlis" />
            </div>
          </div>
        </SunlitArchSection>

        {/* 4. ATUR CARA MAJLIS KONVOKESYEN */}
        <SunlitArchSection id="aturcara" scene="dappled-plaster-alt">
          <div className="relative z-10 max-w-5xl mx-auto px-6">
            <RevealOnScroll className="text-center mb-14">
              <span className="text-xs font-crest uppercase tracking-[0.25em] text-[#9A7438] font-bold">
                Protokol &amp; Kronologi Acara
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-medium text-[#3B3127] mt-2 text-balance">
                Atur Cara Majlis Konvokesyen
              </h2>
              <p className="text-xs font-sans-refined text-[#6E5A42] mt-2 max-w-md mx-auto">
                Susunan perjalanan majlis penganugerahan dan konvokesyen di Dewan SRTLDB bermula jam 08:00 Pagi hingga Selesai.
              </p>
              <OrnateGoldDivider className="mt-4" />
            </RevealOnScroll>

            <RevealOnScroll delay={0.08} className="space-y-3.5 max-w-3xl mx-auto">
              {PROGRAMME_ITEMS.map((item, index) => {
                const phaseNum = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
                return (
                  <div
                    key={index}
                    className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-2xl frosted-plaster-card hover:border-[#C8A66A] transition-colors"
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      <div className="shrink-0 w-24 text-left tabular-nums">
                        <span className="font-sans-refined text-xs font-bold text-[#7D5E2D] tracking-wider block">
                          {item.time}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-[#8C7A64] font-semibold">
                          {item.category}
                        </span>
                      </div>

                      <div className="hidden sm:block w-[1px] h-11 bg-[#DFD1BC] shrink-0" />

                      <div className="pr-4">
                        <h4 className="font-serif-luxury text-base sm:text-lg font-bold text-[#3B3127] group-hover:text-[#9A7438] transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-[#5C4934]/85 font-sans-refined mt-1 leading-relaxed">
                          {item.description}
                        </p>
                        {item.speaker && (
                          <p className="text-[11px] text-[#9A7438] font-medium font-sans-refined mt-1 italic">
                            Oleh: {item.speaker}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 sm:mt-0 shrink-0 self-end sm:self-center text-right tabular-nums">
                      <span className="text-[10px] font-crest uppercase tracking-[0.22em] text-[#9A7438]/85 font-bold">
                        Fasa {phaseNum}
                      </span>
                    </div>
                  </div>
                );
              })}
            </RevealOnScroll>

            <div className="mt-12 flex justify-center">
              <SectionScrollChevron targetId="anugerah" label="Skrol ke Senarai Penerima Hadiah" />
            </div>
          </div>
        </SunlitArchSection>

        {/* 5. SENARAI PENERIMA HADIAH GRADUASI & MURID CEMERLANG */}
        <SunlitArchSection id="anugerah" scene="dappled-plaster">
          <div className="max-w-6xl mx-auto px-6">
            <RevealOnScroll className="text-center mb-12">
              <span className="text-xs font-crest uppercase tracking-[0.25em] text-[#9A7438] font-bold">
                Kemegahan Warga SRTLDB Muara
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-medium text-[#3B3127] mt-2 text-balance">
                Senarai Penerima Hadiah Graduasi &amp; Murid Cemerlang
              </h2>
              <p className="text-xs font-sans-refined text-[#6E5A42] mt-2 max-w-xl mx-auto">
                Senarai rasmi graduan Sijil Konvokesyen mengikut kelas serta penerima Anugerah Pelajar Cemerlang SRTLDB Muara bagi Sesi Akademik 2026.
              </p>
              <OrnateGoldDivider className="mt-4" />
            </RevealOnScroll>

            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-1 p-1.5 bg-[#EAE0CF]/90 border border-[#DBCBB4] rounded-2xl overflow-x-auto max-w-full">
                {[
                  { key: 'all', label: `Semua Kategori (${populatedRecipients.length})` },
                  ...availableCategoryTabs.map((t) => ({ key: t.key, label: t.label })),
                ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => {
                      playGentleTap();
                      setAwardCategoryFilter(tab.key as typeof awardCategoryFilter);
                    }}
                    className={`px-3.5 py-1.5 text-xs font-sans-refined font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                      awardCategoryFilter === tab.key
                        ? 'bg-[#3B3127] text-[#FAF6F0] shadow-xs'
                        : 'text-[#5C4934] hover:text-[#3B3127]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full lg:w-64 shrink-0">
                <Search className="w-4 h-4 text-[#9A7438] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari nama murid / kelas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF6F0] border border-[#DBCBB4] rounded-xl focus:outline-none focus:border-[#9A7438]"
                />
              </div>
            </div>

            {availableCategoryTabs.length > 0 && (
              <div
                className={`grid gap-3 mb-8 tabular-nums ${
                  availableCategoryTabs.length === 5
                    ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'
                    : availableCategoryTabs.length >= 6
                      ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'
                      : 'grid-cols-2 sm:grid-cols-4'
                }`}
              >
                {availableCategoryTabs.map((cohort) => {
                  const isActive = awardCategoryFilter === cohort.key;
                  return (
                    <button
                      key={cohort.key}
                      type="button"
                      onClick={() => {
                        playGentleTap();
                        setAwardCategoryFilter(cohort.key);
                      }}
                      className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#3B3127] border-[#B69354] text-[#FAF6F0] shadow-md'
                          : 'frosted-plaster-card hover:border-[#C8A66A] text-[#3B3127]'
                      }`}
                    >
                      <span
                        className={`font-crest text-xs font-bold block ${
                          isActive ? 'text-[#E5CE9E]' : 'text-[#7D5E2D]'
                        }`}
                      >
                        {cohort.title}
                      </span>
                      <span
                        className={`text-[11px] font-sans-refined mt-0.5 block ${
                          isActive ? 'text-[#FAF6F0]/80' : 'text-[#6E5A42]'
                        }`}
                      >
                        {cohort.sub}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {standardFilteredAwards.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {standardFilteredAwards.map((recipient) => {
                  const hasNumberBadge = Boolean(recipient.seatNumber);
                  const formattedSeat =
                    recipient.seatNumber && recipient.seatNumber < 10
                      ? `0${recipient.seatNumber}`
                      : recipient.seatNumber;

                  return (
                    <div
                      key={recipient.id}
                      onClick={() => {
                        playGentleTap();
                        setSelectedRecipient(recipient);
                      }}
                      className="group relative frosted-plaster-card hover:border-[#C8A66A] rounded-2xl p-5 transition-all flex flex-col justify-between cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-crest tracking-wider uppercase text-[#9A7438] font-bold">
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

                          {hasNumberBadge ? (
                            <div className="w-7 h-7 rounded-full bg-[#F4EDE2] border border-[#C8A66A]/60 flex items-center justify-center text-[10px] font-crest font-bold text-[#7D5E2D] shrink-0 tabular-nums">
                              {formattedSeat}
                            </div>
                          ) : (
                            <Medal className="w-4 h-4 text-[#A68246] group-hover:scale-110 transition-transform shrink-0" />
                          )}
                        </div>

                        <h3 className="font-serif-luxury text-lg font-bold text-[#3B3127] group-hover:text-[#7D5E2D] transition-colors leading-snug">
                          {recipient.name}
                        </h3>

                        <p className="text-[11px] font-sans-refined text-[#8C7A64] font-medium mt-1">
                          {recipient.class}
                        </p>

                        {recipient.achievement && (
                          <p className="text-xs text-[#5C4934]/85 mt-3 font-sans-refined leading-relaxed line-clamp-2">
                            {recipient.achievement}
                          </p>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#E3D5C1] flex items-center justify-between text-[11px] text-[#9A7438] font-semibold font-sans-refined">
                        <span>{hasNumberBadge ? 'Lihat Sijil Graduan' : 'Lihat Perincian Sijil'}</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {cemerlangKelasGroups.length > 0 && (
              <div
                className={
                  standardFilteredAwards.length > 0
                    ? 'mt-12 pt-10 border-t border-[#DBCBB4]'
                    : ''
                }
              >
                <div className="mb-8">
                  <span className="text-[11px] font-crest uppercase tracking-[0.22em] text-[#9A7438] font-bold block">
                    Tahun 1A hingga Tahun 5A
                  </span>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#3B3127] mt-1">
                    Pelajar cemerlang mengikut kelas:
                  </h3>
                </div>

                <div className="space-y-8">
                  {cemerlangKelasGroups.map((group) => (
                    <div key={group.className} className="space-y-3.5">
                      <div className="flex items-center justify-between border-b border-[#DFD1BC] pb-2">
                        <h4 className="font-serif-luxury text-lg sm:text-xl font-bold text-[#3B3127]">
                          {group.className}
                        </h4>
                        <span className="text-[11px] font-sans-refined uppercase tracking-wider text-[#8C7A64] font-semibold tabular-nums">
                          Kedudukan 1 – 3
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {group.items.map((recipient) => {
                          const isSlotEmpty = Boolean(recipient.isPlaceholder);

                          return (
                            <div
                              key={recipient.id}
                              onClick={() => {
                                if (!isSlotEmpty) {
                                  playGentleTap();
                                  setSelectedRecipient(recipient);
                                }
                              }}
                              className={`group relative frosted-plaster-card rounded-2xl p-5 transition-all flex flex-col justify-between ${
                                isSlotEmpty
                                  ? 'border-[#DBCBB4]'
                                  : 'hover:border-[#C8A66A] cursor-pointer'
                              }`}
                            >
                              <div>
                                <div className="flex items-center justify-between gap-2 mb-3">
                                  <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-crest tracking-wider uppercase text-[#9A7438] font-bold">
                                    <span>{recipient.class}</span>
                                    <span aria-hidden="true" className="text-[#C8A66A]">·</span>
                                    <span className="text-[#5C4934]">
                                      Kedudukan {recipient.rank}
                                    </span>
                                  </div>

                                  <div className="w-7 h-7 rounded-full bg-[#F4EDE2] border border-[#C8A66A]/70 flex items-center justify-center text-xs font-crest font-bold text-[#7D5E2D] shrink-0 tabular-nums">
                                    {recipient.rank}
                                  </div>
                                </div>

                                {isSlotEmpty ? (
                                  <div className="rounded-xl border border-dashed border-[#C8A66A]/65 bg-[#FAF6F0]/75 px-3.5 py-3">
                                    <span className="font-serif-luxury italic text-base text-[#8C7A64] block">
                                      Ruang Nama Pelajar
                                    </span>
                                  </div>
                                ) : (
                                  <h3 className="font-serif-luxury text-lg font-bold text-[#3B3127] group-hover:text-[#7D5E2D] transition-colors leading-snug">
                                    {recipient.name}
                                  </h3>
                                )}
                              </div>

                              <div className="mt-4 pt-3 border-t border-[#E3D5C1] flex items-center justify-between text-[11px] font-sans-refined">
                                {isSlotEmpty ? (
                                  <Medal className="w-3.5 h-3.5 text-[#A68246]/80 shrink-0 ml-auto" />
                                ) : (
                                  <>
                                    <span className="text-[#9A7438] font-semibold">
                                      Lihat Perincian Sijil
                                    </span>
                                    <ChevronRight className="w-3.5 h-3.5 text-[#9A7438] group-hover:translate-x-1 transition-transform" />
                                  </>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {filteredAwards.length === 0 && (
              <div className="text-center py-12 frosted-plaster-card rounded-2xl">
                <p className="font-serif-luxury text-base text-[#6E5A42] italic">
                  Tiada rekod penerima ditemui untuk carian ini.
                </p>
              </div>
            )}

            <div className="mt-12 flex justify-center">
              <SectionScrollChevron targetId="galeri" label="Skrol ke Galeri Memori" />
            </div>
          </div>
        </SunlitArchSection>

        {/* 6. GALERI MEMORI & ASPIRASI PELAJAR */}
        <SunlitArchSection id="galeri" scene="dappled-plaster">
          <div className="max-w-6xl mx-auto px-6">
            <RevealOnScroll className="text-center mb-12">
              <span className="text-xs font-crest uppercase tracking-[0.25em] text-[#9A7438] font-bold">
                Rakaman Detik Indah
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-medium text-[#3B3127] mt-2 text-balance">
                Galeri Memori &amp; Aspirasi Pelajar
              </h2>
              <p className="text-xs font-sans-refined text-[#6E5A42] mt-2 max-w-lg mx-auto">
                Sorotan suasana Dewan SRTLDB, keceriaan graduan cilik serta kebanggaan guru dan ibu bapa.
              </p>
              <OrnateGoldDivider className="mt-4" />
            </RevealOnScroll>

            <RevealOnScroll delay={0.12}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
                {GALLERY_MEMORIES.map((item) => (
                  <div
                    key={item.id}
                    className={`${item.gridClass} relative rounded-t-[110px] rounded-b-2xl overflow-hidden border-2 border-[#FAF6F0] bg-[#3B3127] shadow-[0_18px_42px_-16px_rgba(92,68,36,0.22)] group`}
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className={`w-full ${item.heightClass} object-cover ${item.objectPositionClass} group-hover:scale-105 transition-transform duration-700`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2B2219]/85 via-[#2B2219]/25 to-transparent flex flex-col justify-end p-6 text-[#FAF6F0]">
                      <span className="text-[10px] font-crest tracking-widest uppercase text-[#E5CE9E]">
                        {item.kicker}
                      </span>
                      <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold mt-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#EDE2D0] font-sans-refined mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="frosted-plaster-card p-5 rounded-2xl">
                <p className="font-serif-luxury text-sm italic text-[#3B3127]">
                  &ldquo;Terima kasih cikgu-cikgu SRTLDB kerana sentiasa mendidik kami dengan penuh kasih sayang dan kesabaran.&rdquo;
                </p>
                <p className="text-[11px] font-crest uppercase tracking-wider text-[#9A7438] mt-3 font-bold">
                  — Graduan Tahun 6A Ijtihad
                </p>
              </div>

              <div className="frosted-plaster-card p-5 rounded-2xl">
                <p className="font-serif-luxury text-sm italic text-[#3B3127]">
                  &ldquo;Saya gembira dapat belajar membaca, menyanyi dan melukis bersama kawan-kawan di Pra Darulehsan!&rdquo;
                </p>
                <p className="text-[11px] font-crest uppercase tracking-wider text-[#9A7438] mt-3 font-bold">
                  — Murid Pra Darulehsan
                </p>
              </div>

              <div className="frosted-plaster-card p-5 rounded-2xl">
                <p className="font-serif-luxury text-sm italic text-[#3B3127]">
                  &ldquo;Disiplin dan adab mulia yang disemai di sekolah ini akan menjadi pedoman kami sepanjang hayat.&rdquo;
                </p>
                <p className="text-[11px] font-crest uppercase tracking-wider text-[#9A7438] mt-3 font-bold">
                  — Graduan Tahun 6B Syafa’at
                </p>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <SectionScrollChevron targetId="penghargaan" label="Skrol ke Penghargaan" />
            </div>
          </div>
        </SunlitArchSection>

        {/* 7. PENGHARGAAN */}
        <SunlitArchSection id="penghargaan" scene="candles-stepped-arch">
          <div className="w-full max-w-[260px] sm:max-w-[360px] mx-auto text-center">
            <RevealOnScroll>
              <SchoolCrest size="sm" className="mx-auto mb-2.5 sm:mb-3.5 scale-90 sm:scale-100" />

              <h2 className="font-serif-luxury text-2xl sm:text-4xl font-medium text-[#3B3127] leading-[1.12] text-balance">
                Jazakumullahu Khairan Kathira
              </h2>

              <OrnateGoldDivider widthClass="w-32 sm:w-44" className="my-3 sm:my-4" />

              <div className="space-y-2.5 sm:space-y-3 font-sans-refined text-[11px] sm:text-[13px] text-[#4A3B2B] leading-relaxed">
                <p>
                  Sekalung penghargaan dan terima kasih atas kehadiran, doa restu serta sokongan padu sekalian ibu bapa, penjaga dan barisan pendidik.
                </p>
                <p>
                  Semoga Allah Subhanahu Wata&apos;ala memberkati majlis penuh bermakna ini dan mengurniakan kejayaan berpanjangan buat anak-anak graduan SRTLDB Muara.
                </p>
              </div>

              <div className="mt-4 sm:mt-6">
                <p className="text-[11px] sm:text-xs font-sans-refined text-[#6E5A42]">
                  Dengan tulus ikhlas,
                </p>
                <p className="font-script text-2xl sm:text-4xl text-[#7A5820] mt-0.5">
                  Warga Pendidik SRTLDB Muara
                </p>
                <p className="mt-1 text-[9px] sm:text-[10px] font-crest uppercase tracking-[0.2em] text-[#7D6A54] font-bold">
                  Jawatankuasa Kerja Konvokesyen SRTLDB 2026
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </SunlitArchSection>
      </main>

      {/* 8. FOOTER */}
      <footer className="bg-[#3B3127] text-[#FAF6F0] py-12 px-6 border-t border-[#C8A66A]/35">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#FAF6F0]/15 pb-8 text-xs font-sans-refined">
          <div className="flex items-center gap-3">
            <SchoolCrest size="sm" className="scale-90" />
            <div>
              <p className="font-crest text-sm font-bold tracking-wider text-[#E5CE9E]">
                {event.institution}
              </p>
              <p className="text-[#FAF6F0]/65 text-[11px]">
                {event.venueName}, Negara Brunei Darussalam
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[#FAF6F0]/80">
            <a href="#hero" className="hover:text-[#E5CE9E] transition-colors">
              Utama
            </a>
            <a href="#aturcara" className="hover:text-[#E5CE9E] transition-colors">
              Atur Cara
            </a>
            <a href="#amanat" className="hover:text-[#E5CE9E] transition-colors">
              Amanat
            </a>
            <a href="#anugerah" className="hover:text-[#E5CE9E] transition-colors">
              Penerima Hadiah
            </a>
            <a href="#galeri" className="hover:text-[#E5CE9E] transition-colors">
              Galeri
            </a>
          </div>

          <button
            type="button"
            onClick={() => {
              playGentleTap();
              onReplayEnvelope();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#4E4134] hover:bg-[#5E4F40] border border-[#C8A66A]/40 text-[#E5CE9E] text-xs font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Buka Semula Sampul</span>
          </button>
        </div>

        <div className="max-w-6xl mx-auto mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#FAF6F0]/50 tabular-nums">
          <p>© 2026 {event.institution}. Hak Cipta Terpelihara.</p>
          <p>Kad Jemputan Digital Konvokesyen — SRTLDB Muara</p>
        </div>
      </footer>

      {/* FLOATING MUSIC STOP / PLAY BUTTON */}
      <button
        type="button"
        onClick={toggleBackgroundMusic}
        className={`fixed bottom-5 right-5 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-sans-refined font-semibold shadow-md transition-colors cursor-pointer whitespace-nowrap ${
          musicPlaying
            ? 'bg-[#3B3127] hover:bg-[#524436] text-[#FAF6F0] border border-[#C8A66A]/60'
            : 'bg-[#FAF6F0]/96 hover:bg-white text-[#3B3127] border border-[#C8A66A]'
        }`}
        aria-label={musicPlaying ? 'Hentikan muzik latar' : 'Mainkan muzik latar'}
      >
        {musicPlaying ? (
          <Volume2 className="w-3.5 h-3.5 text-[#DFC896]" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-[#8C7A64]" />
        )}
        <span>{musicPlaying ? 'Henti Muzik' : 'Mainkan Muzik'}</span>
      </button>

      {/* MODALS */}
      <EditDetailsModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        event={event}
        onSave={(updated) => onUpdateEvent(updated)}
      />

      <RecipientDetailModal
        isOpen={Boolean(selectedRecipient)}
        onClose={() => setSelectedRecipient(null)}
        recipient={selectedRecipient}
      />
    </div>
  );
};
