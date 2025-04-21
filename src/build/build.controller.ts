import { Body, Controller, Post } from '@nestjs/common';
import { BuildService } from './build.service';
import { GenerateBuildDto } from './dto/generateBuild.dto';

@Controller('build')
export class BuildController {
  constructor(private buildService: BuildService) {}

  @Post()
  async generateBuild(@Body() generateBuildDto: GenerateBuildDto) {
    try {
      const prompt = generateBuildDto.prompt;
      return this.buildService.generateBuild(prompt);
    } catch (error) {
      console.error('Error generating build:', error);
      throw new Error('Failed to generate build');
    }
  }
}
