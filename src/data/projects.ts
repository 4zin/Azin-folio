import type { smallDetails, Project } from '@/types/projectsTypes';

import ropLogo from '../assets/svgs/rop-green-logo.svg';
import klogsLogo from '../assets/images/klogs-logo.webp';

export const aboutSmallDetails: smallDetails[] = [
  {
    title: 'Rop ST Digitall',
    smallDescription:
      'Corporate website built with Next.js, TypeScript, and Tailwind. Backend in Strapi for contact form management.',
    projectLogo: ropLogo,
    link: 'https://ropstdigitall.com/',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Strapi'],
    redirect: 'ropstdigitall',
  },
  {
    title: 'Klogs Footwear',
    smallDescription: 'Implementation of a high-performance online store',
    projectLogo: klogsLogo,
    link: 'https://klogsfootwear.com/',
    stack: ['Liquid', 'Shopify', 'JavaScript'],
    redirect: 'klogsfootwear',
  },
];

export const projects: Project[] = [
  {
    projectLogo: ropLogo,
    title: 'Rop ST Digitall',
    id: 'ropstdigitall',
    description:
      'Corporate website built with Next.js, TypeScript, and Tailwind. Backend in Strapi for contact form management.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Strapi'],
    link: 'https://ropstdigitall.com/',
    year: '2024',
    role: 'Frontend Developer',
  },
  {
    projectLogo: klogsLogo,
    title: 'Klogs Footwear',
    id: 'klogsfootwear',
    description:
      'Implementation of a high-performance online store where personalization was the priority. Developed custom components specifically requested by the client, allowing full control over the brand aesthetic in Shopify.',
    techStack: ['Liquid', 'Shopify', 'JavaScript'],
    link: 'https://klogsfootwear.com/',
    year: '2024',
    role: 'Frontend Developer',
  },
];
