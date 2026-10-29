import { AwardRecipient, EventDetails, ProgrammeItem } from '../types/invitation';

export const INITIAL_EVENT_DETAILS: EventDetails = {
  title: 'Majlis Konvokesyen Pra, Tahun 6 & Anugerah Pelajar Cemerlang',
  subTitle: 'Sekolah Rendah Tentera Laut Diraja Brunei, Muara',
  institution: 'Sekolah Rendah Tentera Laut Diraja Brunei (SRTLDB)',
  baseLocation: 'Pangkalan Tentera Laut Diraja Brunei, Muara',
  dateMalay: 'Selasa, 24 November 2026',
  dateGregorian: '24 November 2026',
  dateISO: '2026-11-24T08:00:00',
  timeMalay: '08:00 Pagi hingga Selesai',
  venueName: 'Dewan SRTLDB',
  hallName: 'Dewan SRTLDB',
  address: 'Sekolah Rendah Tentera Laut Diraja Brunei, Jalan Pelabuhan, Pekan Muara, BT1128, Negara Brunei Darussalam',
  organizer: 'Jawatankuasa Kerja Konvokesyen & Hari Anugerah SRTLDB',
  contactEmail: 'srtldb.muara@moe.edu.bn',
};

export const PROGRAMME_ITEMS: ProgrammeItem[] = [
  {
    time: '07:45 AM',
    title: 'Ketibaan Tetamu & Pendaftaran Ibu Bapa',
    description: 'Pendaftaran kehadiran para ibu bapa, penjaga dan tetamu jemputan di foyer Dewan SRTLDB.',
    category: 'ketibaan',
  },
  {
    time: '08:15 AM',
    title: 'Ketibaan Tetamu Kehormat & Barisan Pentadbir',
    description: 'Menyambut ketibaan Tetamu Kehormat dan barisan pentadbir sekolah ke Dewan SRTLDB.',
    speaker: 'Tetamu Kehormat & Barisan Guru Kanan',
    category: 'ketibaan',
  },
  {
    time: '08:30 AM',
    title: 'Lagu Kebangsaan & Lagu Rasmi Sekolah',
    description: 'Nyanyian beramai-ramai Lagu Kebangsaan "Allah Peliharakan Sultan" dan lagu rasmi kemegahan SRTLDB.',
    category: 'protokol',
  },
  {
    time: '08:40 AM',
    title: 'Bacaan Surah Al-Fatihah & Doa Selamat',
    description: 'Memohon keberkatan majlis dengan bacaan Al-Quran oleh wakil murid dan Doa Selamat.',
    speaker: 'Ustaz Haji Md. Firdaus bin Pengiran Haji Latif',
    category: 'protokol',
  },
  {
    time: '08:50 AM',
    title: 'Amanat & Ucapan Aluan Guru Besar',
    description: 'Ulasan pencapaian tahunan sekolah, pengiktirafan kecemerlangan kurikulum dan amanat khas buat para graduan.',
    speaker: 'Cikgu Dayang Hjh Rozita binti Haji Daud (Guru Besar SRTLDB)',
    category: 'protokol',
  },
  {
    time: '09:10 AM',
    title: 'Ucapan Perasmian Tetamu Kehormat',
    description: 'Amanat pembakar semangat mengenai jati diri, disiplin dan aspirasi Wawasan Brunei 2035.',
    speaker: 'Pegawai Kanan Pemerintah Tentera Laut Diraja Brunei',
    category: 'protokol',
  },
  {
    time: '09:30 AM',
    title: 'Penyampaian Sijil Konvokesyen Pra A & Pra B',
    description: 'Penyampaian Sijil Tamat Pra-Sekolah bagi Pra A Darulehsan dan Pra B Darul Aman.',
    category: 'penyampaian',
  },
  {
    time: '10:15 AM',
    title: 'Persembahan Khas Murid Pra-Sekolah',
    description: 'Persembahan kreatif bertemakan "Bintang Kecil Samudera" oleh murid-murid Pra-Sekolah.',
    category: 'persembahan',
  },
  {
    time: '10:35 AM',
    title: 'Penyampaian Sijil Konvokesyen Tahun 6A & 6B',
    description: 'Penyampaian Sijil Konvokesyen kepada para graduan Tahun 6A Ijtihad dan Tahun 6B Syafa’at.',
    category: 'penyampaian',
  },
  {
    time: '11:15 AM',
    title: 'Penyampaian Hadiah Murid Cemerlang PSR 2026',
    description: 'Penyampaian anugerah murid cemerlang Tahun 6 dalam peperiksaan PSR bagi setiap mata pelajaran sesi 2026.',
    category: 'penyampaian',
  },
  {
    time: '11:45 AM',
    title: 'Penyampaian Anugerah Murid Cemerlang Tahun 1 - 5',
    description: 'Pengiktirafan kecemerlangan murid bagi Tahun 1, Tahun 2, Tahun 3, Tahun 4 dan Tahun 5.',
    category: 'penyampaian',
  },
  {
    time: '12:05 PM',
    title: 'Ucapan Balas Wakil Graduan & Tayangan Video',
    description: 'Ungkapan penghargaan dan rasa terima kasih murid kepada barisan pendidik dan ibu bapa.',
    speaker: 'Wakil Murid Tahun 6 SRTLDB',
    category: 'persembahan',
  },
  {
    time: '12:20 PM',
    title: 'Sesi Bergambar Kenangan & Jamuan Santapan',
    description: 'Sesi fotografi rasmi bersama Tetamu Kehormat, guru-guru, graduan dan ibu bapa disusuli jamuan santapan hingga selesai majlis.',
    category: 'penutup',
  },
];

