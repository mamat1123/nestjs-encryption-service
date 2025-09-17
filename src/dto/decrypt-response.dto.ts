import { ApiProperty } from '@nestjs/swagger';

export class DecryptDataDto {
  @ApiProperty({
    description: 'Decrypted payload',
    example: 'Hello, World!',
  })
  payload: string;
}

export class DecryptResponseDto {
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
    description: 'Decrypted data',
    type: DecryptDataDto,
    required: false,
  })
  data: DecryptDataDto | null;
}
