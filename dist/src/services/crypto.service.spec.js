"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const crypto_service_1 = require("./crypto.service");
describe('CryptoService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [crypto_service_1.CryptoService],
        }).compile();
        service = module.get(crypto_service_1.CryptoService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('generateAESKey', () => {
        it('should generate a 64-character hex string', () => {
            const key = service.generateAESKey();
            expect(key).toHaveLength(64);
            expect(/^[0-9a-f]+$/i.test(key)).toBe(true);
        });
        it('should generate different keys each time', () => {
            const key1 = service.generateAESKey();
            const key2 = service.generateAESKey();
            expect(key1).not.toBe(key2);
        });
    });
    describe('AES encryption/decryption', () => {
        it('should encrypt and decrypt data correctly', () => {
            const originalData = 'Hello, World!';
            const key = service.generateAESKey();
            const encrypted = service.encryptAES(originalData, key);
            const decrypted = service.decryptAES(encrypted, key);
            expect(decrypted).toBe(originalData);
        });
        it('should handle empty string', () => {
            const originalData = '';
            const key = service.generateAESKey();
            const encrypted = service.encryptAES(originalData, key);
            const decrypted = service.decryptAES(encrypted, key);
            expect(decrypted).toBe(originalData);
        });
        it('should handle special characters', () => {
            const originalData = 'Special chars: !@#$%^&*()_+-=[]{}|;:,.<>?';
            const key = service.generateAESKey();
            const encrypted = service.encryptAES(originalData, key);
            const decrypted = service.decryptAES(encrypted, key);
            expect(decrypted).toBe(originalData);
        });
    });
    describe('RSA encryption/decryption', () => {
        it('should encrypt and decrypt data correctly', () => {
            const originalData = 'Test RSA encryption';
            const encrypted = service.encryptRSA(originalData);
            const decrypted = service.decryptRSA(encrypted);
            expect(decrypted).toBe(originalData);
        });
        it('should handle empty string', () => {
            const originalData = '';
            const encrypted = service.encryptRSA(originalData);
            const decrypted = service.decryptRSA(encrypted);
            expect(decrypted).toBe(originalData);
        });
    });
    describe('getPublicKey', () => {
        it('should return a valid public key', () => {
            const publicKey = service.getPublicKey();
            expect(publicKey).toContain('BEGIN PUBLIC KEY');
            expect(publicKey).toContain('END PUBLIC KEY');
        });
    });
    describe('getPrivateKey', () => {
        it('should return a valid private key', () => {
            const privateKey = service.getPrivateKey();
            expect(privateKey).toContain('BEGIN PRIVATE KEY');
            expect(privateKey).toContain('END PRIVATE KEY');
        });
    });
});
//# sourceMappingURL=crypto.service.spec.js.map