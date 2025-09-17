import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EncryptionService } from '../services/encryption.service';
import { EncryptRequestDto } from '../dto/encrypt-request.dto';
import { EncryptResponseDto } from '../dto/encrypt-response.dto';
import { DecryptRequestDto } from '../dto/decrypt-request.dto';
import { DecryptResponseDto } from '../dto/decrypt-response.dto';

@ApiTags('encryption')
@Controller()
export class EncryptionController {
  constructor(private readonly encryptionService: EncryptionService) {}

  @Post('get-encrypt-data')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Encrypt data',
    description: 'Encrypts the provided payload using AES and RSA encryption' 
  })
  @ApiResponse({
    status: 200,
    description: 'Data encrypted successfully',
    type: EncryptResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation failed',
  })
  async encryptData(@Body() encryptRequest: EncryptRequestDto): Promise<EncryptResponseDto> {
    return this.encryptionService.encryptData(encryptRequest.payload);
  }

  @Post('get-decrypt-data')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Decrypt data',
    description: 'Decrypts the provided encrypted data using RSA and AES decryption' 
  })
  @ApiResponse({
    status: 200,
    description: 'Data decrypted successfully',
    type: DecryptResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation failed',
  })
  async decryptData(@Body() decryptRequest: DecryptRequestDto): Promise<DecryptResponseDto> {
    return this.encryptionService.decryptData(decryptRequest.data1, decryptRequest.data2);
  }
}
