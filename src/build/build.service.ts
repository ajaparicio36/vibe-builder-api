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
              type: 'object',
              properties: {
                blocks: {
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
                      half: { type: 'string', enum: ['top', 'bottom'] },
                      shape: {
                        type: 'string',
                        enum: [
                          'straight',
                          'inner_left',
                          'inner_right',
                          'outer_left',
                          'outer_right',
                        ],
                      },
                      persistent: { type: 'boolean' },
                      axis: { type: 'string', enum: ['x', 'y', 'z'] },
                      open: { type: 'string', enum: ['open', 'closed'] },
                      facing: { type: 'string' },
                      block: { type: 'string' },
                    },
                    required: [
                      'x',
                      'xTo',
                      'y',
                      'yTo',
                      'z',
                      'zTo',
                      'half',
                      'shape',
                      'open',
                      'persistent',
                      'axis',
                      'facing',
                      'block',
                    ],
                    additionalProperties: false,
                  },
                },
              },
              required: ['blocks'],
              additionalProperties: false,
            },
            strict: true,
          },
        },
      });

      const content = response.output_text;

      if (content) {
        const parsedData = JSON.parse(content);
        return parsedData;
      } else {
        throw new Error('No content in response');
      }
    } catch (error) {
      console.error('Error generating build:', error);
      throw new Error('Failed to generate build');
    }
  }
}
