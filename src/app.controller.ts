import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { BuildService } from './build/build.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private buildService: BuildService,
  ) {}

  @Get()
  async getHello() {
    return this.buildService.generateBuild(
      'Generate an small aesthetic house for me',
    );
  }
}
