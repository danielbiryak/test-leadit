import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { CategoryEnum } from '../enum';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({
    example: 'David',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @ApiProperty({
    example: 'Filman',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  surname: string;

  @ApiProperty({
    example: [1, 2, 3, 4],
  })
  @IsArray()
  @Type(() => Number)
  skills: number[];

  @ApiProperty({
    example: 'dev',
  })
  @IsEnum(CategoryEnum, { message: 'Wrong category provided.' })
  category: CategoryEnum;

  @ApiProperty({
    example: 'it',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2)
  language: string;
}
