import { Injectable } from '@nestjs/common';
import { BaseMongoRepository } from '../shared/base-mongo.repository';

/**
 * Repository for Scripts.
 */
@Injectable()
export class ScriptRepository extends BaseMongoRepository {
  public get collection(): any {
    return this._mongoConnectionService.db.collection('scripts');
  }
}
