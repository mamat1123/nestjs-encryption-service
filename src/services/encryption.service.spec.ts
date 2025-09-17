import { Test, TestingModule } from '@nestjs/testing';
import { EncryptionService } from './encryption.service';
import { CryptoService } from './crypto.service';

describe('EncryptionService', () => {
  let service: EncryptionService;
  let cryptoService: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncryptionService, CryptoService],
    }).compile();

    service = module.get<EncryptionService>(EncryptionService);
    cryptoService = module.get<CryptoService>(CryptoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('encryptData', () => {
    it('should encrypt data successfully', async () => {
      const payload = 'Hello, World!';
      const result = await service.encryptData(payload);

      expect(result.successful).toBe(true);
      expect(result.error_code).toBeNull();
      expect(result.data).toBeDefined();
      expect(result.data.data1).toBeDefined();
      expect(result.data.data2).toBeDefined();
    });

    it('should return error for payload too long', async () => {
      const longPayload = 'a'.repeat(2001);
      const result = await service.encryptData(longPayload);

      expect(result.successful).toBe(false);
      expect(result.error_code).toBe('PAYLOAD_TOO_LONG');
      expect(result.data).toBeNull();
    });

    it('should handle empty payload', async () => {
      const payload = '';
      const result = await service.encryptData(payload);

      expect(result.successful).toBe(true);
      expect(result.error_code).toBeNull();
      expect(result.data).toBeDefined();
    });

    it('should handle special characters in payload', async () => {
      const payload = 'Special chars: !@#$%^&*()_+-=[]{}|;:,.<>?';
      const result = await service.encryptData(payload);

      expect(result.successful).toBe(true);
      expect(result.error_code).toBeNull();
      expect(result.data).toBeDefined();
    });
  });

  describe('decryptData', () => {
    it('should decrypt data successfully', async () => {
      // First encrypt some data
      const originalPayload = 'Hello, World!';
      const encryptResult = await service.encryptData(originalPayload);
      
      expect(encryptResult.successful).toBe(true);
      
      // Then decrypt it
      const decryptResult = await service.decryptData(
        encryptResult.data.data1,
        encryptResult.data.data2
      );

      expect(decryptResult.successful).toBe(true);
      expect(decryptResult.error_code).toBeNull();
      expect(decryptResult.data).toBeDefined();
      expect(decryptResult.data.payload).toBe(originalPayload);
    });

    it('should return error for invalid encrypted data', async () => {
      const result = await service.decryptData('invalid_data1', 'invalid_data2');

      expect(result.successful).toBe(false);
      expect(result.error_code).toBe('DECRYPTION_FAILED');
      expect(result.data).toBeNull();
    });

    it('should handle empty encrypted data', async () => {
      const result = await service.decryptData('', '');

      expect(result.successful).toBe(false);
      expect(result.error_code).toBe('DECRYPTION_FAILED');
      expect(result.data).toBeNull();
    });
  });

  describe('integration test', () => {
    it('should encrypt and decrypt data in a complete flow', async () => {
      const testPayloads = [
        'Hello, World!',
        'Test with numbers: 123456789',
        'Special characters: !@#$%^&*()',
        'Unicode: 你好世界 🌍',
        'Empty string: ',
        'Very long string: ' + 'a'.repeat(1000),
      ];

      for (const payload of testPayloads) {
        // Skip very long string test as it exceeds our limit
        if (payload.length > 2000) continue;

        const encryptResult = await service.encryptData(payload);
        expect(encryptResult.successful).toBe(true);

        const decryptResult = await service.decryptData(
          encryptResult.data.data1,
          encryptResult.data.data2
        );
        expect(decryptResult.successful).toBe(true);
        expect(decryptResult.data.payload).toBe(payload);
      }
    });
  });
});
