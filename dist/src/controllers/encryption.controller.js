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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const encryption_service_1 = require("../services/encryption.service");
const encrypt_request_dto_1 = require("../dto/encrypt-request.dto");
const encrypt_response_dto_1 = require("../dto/encrypt-response.dto");
const decrypt_request_dto_1 = require("../dto/decrypt-request.dto");
const decrypt_response_dto_1 = require("../dto/decrypt-response.dto");
let EncryptionController = class EncryptionController {
    constructor(encryptionService) {
        this.encryptionService = encryptionService;
    }
    async encryptData(encryptRequest) {
        return this.encryptionService.encryptData(encryptRequest.payload);
    }
    async decryptData(decryptRequest) {
        return this.encryptionService.decryptData(decryptRequest.data1, decryptRequest.data2);
    }
};
exports.EncryptionController = EncryptionController;
__decorate([
    (0, common_1.Post)('get-encrypt-data'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Encrypt data',
        description: 'Encrypts the provided payload using AES and RSA encryption'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Data encrypted successfully',
        type: encrypt_response_dto_1.EncryptResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - validation failed',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [encrypt_request_dto_1.EncryptRequestDto]),
    __metadata("design:returntype", Promise)
], EncryptionController.prototype, "encryptData", null);
__decorate([
    (0, common_1.Post)('get-decrypt-data'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Decrypt data',
        description: 'Decrypts the provided encrypted data using RSA and AES decryption'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Data decrypted successfully',
        type: decrypt_response_dto_1.DecryptResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - validation failed',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [decrypt_request_dto_1.DecryptRequestDto]),
    __metadata("design:returntype", Promise)
], EncryptionController.prototype, "decryptData", null);
exports.EncryptionController = EncryptionController = __decorate([
    (0, swagger_1.ApiTags)('encryption'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [encryption_service_1.EncryptionService])
], EncryptionController);
//# sourceMappingURL=encryption.controller.js.map