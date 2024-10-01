import { MongoClient } from 'mongodb';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${DB_HOST}:${DB_PORT}`;

class DBClient {
  constructor() {
    this.db = null;
    this.usersCollection = null;
    this.filesCollection = null;
    this.connect();
  }

  async connect() {
    try {
      const client = await MongoClient.connect(url, { useUnifiedTopology: true });
      this.db = client.db(DB_DATABASE);
      this.usersCollection = this.db.collection('users');
      this.filesCollection = this.db.collection('files');
      console.log('Connected to the database');
    } catch (error) {
      console.error('Error connecting to the database:', error.message);
      this.db = null;
    }
  }

  isAlive() {
    return !!this.db;
  }

  async nbUsers() {
    if (!this.usersCollection) {
      await this.connect();
    }
    return this.usersCollection.countDocuments();
  }

  async nbFiles() {
    if (!this.filesCollection) {
      await this.connect();
    }
    return this.filesCollection.countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
