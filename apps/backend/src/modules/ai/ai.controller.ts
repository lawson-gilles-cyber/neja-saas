import { Body, Controller, Post } from '@nestjs/common';
import { AIService } from './ai.service';

class ChatDto { message: string; system?: string; }
class QuizDto { topic: string; difficulty: string; }

@Controller('ai')
export class AIController {
  constructor(private readonly ai: AIService) {}

  @Post('chat')
  async chat(@Body() dto: ChatDto) {
    const reply = await this.ai.chat(dto.message, dto.system);
    return { reply };
  }

  @Post('quiz')
  async quiz(@Body() dto: QuizDto) {
    return this.ai.generateQuiz(dto.topic, dto.difficulty);
  }
}
