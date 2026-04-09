import {PLACEHOLDER_IMAGE_PATH} from '@/lib/image';

export type DoctorLanguage = 'es' | 'en';

export type DoctorProfile = {
  id: string;
  nameKey: string;
  specialtyKey: string;
  calUsername: string;
  photoPlaceholder: string;
  languages: DoctorLanguage[];
};

export const doctors: DoctorProfile[] = [
  {
    id: 'doctor1',
    nameKey: 'doctor1.name',
    specialtyKey: 'doctor1.specialty',
    calUsername: process.env.NEXT_PUBLIC_CAL_DOCTOR1_USERNAME ?? '',
    photoPlaceholder: PLACEHOLDER_IMAGE_PATH,
    languages: ['es', 'en']
  },
  {
    id: 'doctor2',
    nameKey: 'doctor2.name',
    specialtyKey: 'doctor2.specialty',
    calUsername: process.env.NEXT_PUBLIC_CAL_DOCTOR2_USERNAME ?? '',
    photoPlaceholder: PLACEHOLDER_IMAGE_PATH,
    languages: ['es', 'en']
  },
  {
    id: 'doctor3',
    nameKey: 'doctor3.name',
    specialtyKey: 'doctor3.specialty',
    calUsername: process.env.NEXT_PUBLIC_CAL_DOCTOR3_USERNAME ?? '',
    photoPlaceholder: PLACEHOLDER_IMAGE_PATH,
    languages: ['es', 'en']
  },
  {
    id: 'doctor4',
    nameKey: 'doctor4.name',
    specialtyKey: 'doctor4.specialty',
    calUsername: process.env.NEXT_PUBLIC_CAL_DOCTOR4_USERNAME ?? '',
    photoPlaceholder: PLACEHOLDER_IMAGE_PATH,
    languages: ['es', 'en']
  },
  {
    id: 'doctor5',
    nameKey: 'doctor5.name',
    specialtyKey: 'doctor5.specialty',
    calUsername: process.env.NEXT_PUBLIC_CAL_DOCTOR5_USERNAME ?? '',
    photoPlaceholder: PLACEHOLDER_IMAGE_PATH,
    languages: ['es', 'en']
  },
  {
    id: 'doctor6',
    nameKey: 'doctor6.name',
    specialtyKey: 'doctor6.specialty',
    calUsername: process.env.NEXT_PUBLIC_CAL_DOCTOR6_USERNAME ?? '',
    photoPlaceholder: PLACEHOLDER_IMAGE_PATH,
    languages: ['es', 'en']
  }
];
