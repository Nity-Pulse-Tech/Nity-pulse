export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  image?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  author: string;
  created: string;
  modified: string;
}

export interface Portfolio {
  id: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
  technologies?: string; // Added
  github_url?: string; // Added
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  user: string;
  created: string;
  modified: string;
}


export interface Testimonial {
  id: string;
  content: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  author_name: string;
  user: string;
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

export interface DashboardStats {
  totalUsers: number;
  totalBlogs: number;
  totalPortfolios: number;
  totalTestimonials: number;
  totalMessages: number;
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


export interface UpdatePortfolioData {
  title?: string;
  description?: string;
  image?: File;
  link?: string;
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
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


export interface CreatePortfolioData {
  title: string;
  description: string;
  image?: File;
  link?: string; // Changed from project_url
  technologies?: string; // Added
  github_url?: string; // Added
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}