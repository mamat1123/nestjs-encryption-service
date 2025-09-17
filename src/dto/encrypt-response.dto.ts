import { ApiProperty } from '@nestjs/swagger';

export class EncryptDataDto {
  @ApiProperty({
    description: 'Encrypted AES key (data1)',
    example: 'encrypted_aes_key_here',
  })
  data1: string;

  @ApiProperty({
    description: 'Encrypted payload (data2)',
    example: 'encrypted_payload_here',
  })
  data2: string;
}

export class EncryptResponseDto {
  @ApiProperty({
    description: 'Indicates if the operation was successful',
    example: true,
  })
  successful: boolean;

  @ApiProperty({
    description: 'Error code if operation failed',
    example: null,
    required: false,
  })
  error_code: string | null;

  @ApiProperty({
    description: 'Encrypted data',
    type: EncryptDataDto,
    required: false,
  })
  data: EncryptDataDto | null;
}