const PRA_A_DARULEHSAN_NAMES: string[] = [
  'Muhammad Aariz Anaqi bin Izzudin',
  'Mohammad Adzril Rizqi Bin Abdullah',
  'Muhammad Aidan Dayyan Bin Muhammad Hamdi',
  'Mohamad Arfan Adrian Bin Mohamad Azni',
  'Muhammad Athiff Nazrullah Bin Abdullah',
  'Muhammad Nor Aidil Zaqwan Bin Muhammad Nor Safwan',
  'Mohammad Qalif Ar-Rizq Bin Mohammad Sakani',
  'Muhammad Zafran Fathullah Bin Mohd Fuad',
  "Muhammad Adam Mikha'el Bin Riduwan",
  'Nur Adira Alisya Binti Muhammad Affandi',
  'Nur Ain Nuzul Naila Qalisha Binti Mohammad Sabar',
  'Nur Ariana Arissa Binti Mohammad Borhanizan',
  'Nur Eryna Farzana Binti Mohammad Firdaus',
  'Nur Izzah Khalisha Binti Mohammad Riduan',
  'Nur Jannah Syaurah Binti Mohammad Sulhi',
  'Nor Khaira Asy-Shafiyyah Binti Mohammad Safwan',
  'Nur Naila Safwanah Binti Muhammad Nasrin',
  'Nur Zahsy Inara Binti Muhammad Shamin',
  'Siti Nur Anna Damia Saffiya Binti Mohammad Akmal Ariff',
  'Nur Aleesa Batrisya binti Ansaruddinshah',
];

const PRA_A_DARULEHSAN_STUDENTS: AwardRecipient[] = PRA_A_DARULEHSAN_NAMES.map(
  (studentName, index) => {
    const num = index + 1;
    const padded = num < 10 ? `0${num}` : `${num}`;
    return {
      id: `pra-a-${padded}`,
      name: studentName,
      category: 'pra_a',
      categoryLabel: 'Sijil Konvokesyen',
      subCategory: 'Pra A Darulehsan',
      achievement: 'Graduan Sijil Tamat Pra-Sekolah Sesi Akademik 2026',
      citation:
        'Telah menamatkan pengajian peringkat Pra-Sekolah di Kelas Pra A Darulehsan, Sekolah Rendah Tentera Laut Diraja Brunei (SRTLDB) Muara dengan jayanya bagi Sesi Akademik 2026.',
      class: 'Pra A Darulehsan',
      seatNumber: num,
    };
  }
);

