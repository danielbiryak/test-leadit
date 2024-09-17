import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CategoryEnum } from '../enum/';
import { Type } from 'class-transformer';
import { SkillDto } from '../../../skills/models/dto/skill.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'David',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @ApiProperty({
    example: 'Filman',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  surname: string;

  @ApiProperty({
    example: [{ name: 'Development', level: 'Senior' }],
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SkillDto)
  skills: SkillDto[];

  @ApiProperty({
    example: 'dev',
    required: true,
  })
  @IsEnum(CategoryEnum, { message: 'Wrong category provided.' })
  category: CategoryEnum;

  @ApiProperty({
    example: 'it',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2)
  language: string;
}
