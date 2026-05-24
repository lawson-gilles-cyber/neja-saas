import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quiz: QuizService) {}

  @Get('course/:courseId')
  findByCourse(@Param('courseId') id: string) { return this.quiz.findByCourse(id); }

  @Post(':id/submit')
  submit(
    @Param('id') quizId: string,
    @Body('userId') userId: string,
    @Body('answers') answers: number[],
  ) { return this.quiz.submitAttempt(quizId, userId, answers); }
}