const PRA_B_DARUL_AMAN_NAMES: string[] = [
  'Abdul Mateen Rizqi Bin Mohamad Syaiful Bahri',
  'Muhammad Adam Aisy Asfa Islam Bin Muhammad Marzuqi',
  'Muhammad Affan Farish Bin Adi Syazwan',
  'Muhammad Arfan Aryyan Bin Zulhilmi',
  'Muhammad Dayyan Wildan Bin Mohammad Safar',
  'Muhammad Haiyan Bin Azmin',
  'Muhammad Izz Anaqi Bin Harun',
  "Mohammad Na'im Zuhair Bin Mohammad Khairul Anuar",
  'Nuur Mohammad Ammar Al-Firdaus Bin Mohammad Hilza',
  'Hayla Naura Binti Md Healy Zul Azzim',
  'Izzara Aniqah Binti Izzul Zaidan',
  'Nur Aafyah Shaqeena Binti Md Abd Hadi Ruzaini',
  'Nur Aila Kayyisa Binti Muhammad Zuhairi',
  'Nur Alisha Syazwina Binti Muhammad Shamsul',
  'Nur Alya Farida Binti Mohammad Fadillah',
  'Nur Hana Rizqah Binti Mohammad Rauf',
  'Nur Marissa Farzana Binti Mohammad Azhan Redzan',
  'Nur Zaira Amanda Binti Muhammad Nurulasmey @ Muhammad Basri',
];

const PRA_B_DARUL_AMAN_STUDENTS: AwardRecipient[] = PRA_B_DARUL_AMAN_NAMES.map(
  (studentName, index) => {
    const num = index + 1;
    const padded = num < 10 ? `0${num}` : `${num}`;
    return {
      id: `pra-b-${padded}`,
      name: studentName,
      category: 'pra_b',
      categoryLabel: 'Sijil Konvokesyen',
      subCategory: 'Pra B Darul Aman',
      achievement: 'Graduan Sijil Tamat Pra-Sekolah Sesi Akademik 2026',
      citation:
        'Telah menamatkan pengajian peringkat Pra-Sekolah di Kelas Pra B Darul Aman, Sekolah Rendah Tentera Laut Diraja Brunei (SRTLDB) Muara dengan jayanya bagi Sesi Akademik 2026.',
      class: 'Pra B Darul Aman',
      seatNumber: num,
    };
  }
);

const TAHUN_6A_IJTIHAD_NAMES: string[] = [
  'Mohammad Danise Ehsan bin Kennedy',
  'Mohammad Nurshafiq Syazwan bin Mohammad Norzaim',
  'Muhammad Al-Fatih bin Al-Husaini',
  'Muhammad Ashraf Safwan bin Mohammad Sahamsul',
  'Muhammad Fakhrul Muslim bin Muhammad Affandy',
  'Muhammad Fateh Umair bin Muhammad Fathur Marwan',
  'Muhammad Nur Fayyadh Rizqullah bin Mohammad Yusri',
  'Bibi Nurbatrisya Balqis binti Jamri',
  'Intan Khairunnisa binti Mohammad Syaiful Bahri',
  'Norhafizahtullah binti Abdullah',
  'Nur Faqihah Mashitah binti Mohammad Dzul Fadli',
  'Nurin Adawiyah binti Mohammad Alwardy',
  'Nurul Fakhirah binti Muhammad Hassan',
  'Nur Eryna Ellysha Jasmin binti Muhammad Hazman',
];

