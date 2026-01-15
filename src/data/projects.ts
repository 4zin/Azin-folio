import type { smallDetails, Project } from '@/types/projectsTypes';

import ropLogo from '@/assets/svgs/rop-green-logo.svg';
import klogsLogo from '@/assets/images/klogs-logo.webp';
import bacchanalLogo from '@/assets/images/bacchanal-icon.webp';
import vionicLogo from '@/assets/images/vionic-big.avif';

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
  {
    projectLogo: bacchanalLogo,
    title: 'El Bacchanal',
    id: 'bacchanal',
    description:
      'Corporate website built with Astro, focused on performance and SEO optimization. Static-first architecture to ensure fast load times and improved search engine visibility.',
    techStack: ['Typescript', 'Astro', 'Tailwind', 'CSS'],
    link: 'https://elbacchanal.com/',
    year: '2025',
    role: 'Frontend Developer',
  },
  {
    projectLogo: vionicLogo,
    title: 'Vionic Shoes',
    id: 'vionic',
    description:
      'Advanced Shopify implementation built under complex client requirements. Developed a custom API using Cloudflare Workers to power a dynamic frontend carousel, along with a dedicated microservice for blog management outside Shopify’s native system.',
    techStack: ['Liquid', 'Shopify', 'Javascript', 'Cloudflare Workers'],
    link: 'https://vionicshoes.com.au/',
    year: '2025',
    role: 'Frontend Developer',
  },
];
