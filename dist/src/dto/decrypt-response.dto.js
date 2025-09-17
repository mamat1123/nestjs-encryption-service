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
exports.DecryptResponseDto = exports.DecryptDataDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class DecryptDataDto {
}
exports.DecryptDataDto = DecryptDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Decrypted payload',
        example: 'Hello, World!',
    }),
    __metadata("design:type", String)
], DecryptDataDto.prototype, "payload", void 0);
class DecryptResponseDto {
}
exports.DecryptResponseDto = DecryptResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indicates if the operation was successful',
        example: true,
    }),
    __metadata("design:type", Boolean)
], DecryptResponseDto.prototype, "successful", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Error code if operation failed',
        example: null,
        required: false,
    }),
    __metadata("design:type", String)
], DecryptResponseDto.prototype, "error_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Decrypted data',
        type: DecryptDataDto,
        required: false,
    }),
    __metadata("design:type", DecryptDataDto)
], DecryptResponseDto.prototype, "data", void 0);
//# sourceMappingURL=decrypt-response.dto.js.map