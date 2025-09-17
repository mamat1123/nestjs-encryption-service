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
exports.CryptoService = void 0;
const common_1 = require("@nestjs/common");
const crypto = require("crypto");
let CryptoService = class CryptoService {
    constructor() {
        if (process.env.PRIVATE_KEY_PEM && process.env.PUBLIC_KEY_PEM) {
            this.privateKey = process.env.PRIVATE_KEY_PEM;
            this.publicKey = process.env.PUBLIC_KEY_PEM;
        }
        else {
            const keyPair = crypto.generateKeyPairSync("rsa", {
                modulusLength: 2048,
                publicKeyEncoding: {
                    type: 'spki',
                    format: 'pem'
                },
                privateKeyEncoding: {
                    type: 'pkcs8',
                    format: 'pem'
                }
            });
            this.privateKey = keyPair.privateKey;
            this.publicKey = keyPair.publicKey;
        }
    }
    generateAESKey() {
        return crypto.randomBytes(32).toString("hex");
    }
    encryptAES(data, key) {
        const iv = crypto.randomBytes(16);
        const keyBuffer = Buffer.from(key, "hex");
        const cipher = crypto.createCipheriv("aes-256-cbc", keyBuffer, iv);
        let encrypted = cipher.update(data, "utf8", "hex");
        encrypted += cipher.final("hex");
        return iv.toString("hex") + ":" + encrypted;
    }
    decryptAES(encryptedData, key) {
        const parts = encryptedData.split(":");
        const iv = Buffer.from(parts[0], "hex");
        const encrypted = parts[1];
        const keyBuffer = Buffer.from(key, "hex");
        const decipher = crypto.createDecipheriv("aes-256-cbc", keyBuffer, iv);
        let decrypted = decipher.update(encrypted, "hex", "utf8");
        decrypted += decipher.final("utf8");
        return decrypted;
    }
    encryptRSA(data) {
        const encrypted = crypto.publicEncrypt(this.publicKey, Buffer.from(data, "utf8"));
        return encrypted.toString("base64");
    }
    decryptRSA(encryptedData) {
        const decrypted = crypto.privateDecrypt(this.privateKey, Buffer.from(encryptedData, "base64"));
        return decrypted.toString("utf8");
    }
    getPublicKey() {
        return this.publicKey;
    }
    getPrivateKey() {
        return this.privateKey;
    }
};
exports.CryptoService = CryptoService;
exports.CryptoService = CryptoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CryptoService);
//# sourceMappingURL=crypto.service.js.map