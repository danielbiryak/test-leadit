import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { FilterDto } from 'src/common/api/filter.dto';
import { CategoryEnum } from '../enum';

export class FilterUserDto extends FilterDto {
  @ApiPropertyOptional({
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  id: number;

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
    type: () => [Number],
    description: 'Array of skill IDs',
    example: [1, 2, 3],
  })
  @IsOptional()
  @Type(() => Array)
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
