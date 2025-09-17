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
exports.EncryptResponseDto = exports.EncryptDataDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class EncryptDataDto {
}
exports.EncryptDataDto = EncryptDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Encrypted AES key (data1)',
        example: 'encrypted_aes_key_here',
    }),
    __metadata("design:type", String)
], EncryptDataDto.prototype, "data1", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Encrypted payload (data2)',
        example: 'encrypted_payload_here',
    }),
    __metadata("design:type", String)
], EncryptDataDto.prototype, "data2", void 0);
class EncryptResponseDto {
}
exports.EncryptResponseDto = EncryptResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indicates if the operation was successful',
        example: true,
    }),
    __metadata("design:type", Boolean)
], EncryptResponseDto.prototype, "successful", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Error code if operation failed',
        example: null,
        required: false,
    }),
    __metadata("design:type", String)
], EncryptResponseDto.prototype, "error_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Encrypted data',
        type: EncryptDataDto,
        required: false,
    }),
    __metadata("design:type", EncryptDataDto)
], EncryptResponseDto.prototype, "data", void 0);
//# sourceMappingURL=encrypt-response.dto.js.map