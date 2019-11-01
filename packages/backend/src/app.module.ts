import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ScriptGeneratorController } from './script-generator/script-generator.controller';
import { ScriptGeneratorService } from './script-generator/script-generator.service';
import { ScriptRepository } from './script-generator/script.repository';
import { ConfigModule } from './config/config.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongoConnectionService } from './shared/mongo-connection.service';

const staticRootPath = join(process.cwd(), 'public');

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    ServeStaticModule.forRoot({
      rootPath: staticRootPath,
    }),
  ],
  controllers: [AppController, ScriptGeneratorController],
  providers: [
    AppService,
    MongoConnectionService,
    ScriptGeneratorService,
    ScriptRepository,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private mongoConnectionService: MongoConnectionService) {}

  async onModuleInit() {
    await this.mongoConnectionService.initialize();
  }
}
