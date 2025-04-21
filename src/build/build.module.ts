import { Module } from '@nestjs/common';
import { BuildService } from './build.service';
import { BuildController } from './build.controller';

@Module({
  providers: [BuildService],
  controllers: [BuildController],
  exports: [BuildService],
})
export class BuildModule {}
