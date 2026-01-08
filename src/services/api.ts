const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private getAuthHeaders(): HeadersInit {
    const token = sessionStorage.getItem('agl_admin_token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  // Auth endpoints
  async login(username: string, password: string): Promise<{ token: string; user: { id: number; username: string } }> {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }

    return response.json();
  }

  async verifyToken(): Promise<{ valid: boolean; user: { userId: number; username: string } }> {
    const response = await fetch(`${this.baseUrl}/auth/verify`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Token verification failed');
    }

    return response.json();
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
    const response = await fetch(`${this.baseUrl}/auth/change-password`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Password change failed');
    }

    return response.json();
  }

  // Blog posts endpoints
  async getPublishedPosts(): Promise<BlogPost[]> {
    const response = await fetch(`${this.baseUrl}/posts/published`);

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    return response.json();
  }

  async getAllPosts(): Promise<BlogPost[]> {
    const response = await fetch(`${this.baseUrl}/posts`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    return response.json();
  }

  async getPostById(id: string): Promise<BlogPost> {
    const response = await fetch(`${this.baseUrl}/posts/id/${id}`);

    if (!response.ok) {
      throw new Error('Post not found');
    }

    return response.json();
  }

  async getPostBySlug(slug: string): Promise<BlogPost> {
    const response = await fetch(`${this.baseUrl}/posts/slug/${slug}`);

    if (!response.ok) {
      throw new Error('Post not found');
    }

    return response.json();
  }

  async createPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
    const response = await fetch(`${this.baseUrl}/posts`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(post),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create post');
    }

    return response.json();
  }

  async updatePost(id: string, post: Partial<BlogPost>): Promise<BlogPost> {
    const response = await fetch(`${this.baseUrl}/posts/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(post),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update post');
    }

    return response.json();
  }

  async deletePost(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/posts/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete post');
    }
  }

  // Contact form endpoints
  async sendContactForm(data: ContactFormData): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${this.baseUrl}/contact/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to send message');
    }

    return response.json();
  }

  async sendConsultationForm(data: ConsultationFormData): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${this.baseUrl}/contact/consultation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to send consultation request');
    }

    return response.json();
  }
}

// Types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ConsultationFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
}
export interface BlogPost {
  id: string;
  title: string;
  titleAr: string;
  slug: string;
  excerpt: string;
  excerptAr: string;
  content: string;
  contentAr: string;
  category: string;
  author: string;
  imageUrl: string;
  publishedAt: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export const apiService = new ApiService();
export default apiService;