const TAHUN_6A_IJTIHAD_STUDENTS: AwardRecipient[] = TAHUN_6A_IJTIHAD_NAMES.map(
  (studentName, index) => {
    const num = index + 1;
    const padded = num < 10 ? `0${num}` : `${num}`;
    return {
      id: `tahun6a-${padded}`,
      name: studentName,
      category: 'tahun6_a',
      categoryLabel: 'Sijil Konvokesyen',
      subCategory: 'Tahun 6A Ijtihad',
      achievement: 'Graduan Sijil Konvokesyen Tahun 6 Sesi Akademik 2026',
      citation:
        'Telah menamatkan pengajian peringkat Rendah Atas di Kelas Tahun 6A Ijtihad, Sekolah Rendah Tentera Laut Diraja Brunei (SRTLDB) Muara dengan jayanya bagi Sesi Akademik 2026.',
      class: 'Tahun 6A Ijtihad',
      seatNumber: num,
    };
  }
);

const TAHUN_6B_SYAFAAT_NAMES: string[] = [
  'Gary Nadthan Nicholas',
  'Mohammad Amiruddin Aiman bin Mohamad Zulhelmi',
  'Mohammad Heizul Hazeeq bin Mohammad Hardiyatul Fadillah Hiszwan',
  'Mohammad Nurshafiq Syazreen bin Mohammad Norzaim',
  'Muhammad Aryan Rayqal Emleen bin Elvin',
  'Muhammad Adam Syafi bin Mohamad Samsul',
  'Muhammad Anaqi bin Awang Muhammad Aisamuddin',
  'Muhammad Fateh Uwais bin Muhammad Fathur Marwan',
  'Dahliyah Shakirah binti Mohamad Ikramin',
  'Dayangku Nurul Syafiqah binti Pengiran Shamshul Bahrin',
  'Nuraneesa binti Muhammad Azri',
  'Nur Syaziyah Safiyyah binti Mohamad Safar',
  'Nurul Auni Zulaikha binti Muhammad Hafiz',
  'Nur Dina Syafiqah binti Ermy Shahzaime',
  'Elsa Adlina Farzana binti Mohamad Azni',
];

const TAHUN_6B_SYAFAAT_STUDENTS: AwardRecipient[] = TAHUN_6B_SYAFAAT_NAMES.map(
  (studentName, index) => {
    const num = index + 1;
    const padded = num < 10 ? `0${num}` : `${num}`;
    return {
      id: `tahun6b-${padded}`,
      name: studentName,
      category: 'tahun6_b',
      categoryLabel: 'Sijil Konvokesyen',
      subCategory: 'Tahun 6B Syafa’at',
      achievement: 'Graduan Sijil Konvokesyen Tahun 6 Sesi Akademik 2026',
      citation:
        'Telah menamatkan pengajian peringkat Rendah Atas di Kelas Tahun 6B Syafa’at, Sekolah Rendah Tentera Laut Diraja Brunei (SRTLDB) Muara dengan jayanya bagi Sesi Akademik 2026.',
      class: 'Tahun 6B Syafa’at',
      seatNumber: num,
    };
  }
);

