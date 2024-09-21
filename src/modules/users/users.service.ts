import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { SkillsService } from 'src/modules/skills/skills.service';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './models/dto/';
import { FilterUserDto } from './models/dto/filter.user.dto';
import { UserEntity } from './models/entity/user.entity';
import {
  FilterResponse,
  TransformedUserEntity,
} from './models/type/filter.response.type';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private skillsService: SkillsService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const skills = await this.skillsService.getSkillsByIds(
      createUserDto.skills,
    );

    const user = plainToInstance(UserEntity, {
      ...createUserDto,
      skills: skills.map((skill) => skill.id),
    });

    const { id } = (await this.usersRepository.insert(user)).identifiers[0] as {
      id: number;
    };
    const createdUser = await this.getUserById(id);

    return createdUser;
  }

  async getAllUsers(
    requestUserDto: FilterUserDto,
  ): Promise<FilterResponse<TransformedUserEntity>> {
    const { orderBy, orderDirection, page, limit, search, skills, ...rest } =
      requestUserDto;

    const query = this.usersRepository.createQueryBuilder('user');

    for (const [k, v] of Object.entries(rest)) {
      query.andWhere(`user.${k} = :${k}equality`, { [`${k}equality`]: v });
    }

    if (skills) {
      query.andWhere(
        `EXISTS (
      SELECT 1
      FROM jsonb_array_elements(
          :skills::jsonb
      ) AS elem
      WHERE skills @> elem
    )`,
        { skills: JSON.stringify(skills.map(Number)) },
      );
    }

    if (search) {
      for (const key of ['name', 'surname', 'category', 'language']) {
        query.orWhere(`user.${key} LIKE :${key}search`, {
          [`${key}search`]: `%${search}%`,
        });
      }
    }

    if (orderBy) {
      query.orderBy(`user.${orderBy}`, orderDirection || 'ASC');
    }

    query.skip((page - 1) * limit).take(limit);

    const [users, total] = await query.getManyAndCount();

    const skillIds = users.map((user) => user.skills).flat();

    const skillsDict = await this.skillsService
      .getSkillsByIds(skillIds)
      .then((data) => {
        return data.reduce((accum, current) => {
          if (!accum[current.id]) {
            accum[current.id] = current.name;
          }

          return accum;
        }, {} as Record<string, string>);
      });

    return {
      data: users.map((user) => ({
        ...user,
        skills: user.skills.map((skillId) => skillsDict[skillId]),
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const updateResult = await this.usersRepository.update(
      userId,
      updateUserDto,
    );

    if (updateResult.affected !== 1) throw new NotFoundException('No user');

    return this.getUserById(userId);
  }

  async deleteUser(id: number): Promise<void | never> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user)
      throw new NotFoundException({
        message: `Not found user with id ${id}`,
      });

    await this.usersRepository.softRemove(user);
  }

  getUserById(id: number): Promise<UserEntity> {
    return this.usersRepository.findOne({ where: { id } });
  }
}
