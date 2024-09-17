import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillsModule } from 'src/modules/skills/skills.module';
import { UserEntity } from './models/entity/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), SkillsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UserModule {}
