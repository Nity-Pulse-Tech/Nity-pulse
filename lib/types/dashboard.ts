export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  image?: string;
  image_url?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  author: string;
  created: string;
  modified: string;
  category?: string;
  read_time?: string;
}

export interface Portfolio {
  id: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
  project_url?: string;
  technologies?: string;
  github_url?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  user: string;
  created: string;
  modified: string;
}

export interface Testimonial {
  id: string;
  author_name: string;
  content: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  user: string;
  image?: string | null;
  position?: string | null;
  company?: string | null;
  rating: number;
  created: string;
  modified: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created: string;
  modified: string;
}

export interface Partner {
  id: string;
  name: string;
  image: string;
  created: string;
  modified: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalBlogs: number;
  totalPortfolios: number;
  totalTestimonials: number;
  totalMessages: number;
  totalPartners: number;
  publishedBlogs: number;
  publishedPortfolios: number;
  publishedTestimonials: number;
}

export interface CreateBlogData {
  title: string;
  content: string;
  image?: File;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}

export interface UpdateBlogData {
  title?: string;
  content?: string;
  image?: File | null;
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}

export interface CreatePortfolioData {
  title: string;
  description: string;
  image?: File;
  link?: string;
  technologies?: string;
  github_url?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}

export interface UpdatePortfolioData {
  title: string;
  description: string;
  technologies: string;
  project_url: string;
  github_url: string;
  status: PortfolioStatus;
  image?: File | null;
  link?: string;
}

export interface CreateTestimonialData {
  content: string;
  author_name: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}

export interface UpdateTestimonialData {
  name?: string;
  content?: string;
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  position?: string;
  company?: string;
  rating?: number;
  image?: File | null;
}

export interface CompanySetting {
  id: string;
  office_location: string;
  emails: string[];
  phones: string[];
  facebook?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  github?: string | null;
  privacy_policy?: string | null;
  terms_of_service?: string | null;
  cookies_policy?: string | null;
  company_tagline?: string | null;
  created: string;
  modified: string;
}

export type PortfolioStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export type APIErrorResponse = {
  message?: string;
  non_field_errors?: string[];
  [key: string]: string[] | string | undefined;
};