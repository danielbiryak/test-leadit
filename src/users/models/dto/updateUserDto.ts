import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { UpdateSkillsDto } from 'src/skills/models/dto/updateSkills.dto';
import { CategoryEnum } from '../enum/';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    example: 'David',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @ApiProperty({
    example: 'Filman',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  surname: string;

  @ApiProperty({
    example: [{ id: 1, name: 'Development', level: 'Senior' }],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSkillsDto)
  skills: UpdateSkillsDto[];

  @ApiProperty({
    example: 'dev',
    required: false,
  })
  @IsOptional()
  @IsEnum(CategoryEnum, { message: 'Wrong category provided.' })
  category: CategoryEnum;

  @ApiProperty({
    example: 'it',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(2)
  language: string;
}
