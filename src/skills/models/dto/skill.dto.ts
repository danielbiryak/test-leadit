import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SkillDto {
  @ApiProperty({
    example: 'Development',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    example: 'Senior',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  level: string;
}