export const AWARD_RECIPIENTS: AwardRecipient[] = [
  // 1. PRA A DARULEHSAN (20 MURID)
  ...PRA_A_DARULEHSAN_STUDENTS,

  // 2. PRA B DARUL AMAN (18 MURID)
  ...PRA_B_DARUL_AMAN_STUDENTS,

  // 3. TAHUN 6A IJTIHAD (14 MURID)
  ...TAHUN_6A_IJTIHAD_STUDENTS,

  // 4. TAHUN 6B SYAFA’AT (15 MURID)
  ...TAHUN_6B_SYAFAAT_STUDENTS,

  // 5. PELAJAR CEMERLANG TAHUN 6 SESI 2026 (PELAJAR TERBAIK BAGI SUBJEK)
  {
    id: 'psr-bm',
    name: 'Awang Muhammad Danish Hakimi bin Rosli',
    category: 'psr_cemerlang',
    categoryLabel: 'Pelajar terbaik bagi subjek :',
    subCategory: 'Bahasa Melayu',
    achievement: '',
    citation: '',
    class: 'Tahun 6A',
  },
  {
    id: 'psr-bi',
    name: 'Dayang Nur Aisyah Humaira binti Pg. Hj. Kamal',
    category: 'psr_cemerlang',
    categoryLabel: 'Pelajar terbaik bagi subjek :',
    subCategory: 'English',
    achievement: '',
    citation: '',
    class: 'Tahun 6A',
  },
  {
    id: 'psr-mat',
    name: 'Awang Khairul Izzat bin Haji Zulkifli',
    category: 'psr_cemerlang',
    categoryLabel: 'Pelajar terbaik bagi subjek :',
    subCategory: 'Mathematics',
    achievement: '',
    citation: '',
    class: 'Tahun 6B',
  },
  {
    id: 'psr-sains',
    name: 'Dayang Siti Sarah Batrisya binti Abdullah',
    category: 'psr_cemerlang',
    categoryLabel: 'Pelajar terbaik bagi subjek :',
    subCategory: 'Science',
    achievement: '',
    citation: '',
    class: 'Tahun 6B',
  },
  {
    id: 'psr-mib',
    name: 'Mohammad Nurshafiq Syazreen bin Mohammad Norzaim',
    category: 'psr_cemerlang',
    categoryLabel: 'Pelajar terbaik bagi subjek :',
    subCategory: 'Melayu Islam Beraja',
    achievement: '',
    citation: '',
    class: 'Tahun 6B',
  },

  // 6. PELAJAR CEMERLANG MENGIKUT KELAS (TAHUN 1A HINGGA TAHUN 5A — KEDUDUKAN 1 HINGGA 3)
  ...([
    { className: 'Tahun 1A', idPrefix: 'cem-1a', slots: ['', '', ''] },
    { className: 'Tahun 1B', idPrefix: 'cem-1b', slots: ['', '', ''] },
    { className: 'Tahun 2A', idPrefix: 'cem-2a', slots: ['', '', ''] },
    { className: 'Tahun 2B', idPrefix: 'cem-2b', slots: ['', '', ''] },
    { className: 'Tahun 3A', idPrefix: 'cem-3a', slots: ['', '', ''] },
    { className: 'Tahun 3B', idPrefix: 'cem-3b', slots: ['', '', ''] },
    { className: 'Tahun 4A', idPrefix: 'cem-4a', slots: ['', '', ''] },
    { className: 'Tahun 4B', idPrefix: 'cem-4b', slots: ['', '', ''] },
    { className: 'Tahun 5A', idPrefix: 'cem-5a', slots: ['', '', ''] },
  ].flatMap(({ className, idPrefix, slots }) =>
    slots.map((studentName, idx): AwardRecipient => {
      const rank = idx + 1;
      const trimmed = studentName.trim();
      const isPlaceholder = trimmed === '';
      return {
        id: `${idPrefix}-${rank}`,
        name: isPlaceholder ? 'Ruang Nama Pelajar' : trimmed,
        category: 'cemerlang_tahunan',
        categoryLabel: 'Pelajar cemerlang mengikut kelas',
        subCategory: `Kedudukan ${rank}`,
        achievement: '',
        citation: '',
        class: className,
        rank,
        isPlaceholder,
      };
    })
  )),
];

export const CEMERLANG_KELAS_ORDER: string[] = [
  'Tahun 1A',
  'Tahun 1B',
  'Tahun 2A',
  'Tahun 2B',
  'Tahun 3A',
  'Tahun 3B',
  'Tahun 4A',
  'Tahun 4B',
  'Tahun 5A',
];
