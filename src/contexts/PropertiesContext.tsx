// contexts/PropertiesContext.tsx

"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { PropertyData } from '@/contexts/FilterContext';
import { propertiesService, PropertiesData } from '@/services/propertiesService';

interface PropertiesContextType {
  // Data
  allProperties: PropertyData[];
  featuredProperties: PropertyData[];
  userProperties: PropertyData[];
  
  // State
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchProperties: (userRole?: string, userId?: string) => Promise<void>;
  invalidateCache: (userRole?: string, userId?: string) => void;
  invalidateAllCache: () => void;
  refetchProperties: (userRole?: string, userId?: string) => Promise<void>;
}

const PropertiesContext = createContext<PropertiesContextType | undefined>(undefined);

interface PropertiesProviderProps {
  children: ReactNode;
}

export function PropertiesProvider({ children }: PropertiesProviderProps) {
  const [allProperties, setAllProperties] = useState<PropertyData[]>([]);
  const [featuredProperties, setFeaturedProperties] = useState<PropertyData[]>([]);
  const [userProperties, setUserProperties] = useState<PropertyData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = useCallback(async (userRole?: string, userId?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data: PropertiesData = await propertiesService.getPropertiesData(userRole, userId);
      
      setAllProperties(data.allProperties);
      setFeaturedProperties(data.featuredProperties);
      setUserProperties(data.userProperties);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch properties';
      setError(errorMessage);
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const invalidateCache = useCallback((userRole?: string, userId?: string) => {
    propertiesService.invalidateCache(userRole, userId);
  }, []);

  const invalidateAllCache = useCallback(() => {
    propertiesService.invalidateAllCache();
    // Clear local state as well
    setAllProperties([]);
    setFeaturedProperties([]);
    setUserProperties([]);
  }, []);

  const refetchProperties = useCallback(async (userRole?: string, userId?: string) => {
    // Force invalidate cache and refetch
    invalidateCache(userRole, userId);
    await fetchProperties(userRole, userId);
  }, [fetchProperties, invalidateCache]);

  const value: PropertiesContextType = {
    allProperties,
    featuredProperties,
    userProperties,
    loading,
    error,
    fetchProperties,
    invalidateCache,
    invalidateAllCache,
    refetchProperties,
  };

  return (
    <PropertiesContext.Provider value={value}>
      {children}
    </PropertiesContext.Provider>
  );
}

export function usePropertiesContext(): PropertiesContextType {
  const context = useContext(PropertiesContext);
  if (context === undefined) {
    throw new Error('usePropertiesContext must be used within a PropertiesProvider');
  }
  return context;
}