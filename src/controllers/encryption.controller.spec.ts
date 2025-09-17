import { Test, TestingModule } from '@nestjs/testing';
import { EncryptionController } from './encryption.controller';
import { EncryptionService } from '../services/encryption.service';
import { EncryptRequestDto } from '../dto/encrypt-request.dto';
import { DecryptRequestDto } from '../dto/decrypt-request.dto';

describe('EncryptionController', () => {
  let controller: EncryptionController;
  let encryptionService: EncryptionService;

  const mockEncryptionService = {
    encryptData: jest.fn(),
    decryptData: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EncryptionController],
      providers: [
        {
          provide: EncryptionService,
          useValue: mockEncryptionService,
        },
      ],
    }).compile();

    controller = module.get<EncryptionController>(EncryptionController);
    encryptionService = module.get<EncryptionService>(EncryptionService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('encryptData', () => {
    it('should call encryption service and return result', async () => {
      const encryptRequest: EncryptRequestDto = {
        payload: 'Hello, World!',
      };

      const expectedResponse = {
        successful: true,
        error_code: null,
        data: {
          data1: 'encrypted_aes_key',
          data2: 'encrypted_payload',
        },
      };

      mockEncryptionService.encryptData.mockResolvedValue(expectedResponse);

      const result = await controller.encryptData(encryptRequest);

      expect(mockEncryptionService.encryptData).toHaveBeenCalledWith('Hello, World!');
      expect(result).toEqual(expectedResponse);
    });

    it('should handle encryption service errors', async () => {
      const encryptRequest: EncryptRequestDto = {
        payload: 'a'.repeat(2001), // Too long
      };

      const expectedResponse = {
        successful: false,
        error_code: 'PAYLOAD_TOO_LONG',
        data: null,
      };

      mockEncryptionService.encryptData.mockResolvedValue(expectedResponse);

      const result = await controller.encryptData(encryptRequest);

      expect(mockEncryptionService.encryptData).toHaveBeenCalledWith('a'.repeat(2001));
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('decryptData', () => {
    it('should call decryption service and return result', async () => {
      const decryptRequest: DecryptRequestDto = {
        data1: 'encrypted_aes_key',
        data2: 'encrypted_payload',
      };

      const expectedResponse = {
        successful: true,
        error_code: null,
        data: {
          payload: 'Hello, World!',
        },
      };

      mockEncryptionService.decryptData.mockResolvedValue(expectedResponse);

      const result = await controller.decryptData(decryptRequest);

      expect(mockEncryptionService.decryptData).toHaveBeenCalledWith(
        'encrypted_aes_key',
        'encrypted_payload'
      );
      expect(result).toEqual(expectedResponse);
    });

    it('should handle decryption service errors', async () => {
      const decryptRequest: DecryptRequestDto = {
        data1: 'invalid_data1',
        data2: 'invalid_data2',
      };

      const expectedResponse = {
        successful: false,
        error_code: 'DECRYPTION_FAILED',
        data: null,
      };

      mockEncryptionService.decryptData.mockResolvedValue(expectedResponse);

      const result = await controller.decryptData(decryptRequest);

      expect(mockEncryptionService.decryptData).toHaveBeenCalledWith(
        'invalid_data1',
        'invalid_data2'
      );
      expect(result).toEqual(expectedResponse);
    });
  });
});
