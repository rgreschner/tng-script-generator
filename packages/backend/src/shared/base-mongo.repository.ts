import { MongoConnectionService } from './mongo-connection.service';
import { Injectable } from '@nestjs/common';

/**
 * Base class for MongoDB persistence.
 */
@Injectable()
export abstract class BaseMongoRepository {
  constructor(protected _mongoConnectionService: MongoConnectionService) {}

  /**
   * Get collection instance.
   */
  public abstract get collection();

  /**
   * Find single instance of data by id.
   * @param id Id of instance to find.
   */
  public async findOneById(_id: any) {
    return await this.collection.findOne({ _id });
  }

  /**
   * Find all instances of stored data.
   */
  public async findAll(query?: any, projection?: any) {
    return await this.collection
      .find(query)
      .project(projection)
      .toArray();
  }

  /**
   * Store instance.
   * @param instance Instance to store.
   */
  public async save(instance: any) {
    return this.collection.save(instance);
  }
}
