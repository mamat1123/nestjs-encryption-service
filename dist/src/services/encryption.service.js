"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionService = void 0;
const common_1 = require("@nestjs/common");
const crypto_service_1 = require("./crypto.service");
let EncryptionService = class EncryptionService {
    constructor(cryptoService) {
        this.cryptoService = cryptoService;
    }
    async encryptData(payload) {
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
            const responseData = {
                data1: encryptedAESKey,
                data2: encryptedPayload,
            };
            return {
                successful: true,
                error_code: null,
                data: responseData,
            };
        }
        catch (error) {
            return {
                successful: false,
                error_code: 'ENCRYPTION_FAILED',
                data: null,
            };
        }
    }
    async decryptData(data1, data2) {
        try {
            const aesKey = this.cryptoService.decryptRSA(data1);
            const payload = this.cryptoService.decryptAES(data2, aesKey);
            const responseData = {
                payload: payload,
            };
            return {
                successful: true,
                error_code: null,
                data: responseData,
            };
        }
        catch (error) {
            return {
                successful: false,
                error_code: 'DECRYPTION_FAILED',
                data: null,
            };
        }
    }
};
exports.EncryptionService = EncryptionService;
exports.EncryptionService = EncryptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [crypto_service_1.CryptoService])
], EncryptionService);
//# sourceMappingURL=encryption.service.js.map