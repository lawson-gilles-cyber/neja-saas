import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CoursesModule } from './modules/courses/courses.module';
import { QuizModule } from './modules/quiz/quiz.module';
import { ExamsModule } from './modules/exams/exams.module';
import { AIModule } from './modules/ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    PrismaModule,
    AuthModule,
    UsersModule,
    CoursesModule,
    QuizModule,
    ExamsModule,
    AIModule,
  ],
})
export class AppModule {}
