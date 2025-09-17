import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DecryptRequestDto {
  @ApiProperty({
    description: 'Encrypted AES key (data1)',
    example: 'encrypted_aes_key_here',
  })
  @IsString()
  @IsNotEmpty()
  data1: string;

  @ApiProperty({
    description: 'Encrypted payload (data2)',
    example: 'encrypted_payload_here',
  })
  @IsString()
  @IsNotEmpty()
  data2: string;
}
