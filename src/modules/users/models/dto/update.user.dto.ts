import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { CategoryEnum } from '../enum';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'David',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @ApiPropertyOptional({
    example: 'Filman',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  surname: string;

  @ApiPropertyOptional({
    example: [1, 2, 3],
  })
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  skills: number[];

  @ApiPropertyOptional({
    example: 'dev',
  })
  @IsOptional()
  @IsEnum(CategoryEnum, { message: 'Wrong category provided.' })
  category: CategoryEnum;

  @ApiPropertyOptional({
    example: 'it',
  })
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(2)
  language: string;
}
