import type { Metadata } from 'next';

export const OWNER_URL = 'https://github.com/Naimikan';
export const REPOSITORY_URL = 'https://github.com/Naimikan/jarl';

export const METADATA: Metadata = {
  title: {
    template: 'Jarl | %s',
    default: 'Jarl - Just another react libray',
  },
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
  description: 'JARL - Just another react library',
  creator: 'Naimikan',
};
