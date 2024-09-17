import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FilterSkillDto } from './models/dto/filter.skill.dto';
import { SkillDto } from './models/dto/skill.dto';
import { SkillsService } from './skills.service';

@ApiTags('Skills')
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  @HttpCode(201)
  createSkill(@Body() skillDto: SkillDto) {
    return this.skillsService.createSkill(skillDto);
  }

  @Get()
  @HttpCode(200)
  findAll(@Query() requestSkillDto: FilterSkillDto) {
    return this.skillsService.findAll(requestSkillDto);
  }
}
