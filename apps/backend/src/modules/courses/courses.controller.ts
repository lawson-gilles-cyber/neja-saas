import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { AIService } from '../ai/ai.service';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('courses')
export class CoursesController {
  constructor(
    private readonly courses: CoursesService,
    private readonly ai: AIService,
  ) {}

  @Get()
  findAll() { return this.courses.findAll(); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.courses.findOne(id); }

  @Post('generate')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  generate(@Body('domain') domain: string, @Body('difficulty') difficulty: string) {
    return this.ai.generateCourseStructure(domain, difficulty);
  }
}
