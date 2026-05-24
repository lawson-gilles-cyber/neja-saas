import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.course.findMany({ include: { lessons: true }, orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string) {
    const course = await this.prisma.course.findUnique({ where: { id }, include: { lessons: true, quizzes: true } });
    if (!course) throw new NotFoundException('Cours introuvable');
    return course;
  }
}
