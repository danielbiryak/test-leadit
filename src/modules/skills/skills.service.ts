import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { errorHandler } from 'src/common/error/error.handler';
import { In, Repository } from 'typeorm';
import { FilterResponse } from '../users/models/type/filter.response.type';
import { FilterSkillDto } from './models/dto/filter.skill.dto';
import { SkillDto } from './models/dto/skill.dto';
import { SkillEntity } from './models/entity/skill.entity';

@Injectable()
export class SkillsService {
  private logger = new Logger(SkillsService.name);

  constructor(
    @InjectRepository(SkillEntity)
    private skillsRepository: Repository<SkillEntity>,
  ) {}

  createSkill(skill: SkillDto): Promise<SkillEntity> {
    try {
      const newSkill = this.skillsRepository.create(skill);

      return this.skillsRepository.save(newSkill);
    } catch (error: unknown) {
      errorHandler(this.logger, error, this.createSkill.name);
    }
  }

  async findAll(
    requestSkillDto: FilterSkillDto,
  ): Promise<FilterResponse<SkillEntity>> {
    try {
      const { orderBy, orderDirection, page, limit, search, ...rest } =
        requestSkillDto;

      const query = this.skillsRepository.createQueryBuilder('skill');

      for (const [k, v] of Object.entries(rest)) {
        query.andWhere(`skill.${k} = :v`, { v });
      }

      if (orderBy) {
        query.orderBy(`skill.${orderBy}`, orderDirection || 'ASC');
      }

      if (search) {
        for (const key of ['name']) {
          query.orWhere(`skill.${key} LIKE :${key}search`, {
            [`${key}search`]: `%${search}%`,
          });
        }
      }

      query.skip((page - 1) * limit).take(limit);

      const [skills, total] = await query.getManyAndCount();

      return {
        data: skills,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error: unknown) {
      errorHandler(this.logger, error, this.findAll.name);
    }
  }

  async getSkillsByIds(ids: number[]): Promise<SkillEntity[]> {
    try {
      return this.skillsRepository.find({
        select: ['id', 'name'],
        where: { id: In(ids) },
      });
    } catch (error: unknown) {
      errorHandler(this.logger, error, this.getSkillsByIds.name);
    }
  }
}
