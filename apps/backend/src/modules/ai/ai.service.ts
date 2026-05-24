import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { z } from 'zod';

const QuizSchema = z.object({
  question: z.string(),
  answers: z.array(z.string()).length(4),
  correctIndex: z.number().min(0).max(3),
  explanation: z.string(),
});

const CourseSchema = z.object({
  title: z.string(),
  description: z.string(),
  lessons: z.array(z.object({ title: z.string(), content: z.string(), order: z.number() })),
});

@Injectable()
export class AIService {
  private readonly openai: OpenAI;
  private readonly logger = new Logger(AIService.name);

  constructor(private readonly config: ConfigService) {
    this.openai = new OpenAI({ apiKey: this.config.getOrThrow<string>('OPENAI_API_KEY') });
  }

  async chat(message: string, system?: string): Promise<string> {
    const res = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: system || 'Tu es un assistant pédagogique spécialisé en journalisme environnemental.' },
        { role: 'user', content: message },
      ],
      max_tokens: 1024,
    });
    return res.choices[0]?.message?.content ?? '';
  }

  async generateQuiz(topic: string, difficulty: string): Promise<z.infer<typeof QuizSchema>> {
    const raw = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      messages: [{ role: 'user', content: `Génère une question de quiz sur "${topic}" (niveau ${difficulty}) en JSON strict: { "question": "...", "answers": ["A","B","C","D"], "correctIndex": 0, "explanation": "..." }` }],
    });
    try {
      return QuizSchema.parse(JSON.parse(raw.choices[0]?.message?.content ?? '{}'));
    } catch (e) {
      this.logger.error('Quiz parse error', e);
      throw new Error('Réponse IA invalide');
    }
  }

  async generateCourseStructure(domain: string, difficulty: string): Promise<z.infer<typeof CourseSchema>> {
    const raw = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      messages: [{ role: 'user', content: `Génère la structure d'un cours sur "${domain}" (niveau ${difficulty}) en JSON: { "title": "...", "description": "...", "lessons": [{ "title": "...", "content": "...", "order": 1 }] }` }],
    });
    try {
      return CourseSchema.parse(JSON.parse(raw.choices[0]?.message?.content ?? '{}'));
    } catch (e) {
      this.logger.error('Course parse error', e);
      throw new Error('Réponse IA invalide');
    }
  }
}
