import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SkillDto {
  @ApiProperty({
    example: 'Development',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;
}
