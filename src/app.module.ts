import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuildModule } from './build/build.module';
import { BuildService } from './build/build.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [BuildModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, BuildService],
})
export class AppModule {}
