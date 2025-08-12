// services/adminService.ts

import { adminCache } from '@/utils/adminCache';

interface ContactSubmission {
  inquiryID: string;
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  propertyType?: string;
  budget?: string;
  createdAt: Date;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "agent";
  status?: "active" | "invited";
  invited_at?: string;
  last_sign_in_at?: string;
}

interface UsersData {
  users: User[];
  currentUser: User | null;
}

class AdminService {
  // Contact Submissions
  async getContactSubmissions(): Promise<ContactSubmission[]> {
    const cached = adminCache.get<ContactSubmission[]>('contact-submissions');
    if (cached) {
      console.log('Returning cached contact submissions');
      return cached;
    }

    console.log('Fetching contact submissions from API');
    
    try {
      const response = await fetch('api/admin/submissions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const submissions: ContactSubmission[] = await response.json();
      
      // Cache the result
      adminCache.set('contact-submissions', submissions);
      
      return submissions;
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      throw error;
    }
  }

  // Users Management
  async getUsers(): Promise<UsersData> {
    const cached = adminCache.get<UsersData>('users-data');
    if (cached) {
      console.log('Returning cached users data');
      return cached;
    }

    console.log('Fetching users from API');
    
    try {
      const response = await fetch('api/admin/users');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: UsersData = await response.json();
      
      // Cache the result
      adminCache.set('users-data', data);
      
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  async createUser(userData: Omit<User, "id">): Promise<any> {
    try {
      const response = await fetch('api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      const result = await response.json();

      if (response.ok) {
        // Invalidate cache after successful creation
        this.invalidateUsersCache();
      }

      return { response, result };
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async updateUser(userId: string, userData: Omit<User, "id">): Promise<any> {
    try {
      const response = await fetch(`api/admin/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      const result = await response.json();

      if (response.ok) {
        // Invalidate cache after successful update
        this.invalidateUsersCache();
      }

      return { response, result };
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  async deleteUser(userId: string): Promise<Response> {
    try {
      const response = await fetch(`api/admin/users/${userId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        // Invalidate cache after successful deletion
        this.invalidateUsersCache();
      }

      return response;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }

  // Cache management methods
  invalidateContactSubmissionsCache(): void {
    adminCache.invalidate('contact-submissions');
  }

  invalidateUsersCache(): void {
    adminCache.invalidate('users-data');
  }

  invalidateAllAdminCache(): void {
    adminCache.invalidateAll();
  }

  // Force refresh methods (invalidate + fetch)
  async refreshContactSubmissions(): Promise<ContactSubmission[]> {
    this.invalidateContactSubmissionsCache();
    return this.getContactSubmissions();
  }

  async refreshUsers(): Promise<UsersData> {
    this.invalidateUsersCache();
    return this.getUsers();
  }
}

export const adminService = new AdminService();