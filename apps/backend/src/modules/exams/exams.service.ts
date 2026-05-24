import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ExamsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.exam.findMany({
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
      orderBy: {
        weekNumber: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const exam = await this.prisma.exam.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });

    if (!exam) {
      throw new NotFoundException('Examen introuvable');
    }

    return exam;
  }

  async submitResult(
    examId: string,
    userId: string,
    answers: number[],
  ) {
    const exam = await this.prisma.exam.findUnique({
      where: { id: examId },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });

    if (!exam) {
      throw new NotFoundException('Examen introuvable');
    }

    let correct = 0;

    exam.questions.forEach((q, i) => {
      const goodAnswer = q.answers.findIndex(
        (a) => a.isCorrect === true,
      );

      if (answers[i] === goodAnswer) {
        correct++;
      }
    });

    const score =
      (correct / exam.questions.length) * 20;

    return this.prisma.examAttempt.create({
      data: {
        examId,
        userId,
        score,
        report: `Score obtenu : ${score}/20`,
      },
    });
  }
}