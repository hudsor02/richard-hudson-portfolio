type RateLimiterOptions = {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests allowed in the window
  message?: string; // Custom error message
};

class RateLimiter {
  private requests: Map<string, { count: number; timestamp: number }> = new Map();
  private windowMs: number;
  private maxRequests: number;
  private message: string;

  constructor({
    windowMs,
    maxRequests,
    message = 'Too many requests, please try again later.',
  }: RateLimiterOptions) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    this.message = message;
  }

  /**
   * Middleware to enforce rate limits.
   */
  enforce(clientId: string): boolean | { error: string } {
    const now = Date.now();
    const clientData = this.requests.get(clientId);

    if (clientData) {
      const elapsedTime = now - clientData.timestamp;

      if (elapsedTime < this.windowMs) {
        if (clientData.count >= this.maxRequests) {
          return { error: this.message };
        }

        clientData.count += 1;
        this.requests.set(clientId, clientData);
        return true;
      }

      // Reset the counter if the time window has expired
      this.requests.set(clientId, { count: 1, timestamp: now });
      return true;
    }

    // Add a new client entry
    this.requests.set(clientId, { count: 1, timestamp: now });
    return true;
  }

  /**
   * Clean up stale entries in the map.
   */
  cleanup(): void {
    const now = Date.now();
    for (const [clientId, data] of this.requests.entries()) {
      if (now - data.timestamp > this.windowMs) {
        this.requests.delete(clientId);
      }
    }
  }
}

export default RateLimiter;
