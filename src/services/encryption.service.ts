import { Injectable } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { EncryptResponseDto, EncryptDataDto } from '../dto/encrypt-response.dto';
import { DecryptResponseDto, DecryptDataDto } from '../dto/decrypt-response.dto';

@Injectable()
export class EncryptionService {
  constructor(private readonly cryptoService: CryptoService) {}

  async encryptData(payload: string): Promise<EncryptResponseDto> {
    try {
      if (payload.length > 2000) {
        return {
          successful: false,
          error_code: 'PAYLOAD_TOO_LONG',
          data: null,
        };
      }

      const aesKey = this.cryptoService.generateAESKey();
      const encryptedPayload = this.cryptoService.encryptAES(payload, aesKey);
      const encryptedAESKey = this.cryptoService.encryptRSA(aesKey);

      const responseData: EncryptDataDto = {
        data1: encryptedAESKey,
        data2: encryptedPayload,
      };

      return {
        successful: true,
        error_code: null,
        data: responseData,
      };
    } catch (error) {
      return {
        successful: false,
        error_code: 'ENCRYPTION_FAILED',
        data: null,
      };
    }
  }

  async decryptData(data1: string, data2: string): Promise<DecryptResponseDto> {
    try {
      const aesKey = this.cryptoService.decryptRSA(data1);
      const payload = this.cryptoService.decryptAES(data2, aesKey);
      const responseData: DecryptDataDto = {
        payload: payload,
      };

      return {
        successful: true,
        error_code: null,
        data: responseData,
      };
    } catch (error) {
      return {
        successful: false,
        error_code: 'DECRYPTION_FAILED',
        data: null,
      };
    }
  }
}
