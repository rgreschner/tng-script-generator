import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { MongoConnectionService } from './mongo-connection.service';

@Module({
    imports: [
        ConfigModule,
      ],
      providers: [
        MongoConnectionService,
      ],
      exports: [
        MongoConnectionService
      ]
})
export class SharedModule {}
