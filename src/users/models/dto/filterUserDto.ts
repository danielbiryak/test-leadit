import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { CategoryEnum, OrderEnum } from '../enum/';
import { ApiProperty } from '@nestjs/swagger';

export class FilterUserDto {
  @ApiProperty({
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  id: number;

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
    example: 'ASC',
    required: false,
  })
  @IsOptional()
  @IsEnum(OrderEnum, { message: 'Wrong order provided.' })
  skillOrder: OrderEnum;

  //   @IsOptional()
  //   @IsArray()
  //   @ValidateNested({ each: true })
  //   @Type(() => SkillDto)
  //   skills: SkillDto[];

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
