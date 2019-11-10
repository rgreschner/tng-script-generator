import { Injectable } from '@nestjs/common';
import { BaseMongoRepository } from '../shared/base-mongo.repository';

/**
 * Repository for Users.
 */
@Injectable()
export class UserRepository extends BaseMongoRepository {
  public get collection(): any {
    return this._mongoConnectionService.db.collection('users');
  }
}
