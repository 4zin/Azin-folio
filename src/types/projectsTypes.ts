export type smallDetails = {
  title: string;
  smallDescription: string;
  projectLogo: ImageMetadata;
  link: string;
  stack: string[];
  redirect: string;
};

export type Project = {
  projectLogo: ImageMetadata;
  title: string;
  id: string;
  description?: string;
  techStack?: string[];
  link: string;
  year?: string;
  role: string;
};
