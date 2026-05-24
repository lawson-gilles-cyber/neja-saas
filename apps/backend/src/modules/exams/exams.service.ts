import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ExamsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.exam.findMany({ include: { questions: true }, orderBy: { weekNumber: 'asc' } });
  }

  async findOne(id: string) {
    const exam = await this.prisma.exam.findUnique({ where: { id }, include: { questions: true } });
    if (!exam) throw new NotFoundException('Examen introuvable');
    return exam;
  }

  async submitResult(examId: string, userId: string, answers: number[]) {
    const exam = await this.prisma.exam.findUnique({ where: { id: examId }, include: { questions: true } });
    if (!exam) throw new NotFoundException('Examen introuvable');
    let correct = 0;
    exam.questions.forEach((q, i) => { if (answers[i] === q.correctAnswerIndex) correct++; });
    const score = (correct / exam.questions.length) * 20;
    return this.prisma.examResult.create({
      data: { examId, userId, score, answers: JSON.stringify(answers), passed: score >= 10 },
    });
  }
}
