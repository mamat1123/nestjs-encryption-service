"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const encryption_controller_1 = require("./encryption.controller");
const encryption_service_1 = require("../services/encryption.service");
describe('EncryptionController', () => {
    let controller;
    let encryptionService;
    const mockEncryptionService = {
        encryptData: jest.fn(),
        decryptData: jest.fn(),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [encryption_controller_1.EncryptionController],
            providers: [
                {
                    provide: encryption_service_1.EncryptionService,
                    useValue: mockEncryptionService,
                },
            ],
        }).compile();
        controller = module.get(encryption_controller_1.EncryptionController);
        encryptionService = module.get(encryption_service_1.EncryptionService);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    describe('encryptData', () => {
        it('should call encryption service and return result', async () => {
            const encryptRequest = {
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
            const encryptRequest = {
                payload: 'a'.repeat(2001),
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
            const decryptRequest = {
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
            expect(mockEncryptionService.decryptData).toHaveBeenCalledWith('encrypted_aes_key', 'encrypted_payload');
            expect(result).toEqual(expectedResponse);
        });
        it('should handle decryption service errors', async () => {
            const decryptRequest = {
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
            expect(mockEncryptionService.decryptData).toHaveBeenCalledWith('invalid_data1', 'invalid_data2');
            expect(result).toEqual(expectedResponse);
        });
    });
});
//# sourceMappingURL=encryption.controller.spec.js.map