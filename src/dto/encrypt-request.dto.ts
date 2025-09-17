import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EncryptRequestDto {
  @ApiProperty({
    description: 'Payload to be encrypted',
    example: 'Hello, World!',
    maxLength: 2000,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000, { message: 'Payload must not exceed 2000 characters' })
  payload: string;
}
