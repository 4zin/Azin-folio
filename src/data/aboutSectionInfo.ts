import type { ImageMetadata } from 'astro';

import ropLogo from '../assets/svgs/rop-green-logo.svg';

export type aboutProject = {
  title: string;
  smallDescription: string;
  mediaSrc: ImageMetadata;
  link: string;
  stack: string[];
  redirect: string;
};

export const featuredProjects: aboutProject[] = [
  {
    title: 'Rop ST Digitall',
    smallDescription:
      'Corporate website built with Next.js, TypeScript, and Tailwind. Backend in Strapi for contact form management.',
    mediaSrc: ropLogo,
    link: 'https://ropstdigitall.com/',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Strapi'],
    redirect: '/projects/ropstdigitall',
  },
];
