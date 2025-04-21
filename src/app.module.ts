import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuildModule } from './build/build.module';
import { BuildService } from './build/build.service';

@Module({
  imports: [BuildModule],
  controllers: [AppController],
  providers: [AppService, BuildService],
})
export class AppModule {}
