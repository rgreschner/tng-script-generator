import { Module, OnModuleInit } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongoConnectionService } from './shared/mongo-connection.service';
import { ScriptGeneratorModule } from './script-generator/script-generator.module';
import { SharedModule } from './shared/shared.module';

const staticRootPath = join(process.cwd(), 'public');

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    SharedModule,
    ServeStaticModule.forRoot({
      rootPath: staticRootPath,
    }),
    ScriptGeneratorModule,
  ],
  controllers: [],
})
export class AppModule implements OnModuleInit {
  constructor(private mongoConnectionService: MongoConnectionService) {}

  async onModuleInit() {
    await this.mongoConnectionService.initialize();
  }
}
