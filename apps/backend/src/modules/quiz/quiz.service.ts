import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  async findByCourse(courseId: string) {
    return this.prisma.quiz.findMany({ where: { courseId }, include: { questions: true } });
  }

  async submitAttempt(quizId: string, userId: string, answers: number[]) {
    const quiz = await this.prisma.quiz.findUnique({ where: { id: quizId }, include: { questions: true } });
    if (!quiz) throw new NotFoundException('Quiz introuvable');
    let correct = 0;
    quiz.questions.forEach((q, i) => { if (answers[i] === q.correctAnswerIndex) correct++; });
    const score = Math.round((correct / quiz.questions.length) * 100);
    const attempt = await this.prisma.quizAttempt.create({
      data: { quizId, userId, score, answers: JSON.stringify(answers) },
    });
    return { score, correct, total: quiz.questions.length, attemptId: attempt.id };
  }
}
