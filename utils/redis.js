import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();

    this.client.on('error', (err) => {
      console.error(`Redis client not connected to the server: ${err.message}`);
    });

    this.client.connect().catch((err) => {
      console.error(`Error connecting to Redis: ${err.message}`);
    });
  }

  isAlive() {
    return this.client.isReady;
  }

  async get(key) {
    try {
      const value = await this.client.get(key);
      return value;
    } catch (err) {
      console.error(`Error getting key ${key}: ${err.message}`);
      return null;
    }
  }

  async set(key, value, duration) {
    try {
      await this.client.setEx(key, duration, value);
    } catch (err) {
      console.error(`Error setting key ${key}: ${err.message}`);
    }
  }

  async del(key) {
    try {
      await this.client.del(key);
    } catch (err) {
      console.error(`Error deleting key ${key}: ${err.message}`);
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;
