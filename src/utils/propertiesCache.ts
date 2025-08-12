// utils/propertiesCache.ts

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  userRole?: string;
  userId?: string;
}

class PropertiesCache {
  private cache = new Map<string, CacheEntry<any>>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  private generateKey(baseKey: string, userRole?: string, userId?: string): string {
    return `${baseKey}-${userRole || 'all'}-${userId || 'all'}`;
  }

  get<T>(baseKey: string, userRole?: string, userId?: string): T | null {
    const key = this.generateKey(baseKey, userRole, userId);
    const entry = this.cache.get(key);
    
    if (!entry) return null;
    
    const isExpired = Date.now() - entry.timestamp > this.CACHE_DURATION;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }

  set<T>(baseKey: string, data: T, userRole?: string, userId?: string): void {
    const key = this.generateKey(baseKey, userRole, userId);
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      userRole,
      userId
    });
  }

  invalidate(baseKey?: string, userRole?: string, userId?: string): void {
    if (!baseKey) {
      // Clear all cache
      this.cache.clear();
      return;
    }
    
    const key = this.generateKey(baseKey, userRole, userId);
    this.cache.delete(key);
  }

  invalidateUserCache(userId: string): void {
    // Remove all cache entries for a specific user
    for (const [key, entry] of this.cache.entries()) {
      if (entry.userId === userId) {
        this.cache.delete(key);
      }
    }
  }

  // Debug method to see what's cached
  getCacheKeys(): string[] {
    return Array.from(this.cache.keys());
  }
}

export const propertiesCache = new PropertiesCache();