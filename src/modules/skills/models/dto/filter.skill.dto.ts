import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { FilterDto } from 'src/common/api/filter.dto';

export class FilterSkillDto extends FilterDto {
  @ApiPropertyOptional({
    example: 'Development',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;
}
