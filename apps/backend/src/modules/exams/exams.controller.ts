import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ExamsService } from './exams.service';

@Controller('exams')
export class ExamsController {
  constructor(private readonly exams: ExamsService) {}

  @Get()
  findAll() { return this.exams.findAll(); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.exams.findOne(id); }

  @Post(':id/submit')
  submit(
    @Param('id') examId: string,
    @Body('userId') userId: string,
    @Body('answers') answers: number[],
  ) { return this.exams.submitResult(examId, userId, answers); }
}
