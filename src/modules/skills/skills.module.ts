import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillsController } from './skills.controller';
import { SkillEntity } from './models/entity/skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SkillEntity])],
  providers: [SkillsService],
  exports: [SkillsService],
  controllers: [SkillsController],
})
export class SkillsModule {}
