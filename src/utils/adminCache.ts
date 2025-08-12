// utils/adminCache.ts

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

class AdminCache {
  private cache = new Map<string, CacheEntry<any>>();
  private readonly CACHE_DURATION = 10 * 60 * 1000; // 10 minutes (longer than properties)

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) return null;
    
    const isExpired = Date.now() - entry.timestamp > this.CACHE_DURATION;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }

  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  invalidate(key: string): void {
    this.cache.delete(key);
  }

  invalidateAll(): void {
    this.cache.clear();
  }

  // Check if data exists in cache (regardless of expiry)
  has(key: string): boolean {
    return this.cache.has(key);
  }

  // Get cache keys for debugging
  getCacheKeys(): string[] {
    return Array.from(this.cache.keys());
  }
}

export const adminCache = new AdminCache();