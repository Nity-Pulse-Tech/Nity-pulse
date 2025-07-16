import { authApi } from '../api';
import {
  Blog,
  Portfolio,
  Testimonial,
  ContactMessage,
  DashboardStats,
  CreateBlogData,
  UpdateBlogData,
  UpdatePortfolioData,
  UpdateTestimonialData,
} from '../types/dashboard';
import { AxiosErrorResponse } from '../types/error';

class DashboardService {
  private static instance: DashboardService;

  private constructor() {}

  public static getInstance(): DashboardService {
    if (!DashboardService.instance) {
      DashboardService.instance = new DashboardService();
    }
    return DashboardService.instance;
  }

  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const [blogs, portfolios, testimonials, messages] = await Promise.all([
        this.getAllBlogs(),
        this.getAllPortfolios(),
        this.getAllTestimonials(),
        this.getAllContactMessages(),
      ]);

      return {
        totalUsers: 0,
        totalBlogs: blogs.length,
        totalPortfolios: portfolios.length,
        totalTestimonials: testimonials.length,
        totalMessages: messages.length,
        publishedBlogs: blogs.filter(blog => blog.status === 'PUBLISHED').length,
        publishedPortfolios: portfolios.filter(portfolio => portfolio.status === 'PUBLISHED').length,
        publishedTestimonials: testimonials.filter(testimonial => testimonial.status === 'PUBLISHED').length,
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch dashboard stats';
      throw new Error(errorMessage);
    }
  }

  async getAllBlogs(): Promise<Blog[]> {
    try {
      const response = await authApi.get<Blog[]>('/api/core/blog/');
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch blogs';
      throw new Error(errorMessage);
    }
  }

  async getBlog(id: string): Promise<Blog> {
    try {
      const response = await authApi.get<Blog>(`/api/core/blog/${id}/`);
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch blog';
      throw new Error(errorMessage);
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
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create blog';
      throw new Error(errorMessage);
    }
  }

  async updateBlog(id: string, data: UpdateBlogData | FormData): Promise<Blog> {
    try {
      const headers =
        data instanceof FormData
          ? { 'Content-Type': 'multipart/form-data' }
          : { 'Content-Type': 'application/json' };

      const response = await authApi.put<Blog>(`/api/core/blog/${id}/`, data, { headers });
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update blog';
      throw new Error(errorMessage);
    }
  }

  async deleteBlog(id: string): Promise<void> {
    try {
      await authApi.delete(`/api/core/blog/${id}/`);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete blog';
      throw new Error(errorMessage);
    }
  }

  async getAllPortfolios(): Promise<Portfolio[]> {
    try {
      const response = await authApi.get<Portfolio[]>('/api/portfolio/portfolios/');
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch portfolios';
      throw new Error(errorMessage);
    }
  }

  async getPortfolio(id: string): Promise<Portfolio> {
    try {
      const response = await authApi.get<Portfolio>(`/api/portfolio/portfolios/${id}/`);
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch portfolio';
      throw new Error(errorMessage);
    }
  }

  async createPortfolio(data: FormData): Promise<Portfolio> {
    try {
      const response = await authApi.post<Portfolio>('/api/portfolio/portfolios/', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosErrorResponse;
      const data = err.response?.data;

      const fallback = data && Object.values(data)[0];
      const message =
        data?.message ||
        data?.non_field_errors?.[0] ||
        (Array.isArray(fallback) ? fallback[0] : fallback) ||
        'Failed to create portfolio';

      throw new Error(message);
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
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update portfolio';
      throw new Error(errorMessage);
    }
  }

  async deletePortfolio(id: string): Promise<void> {
    try {
      await authApi.delete(`/api/portfolio/portfolios/${id}/`);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete portfolio';
      throw new Error(errorMessage);
    }
  }

  async getAllTestimonials(isAdmin: boolean = false): Promise<Testimonial[]> {
    try {
      const url = isAdmin ? '/api/core/testimonial/?status=all' : '/api/core/testimonial/';
      const response = await authApi.get<Testimonial[]>(url);
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosErrorResponse;
      const data = err.response?.data;
      const message = data?.message || 'Failed to fetch testimonials';
      throw new Error(message);
    }
  }

  async getTestimonial(id: string): Promise<Testimonial> {
    try {
      const response = await authApi.get<Testimonial>(`/api/core/testimonial/${id}/`);
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch testimonial';
      throw new Error(errorMessage);
    }
  }

  async createTestimonial(data: FormData): Promise<Testimonial> {
    try {
      const response = await authApi.post<Testimonial>('/api/core/testimonial/', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create testimonial';
      throw new Error(errorMessage);
    }
  }

  async updateTestimonial(id: string, data: UpdateTestimonialData | FormData): Promise<Testimonial> {
    try {
      const headers =
        data instanceof FormData
          ? { 'Content-Type': 'multipart/form-data' }
          : { 'Content-Type': 'application/json' };

      const response = await authApi.put<Testimonial>(`/api/core/testimonial/${id}/`, data, { headers });
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosErrorResponse;
      const response = err.response;
      const data = response?.data;
      const fallback = data && Object.values(data)[0];

      const errorMessage =
        data?.message ||
        data?.non_field_errors?.[0] ||
        (Array.isArray(fallback) ? fallback[0] : fallback) ||
        'Failed to update testimonial';

      throw new Error(errorMessage);
    }
  }

  async deleteTestimonial(id: string): Promise<void> {
    try {
      await authApi.delete(`/api/core/testimonial/${id}/`);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete testimonial';
      throw new Error(errorMessage);
    }
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    try {
      const response = await authApi.get<ContactMessage[]>('/api/core/contact/');
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch contact messages';
      throw new Error(errorMessage);
    }
  }

  async getContactMessage(id: string): Promise<ContactMessage> {
    try {
      const response = await authApi.get<ContactMessage>(`/api/core/contact/${id}/`);
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch contact message';
      throw new Error(errorMessage);
    }
  }

  async deleteContactMessage(id: string): Promise<void> {
    try {
      await authApi.delete(`/api/core/contact/${id}/`);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete contact message';
      throw new Error(errorMessage);
    }
  }
}

export const dashboardService = DashboardService.getInstance();
export default dashboardService;
