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

  async updateBlog(id: string, data: UpdateBlogData | FormData): Promise<Blog> {
    try {
      if (data instanceof FormData) {
        const response = await authApi.put<Blog>(`/api/core/blog/${id}/`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data;
      } else {
        const response = await authApi.put<Blog>(`/api/core/blog/${id}/`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return response.data;
      }
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

  async createPortfolio(data: FormData): Promise<Portfolio> {
    try {
      console.log('Sending create portfolio request:', Object.fromEntries(data));
      const response = await authApi.post<Portfolio>('/api/portfolio/portfolios/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Portfolio created:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Create portfolio error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw new Error(
        error.response?.data?.message ||
        error.response?.data?.non_field_errors?.[0] ||
        Object.values(error.response?.data || {})[0] ||
        'Failed to create portfolio'
      );
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
  async getAllTestimonials(isAdmin: boolean = false): Promise<Testimonial[]> {
    try {
      const url = isAdmin ? '/api/core/testimonial/?status=all' : '/api/core/testimonial/';
      const response = await authApi.get<Testimonial[]>(url);
      console.log('Fetched testimonials:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Fetch testimonials error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
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

  async createTestimonial(data: FormData): Promise<Testimonial> {
    try {
      const response = await authApi.post<Testimonial>('/api/core/testimonial/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create testimonial');
    }
  }

  async updateTestimonial(id: string, data: UpdateTestimonialData | FormData): Promise<Testimonial> {
    try {
      console.log('Sending update request for testimonial:', id, data instanceof FormData ? 'FormData' : data);
  
      const headers = data instanceof FormData
        ? { 'Content-Type': 'multipart/form-data' }
        : { 'Content-Type': 'application/json' };
  
      const response = await authApi.put<Testimonial>(`/api/core/testimonial/${id}/`, data, { headers });
  
      return response.data;
  
    } catch (error: any) {
      console.error('Update testimonial error:', {
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status,
      });
  
      const fallbackError =
        typeof error?.response?.data === 'object'
          ? Object.values(error.response.data)[0]
          : null;
  
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.non_field_errors?.[0] ||
        (Array.isArray(fallbackError) ? fallbackError[0] : fallbackError) ||
        'Failed to update testimonial';
  
      throw new Error(errorMessage);
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