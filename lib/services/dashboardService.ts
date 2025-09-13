import { authApi, publicApi } from '../api';
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
  CompanySetting,
} from '../types/dashboard';
import { AxiosErrorResponse } from '../types/error';

interface BlogAgentInput {
  user_query: string;
  category: string;
  language: string;
  source: string;
  prompt_version: string;
}

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
      throw new Error(errorMessage as string);
    }
  }

  async getAllBlogs(): Promise<Blog[]> {
    try {
      const response = await authApi.get<Blog[]>('/api/core/blog/');
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch blogs';
      throw new Error(errorMessage as string);
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
        if (data.image instanceof File || typeof data.image === 'string') {
          formData.append('image', data.image);
        } else {
          throw new Error('Invalid image format. Must be a File or string.');
        }
      }
  
      const response = await authApi.post<Blog>('/api/core/blog/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      return response.data;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? `Failed to create blog: ${error.message}`
          : 'Failed to create blog due to an unknown error';
      throw new Error(errorMessage);
    }
  }

  async createBlogWithAI(data: BlogAgentInput): Promise<{ message: string; task_id: string }> {
    try {
      const response = await authApi.post<{ message: string; task_id: string }>('/blog_agent/api/blog-agent/', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosErrorResponse;
      const data = err.response?.data;
      const errorMessage =
        data?.error ||
        data?.non_field_errors?.[0] ||
        (data && Object.values(data)[0] && Array.isArray(Object.values(data)[0]) ? Object.values(data)[0] : 'Failed to start blog creation task');
        throw new Error(errorMessage as string);
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

  async updatePortfolio(id: string, data: UpdatePortfolioData | FormData): Promise<Portfolio> {
    try {
      const isFormData = data instanceof FormData;
      const payload = isFormData ? data : (() => {
        const form = new FormData();
        if (data.title) form.append('title', data.title);
        if (data.description) form.append('description', data.description);
        if (data.status) form.append('status', data.status);
        if (data.image) form.append('image', data.image);
        if (data.link) form.append('link', data.link);
        if (data.technologies) form.append('technologies', data.technologies);
        if (data.project_url) form.append('project_url', data.project_url);
        if (data.github_url) form.append('github_url', data.github_url);
        return form;
      })();
  
      const response = await authApi.put<Portfolio>(
        `/api/portfolio/portfolios/${id}/`,
        payload,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
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

  async getCompanySettings(): Promise<CompanySetting> {
    try {
      const response = await publicApi.get<CompanySetting>('/api/core/setting/');
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosErrorResponse;
      const data = err.response?.data;
      const message = data?.message || 'Failed to fetch company settings';
      throw new Error(message);
    }
  }

  async createOrUpdateCompanySettings(data: FormData | Partial<CompanySetting>): Promise<CompanySetting> {
    try {
      const isFormData = data instanceof FormData;
      const payload = isFormData ? data : (() => {
        const form = new FormData();
        if (data.office_location) form.append('office_location', data.office_location);
        if (data.emails) form.append('emails', JSON.stringify(data.emails));
        if (data.phones) form.append('phones', JSON.stringify(data.phones));
        if (data.facebook) form.append('facebook', data.facebook);
        if (data.twitter) form.append('twitter', data.twitter);
        if (data.instagram) form.append('instagram', data.instagram);
        if (data.linkedin) form.append('linkedin', data.linkedin);
        if (data.github) form.append('github', data.github);
        if (data.privacy_policy) form.append('privacy_policy', data.privacy_policy);
        if (data.terms_of_service) form.append('terms_of_service', data.terms_of_service);
        if (data.cookies_policy) form.append('cookies_policy', data.cookies_policy);
        if (data.company_tagline) form.append('company_tagline', data.company_tagline);
        return form;
      })();

      const response = await authApi.post<CompanySetting>('/api/core/setting/', payload, {
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
        'Failed to create or update company settings';
      throw new Error(message);
    }
  }
}

export const dashboardService = DashboardService.getInstance();
export default dashboardService;