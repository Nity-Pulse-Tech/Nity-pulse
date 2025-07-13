import { authApi } from '../api';
import {
  Blog,
  Portfolio,
  Testimonial,
  ContactMessage,
  DashboardStats,
  CreateBlogData,
  UpdateBlogData,
  CreatePortfolioData,
  UpdatePortfolioData,
  CreateTestimonialData,
  UpdateTestimonialData,
} from '../types/dashboard';

class DashboardService {
  private static instance: DashboardService;

  private constructor() {}

  public static getInstance(): DashboardService {
    if (!DashboardService.instance) {
      DashboardService.instance = new DashboardService();
    }
    return DashboardService.instance;
  }

  // Dashboard Stats
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      // For now, we'll calculate stats from individual endpoints
      // In a real app, you might have a dedicated stats endpoint
      const [blogs, portfolios, testimonials, messages] = await Promise.all([
        this.getAllBlogs(),
        this.getAllPortfolios(),
        this.getAllTestimonials(),
        this.getAllContactMessages(),
      ]);

      return {
        totalUsers: 0, // Would need a separate endpoint
        totalBlogs: blogs.length,
        totalPortfolios: portfolios.length,
        totalTestimonials: testimonials.length,
        totalMessages: messages.length,
        publishedBlogs: blogs.filter(blog => blog.status === 'PUBLISHED').length,
        publishedPortfolios: portfolios.filter(portfolio => portfolio.status === 'PUBLISHED').length,
        publishedTestimonials: testimonials.filter(testimonial => testimonial.status === 'PUBLISHED').length,
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch dashboard stats');
    }
  }

  // Blog Management
  async getAllBlogs(): Promise<Blog[]> {
    try {
      const response = await authApi.get<Blog[]>('/api/core/blog/');
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch blogs');
    }
  }

  async getBlog(id: string): Promise<Blog> {
    try {
      const response = await authApi.get<Blog>(`/api/core/blog/${id}/`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch blog');
    }
  }

  async createBlog(data: CreateBlogData): Promise<Blog> {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('status', data.status);
      if (data.image) {
        formData.append('image', data.image);
      }

      const response = await authApi.post<Blog>('/api/core/blog/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create blog');
    }
  }

  async updateBlog(id: string, data: UpdateBlogData): Promise<Blog> {
    try {
      const formData = new FormData();
      if (data.title) formData.append('title', data.title);
      if (data.content) formData.append('content', data.content);
      if (data.status) formData.append('status', data.status);
      if (data.image) formData.append('image', data.image);

      const response = await authApi.put<Blog>(`/api/core/blog/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update blog');
    }
  }

  async deleteBlog(id: string): Promise<void> {
    try {
      await authApi.delete(`/api/core/blog/${id}/`);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to delete blog');
    }
  }

  // Portfolio Management
  async getAllPortfolios(): Promise<Portfolio[]> {
    try {
      const response = await authApi.get<Portfolio[]>('/api/portfolio/portfolios/');
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch portfolios');
    }
  }

  async getPortfolio(id: string): Promise<Portfolio> {
    try {
      const response = await authApi.get<Portfolio>(`/api/portfolio/portfolios/${id}/`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch portfolio');
    }
  }

  async createPortfolio(data: CreatePortfolioData): Promise<Portfolio> {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('status', data.status);
      if (data.image) {
        formData.append('image', data.image);
      }
      if (data.link) {
        formData.append('link', data.link);
      }

      const response = await authApi.post<Portfolio>('/api/portfolio/portfolios/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create portfolio');
    }
  }

  async updatePortfolio(id: string, data: UpdatePortfolioData): Promise<Portfolio> {
    try {
      const formData = new FormData();
      if (data.title) formData.append('title', data.title);
      if (data.description) formData.append('description', data.description);
      if (data.status) formData.append('status', data.status);
      if (data.image) formData.append('image', data.image);
      if (data.link) formData.append('link', data.link);

      const response = await authApi.put<Portfolio>(`/api/portfolio/portfolios/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update portfolio');
    }
  }

  async deletePortfolio(id: string): Promise<void> {
    try {
      await authApi.delete(`/api/portfolio/portfolios/${id}/`);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to delete portfolio');
    }
  }

  // Testimonial Management
  async getAllTestimonials(): Promise<Testimonial[]> {
    try {
      const response = await authApi.get<Testimonial[]>('/api/core/testimonial/');
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch testimonials');
    }
  }

  async getTestimonial(id: string): Promise<Testimonial> {
    try {
      const response = await authApi.get<Testimonial>(`/api/core/testimonial/${id}/`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch testimonial');
    }
  }

  async createTestimonial(data: CreateTestimonialData): Promise<Testimonial> {
    try {
      const response = await authApi.post<Testimonial>('/api/core/testimonial/', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create testimonial');
    }
  }

  async updateTestimonial(id: string, data: UpdateTestimonialData): Promise<Testimonial> {
    try {
      const response = await authApi.put<Testimonial>(`/api/core/testimonial/${id}/`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update testimonial');
    }
  }

  async deleteTestimonial(id: string): Promise<void> {
    try {
      await authApi.delete(`/api/core/testimonial/${id}/`);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to delete testimonial');
    }
  }

  // Contact Messages
  async getAllContactMessages(): Promise<ContactMessage[]> {
    try {
      const response = await authApi.get<ContactMessage[]>('/api/core/contact/');
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch contact messages');
    }
  }

  async getContactMessage(id: string): Promise<ContactMessage> {
    try {
      const response = await authApi.get<ContactMessage>(`/api/core/contact/${id}/`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch contact message');
    }
  }

  async deleteContactMessage(id: string): Promise<void> {
    try {
      await authApi.delete(`/api/core/contact/${id}/`);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to delete contact message');
    }
  }
}

export const dashboardService = DashboardService.getInstance();
export default dashboardService; 