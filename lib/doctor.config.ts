export type DoctorConfig = {
  name: string;
  shortName: string;
  title: string;
  cmcper: string;
  cedula: string;
  experience: string;
  whatsapp: string;
  calUsername: string;
  clinic: string;
  address: string;
  hospital: string;
  credentials: string[];
  procedures: {
    key: string;
    highlight: boolean;
  }[];
  stats: {value: string; labelKey: string}[];
  instagram?: string;
  facebook?: string;
  website?: string;
  reviewScore?: string;
  reviewCount?: string;
  reviewSource?: string;
  metaDescription: {es: string; en: string};
};

const doctorConfig: DoctorConfig = {
  name: 'Dr. Marco Polo Apáez Araujo',
  shortName: 'Dr. Apáez',
  title: 'Cirujano Plástico y Reconstructivo',
  cmcper: '1571',
  cedula: 'DGP 776889',
  experience: '26 años de experiencia',
  whatsapp: '523315738289',
  calUsername: 'dr-marco-polo',
  clinic: 'UMICPER & SPA',
  address: 'Torre Élite, Av. Empresarios 150, Puerta de Hierro',
  hospital: 'Hospital Puerta de Hierro Norte (Andares)',
  credentials: ['CMCPER 1571', 'AMCPER', 'Cédula DGP 776889'],
  procedures: [
    {key: 'rinoplastia', highlight: true},
    {key: 'blefaroplastia', highlight: false},
    {key: 'lifting-facial', highlight: false},
    {key: 'liposuccion', highlight: false},
    {key: 'mamoplastia-aumento', highlight: true},
    {key: 'abdominoplastia', highlight: false},
    {key: 'otoplastia', highlight: false},
    {key: 'mentoplastia', highlight: false}
  ],
  stats: [
    {value: '26', labelKey: 'statsLabels.yearsExperience'},
    {value: 'CMCPER 1571', labelKey: 'statsLabels.boardCertified'},
    {value: '4.9', labelKey: 'statsLabels.reviewScore'}
  ],
  instagram: 'https://instagram.com/dr.marcopoloapaez',
  facebook: 'https://facebook.com/dr.marcopoloapaez',
  website: 'https://drmarcopoloapaez.com',
  reviewScore: '4.9',
  reviewCount: '52',
  reviewSource: 'MedicinPRO',
  metaDescription: {
    es: 'Dr. Marco Polo Apáez Araujo, cirujano plástico y reconstructivo en Puerta de Hierro, Guadalajara. Consulta privada y resultados naturales.',
    en: 'Dr. Marco Polo Apáez Araujo, plastic and reconstructive surgeon in Puerta de Hierro, Guadalajara. Private consultations and natural outcomes.'
  }
};

export default doctorConfig;
