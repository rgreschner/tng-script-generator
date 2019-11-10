import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { ScriptGeneratorController } from './script-generator.controller';
import { ScriptGeneratorService } from './script-generator.service';
import { ScriptRepository } from './script.repository';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [AuthModule, ConfigModule, SharedModule],
  controllers: [ScriptGeneratorController],
  providers: [ScriptGeneratorService, ScriptRepository],
})
export class ScriptGeneratorModule {}
