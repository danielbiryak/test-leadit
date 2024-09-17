import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillEntity } from './models/entity/skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SkillEntity])],
  providers: [SkillsService],
  exports: [SkillsService],
})
export class SkillsModule {}
