import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();

    this.client.on('error', (error) => {
      console.log(`Redis client not connected to the server: ${error.message}`);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      });
    });
  }

  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.setEx(key, duration, value, (error) => {
        if (error) return reject(error);
        return resolve(true);
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (error, result) => {
        if (error) return reject(error);
        return resolve(result === 1);
      });
    });
  }
}

const redisClient = new RedisClient();

export default redisClient;
