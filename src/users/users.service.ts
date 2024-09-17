import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { SkillsService } from 'src/skills/skills.service';
import { Repository } from 'typeorm';
import { CreateUserDto, FilterUserDto, UpdateUserDto } from './models/dto/';
import { UserEntity } from './models/entity/user.entity';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private skillsService: SkillsService,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    this.logger.log(createUserDto);

    const user = plainToInstance(UserEntity, createUserDto);
    const { skills } = createUserDto;

    this.logger.debug(user);

    try {
      const createdUser = await this.usersRepository.insert(user);

      const skillsInsertResult = await this.skillsService.createSkills(
        skills,
        user,
      );

      return { createdUser: createdUser.raw, skills: skillsInsertResult.raw };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  getAllUsers(): Promise<UserEntity[]> {
    return this.usersRepository.find({
      where: { deleted: false },
      relations: ['skills'],
    });
  }

  async findByFilters(filters: FilterUserDto) {
    if (!filters)
      throw new NotFoundException({ message: 'No filters provided.' });

    const { skillOrder } = filters;
    delete filters.skillOrder;

    return await this.usersRepository.find({
      where: filters,
      order: { skills: { name: skillOrder } },
      relations: ['skills'],
    });
  }

  async updateUser(userId: number, updateUserDto: UpdateUserDto) {
    if (!(await this.checkUserExistence(userId)))
      throw new NotFoundException({
        message: `Not found user with id ${userId}`,
      });

    const { skills } = updateUserDto;
    delete updateUserDto.skills;
    const updateResult = await this.usersRepository.update(
      userId,
      updateUserDto,
    );
    const relatedSkills = await this.skillsService.updateSkills(userId, skills);

    return { updateResult, relatedSkills };
  }

  async deleteUser(userId: number) {
    if (!(await this.checkUserExistence(userId)))
      throw new NotFoundException({
        message: `Not found user with id ${userId}`,
      });
    const deletedUserInfo = await this.usersRepository.update(userId, {
      deleted: true,
    });

    return deletedUserInfo;
  }

  private async checkUserExistence(userId: number) {
    return await this.usersRepository.exists({
      where: { id: userId, deleted: false },
    });
  }
}
