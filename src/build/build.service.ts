import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { systemPrompt } from 'src/utils/systemPrompt';

@Injectable()
export class BuildService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async generateBuild(prompt: string) {
    try {
      const response = await this.openai.responses.create({
        model: 'gpt-4o-mini',
        input: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt },
        ],
        text: {
          format: {
            type: 'json_schema',
            name: 'blocks',
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  x: { type: 'integer' },
                  xTo: { type: 'integer' },
                  y: { type: 'integer' },
                  yTo: { type: 'integer' },
                  z: { type: 'integer' },
                  zTo: { type: 'integer' },
                  facing: { type: 'string' },
                  block: { type: 'string' },
                },
                required: ['x', 'y', 'z', 'block'],
                additionalProperties: false,
              },
            },
          },
        },
      });
    } catch (error) {
      console.error('Error generating build:', error);
      throw new Error('Failed to generate build');
    }
  }
}
