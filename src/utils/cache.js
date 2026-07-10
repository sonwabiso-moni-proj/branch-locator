const cache = new Map();

export const getCacheKey = (endpoint, params) => {
  return `${endpoint}:${JSON.stringify(params || {})}`;
};

export const getCachedData = (key) => {
  return cache.get(key);
};

export const setCachedData = (key, data) => {
  cache.set(key, data);
};

export const clearCache = () => {
  cache.clear();
};

export const invalidateCacheByEndpoint = (endpoint) => {
  const keysToDelete = Array.from(cache.keys()).filter(key =>
    key.startsWith(endpoint)
  );
  keysToDelete.forEach(key => cache.delete(key));
};
