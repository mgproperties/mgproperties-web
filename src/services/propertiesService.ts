// services/propertiesService.ts

import { propertiesCache } from '@/utils/propertiesCache';
import { PropertyData } from '@/contexts/FilterContext';

function calculateDays(timestamp: string): number {
  const inputDate = new Date(timestamp);
  const today = new Date();
  const utcInput = Date.UTC(
    inputDate.getUTCFullYear(),
    inputDate.getUTCMonth(),
    inputDate.getUTCDate()
  );
  const utcToday = Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate()
  );
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((utcToday - utcInput) / millisecondsPerDay) + 1;
}

export interface PropertiesData {
  allProperties: PropertyData[];
  featuredProperties: PropertyData[];
  userProperties: PropertyData[];
}

class PropertiesService {
  private async fetchFromAPI(endpoint: string): Promise<PropertyData[]> {
    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: PropertyData[] = await response.json();
      
      // Add calculated fields
      return result.map((property) => ({
        ...property,
        daysOnMarket: calculateDays(property.listedOn),
      }));
    } catch (error) {
      console.error("Error fetching properties:", error);
      throw error;
    }
  }

  async getAllProperties(userRole?: string, userId?: string): Promise<PropertyData[]> {
    // Check cache first
    const cached = propertiesCache.get<PropertyData[]>('properties', userRole, userId);
    if (cached) {
      console.log('Returning cached properties');
      return cached;
    }

    console.log('Fetching properties from API');
    
    // Determine endpoint based on user role
    const endpoint = userRole === 'admin' || !userRole
      ? 'api/properties' 
      : 'api/admin/my-properties';
    
    const properties = await this.fetchFromAPI(endpoint);
    
    // Cache the result
    propertiesCache.set('properties', properties, userRole, userId);
    
    return properties;
  }

  async getPropertiesData(userRole?: string, userId?: string): Promise<PropertiesData> {
    const allProperties = await this.getAllProperties(userRole, userId);
    
    const featuredProperties = allProperties.filter(property => property.featured);
    
    const userProperties = userRole === 'agent' 
      ? allProperties // Agents already get filtered results from API
      : allProperties.filter(property => property.agent_id === userId);

    return {
      allProperties,
      featuredProperties,
      userProperties
    };
  }

  getFeaturedProperties(allProperties: PropertyData[]): PropertyData[] {
    return allProperties.filter(property => property.featured);
  }

  invalidateCache(userRole?: string, userId?: string): void {
    propertiesCache.invalidate('properties', userRole, userId);
  }

  invalidateAllCache(): void {
    propertiesCache.invalidate();
  }

  invalidateUserCache(userId: string): void {
    propertiesCache.invalidateUserCache(userId);
  }
}

export const propertiesService = new PropertiesService();