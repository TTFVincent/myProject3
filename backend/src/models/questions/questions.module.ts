import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from './entities/question.entity';

@Module({
  imports: [SequelizeModule.forFeature([Question])],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
