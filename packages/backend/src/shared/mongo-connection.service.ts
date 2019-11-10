import { MongoClient } from 'mongodb';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

/**
 * Service which establishes connection
 * to MongoDB for data persistence.
 */
@Injectable()
export class MongoConnectionService {
  private _db: any;

  constructor(private configService: ConfigService) { }

  /**
   * Initialize database connection.
   */
  public async initialize() {
    try {
      const connectionUrl = this.configService.get('MONGODB_CONNECTION_URL');
      const database = this.configService.get('MONGODB_DATABASE');
      const connectionOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true
      };
      const mongoClient = await MongoClient.connect(connectionUrl, connectionOpts);
      this._db = mongoClient.db(database);
    } catch (err) {
      console.error('Error connecting to database.', err);
      throw err;
    }
  }

  /**
   * Get database instance.
   */
  public get db() {
    return this._db;
  }
}
