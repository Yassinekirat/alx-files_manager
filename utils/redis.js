import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();

    /** Handle Redis connection errors */
    this.client.on('error', (err) => {
      console.error(`Redis client not connected to the server: ${err.message}`);
    });

    /** Connect to the Redis server */
    this.client.connect().catch((err) => {
      console.error(`Error connecting to Redis: ${err.message}`);
    });
  }

  /** Check if Redis client is connected and alive */
  isAlive() {
    return this.client.isReady;
  }

  /** 
   * Get the value associated with the key
   * @param {string} key - The key to retrieve the value for 
   * @returns {Promise<string|null>} - The value of the key, or null if not found 
   */
  async get(key) {
    try {
      const value = await this.client.get(key);
      return value;
    } catch (err) {
      console.error(`Error getting key ${key}: ${err.message}`);
      return null;
    }
  }

  /** 
   * Set a key-value pair with expiration
   * @param {string} key - The key to set
   * @param {string} value - The value to associate with the key
   * @param {number} duration - The expiration time in seconds
   */
  async set(key, value, duration) {
    try {
      await this.client.setEx(key, duration, value);
    } catch (err) {
      console.error(`Error setting key ${key}: ${err.message}`);
    }
  }

  /** 
   * Delete a key from Redis
   * @param {string} key - The key to delete
   */
  async del(key) {
    try {
      await this.client.del(key);
    } catch (err) {
      console.error(`Error deleting key ${key}: ${err.message}`);
    }
  }
}

/** Export an instance of RedisClient */
const redisClient = new RedisClient();
export default redisClient;
