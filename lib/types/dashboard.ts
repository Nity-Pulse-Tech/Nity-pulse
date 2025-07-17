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
  project_url?: string; // ✅ Add this
  technologies?: string;
  github_url?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  user: string;
  created: string;
  modified: string;
}



export interface Testimonial {
  id: string;
  name: string; // <-- changed from author_name to name, required field
  content: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  user: string;
  image?: string | null;  // optional
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
  title: string;
  description: string;
  technologies: string;
  project_url: string;
  github_url: string;
  status: PortfolioStatus; // 👈 expects EXACTLY one of those three strings
  image?: File | null;   // add this
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


export interface CreatePortfolioData {
  title: string;
  description: string;
  image?: File;
  link?: string; // Changed from project_url
  technologies?: string; // Added
  github_url?: string; // Added
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}

export type PortfolioStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";



export type APIErrorResponse = {
  message?: string;
  non_field_errors?: string[];
  [key: string]: string[] | string | undefined;
};
