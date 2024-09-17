import { Injectable, Logger } from '@nestjs/common';
import { SkillDto } from './models/dto/skill.dto';
import { Repository } from 'typeorm';
import { SkillEntity } from './models/entity/skill.entity';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/models/entity/user.entity';
import { UpdateSkillsDto } from './models/dto/updateSkills.dto';

@Injectable()
export class SkillsService {
  private logger = new Logger(SkillsService.name);
  constructor(
    @InjectRepository(SkillEntity)
    private skillsRepository: Repository<SkillEntity>,
  ) {}
  async createSkills(skillsDto: SkillDto[], user: UserEntity) {
    const skills = skillsDto.map((skillDto) => {
      const skill = plainToInstance(SkillEntity, skillDto);
      skill.user = user;
      return skill;
    });

    const result = await this.skillsRepository.insert(skills);
    this.logger.log('Created skills');
    this.logger.log(result.raw);

    return result;
  }

  async findSkillsByFilter(skillsFilter: SkillDto[]) {
    let result = [];
    for (const skillFilter of skillsFilter)
      result.push(
        await this.skillsRepository.find({
          where: {
            name: skillFilter.name,
            level: skillFilter.level,
          },
        }),
      );
    return result;
  }

  async updateSkills(userId: number, updateSkillsDto: UpdateSkillsDto[]) {
    const relatedSkills = await this.skillsRepository.find({
      where: { user: { id: userId } },
    });

    updateSkillsDto.map((updateSkill) => {
      const index = relatedSkills.findIndex(
        (relatedSkill) => updateSkill.id === relatedSkill.id,
      );
      if (index === -1) return;
      if (updateSkill.level) relatedSkills[index].level = updateSkill.level;
      if (updateSkill.name) relatedSkills[index].name = updateSkill.name;
    });

    const result = await this.skillsRepository.save(relatedSkills);

    return result;
  }
}
