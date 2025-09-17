import { Injectable } from "@nestjs/common";
import * as crypto from "crypto";

@Injectable()
export class CryptoService {
  private readonly privateKey: string;
  private readonly publicKey: string;

  constructor() {
    // test fail
    if (process.env.PRIVATE_KEY_PEM && process.env.PUBLIC_KEY_PEM) {
      this.privateKey = process.env.PRIVATE_KEY_PEM;
      this.publicKey = process.env.PUBLIC_KEY_PEM;
    } else {
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

  generateAESKey(): string {
    return crypto.randomBytes(32).toString("hex");
  }

  encryptAES(data: string, key: string): string {
    const iv = crypto.randomBytes(16);
    const keyBuffer = Buffer.from(key, "hex");
    const cipher = crypto.createCipheriv("aes-256-cbc", keyBuffer, iv);
    let encrypted = cipher.update(data, "utf8", "hex");
    encrypted += cipher.final("hex");
    return iv.toString("hex") + ":" + encrypted;
  }

  decryptAES(encryptedData: string, key: string): string {
    const parts = encryptedData.split(":");
    const iv = Buffer.from(parts[0], "hex");
    const encrypted = parts[1];
    const keyBuffer = Buffer.from(key, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", keyBuffer, iv);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  }

  encryptRSA(data: string): string {
    const encrypted = crypto.publicEncrypt(
      this.publicKey,
      Buffer.from(data, "utf8")
    );
    return encrypted.toString("base64");
  }

  decryptRSA(encryptedData: string): string {
    const decrypted = crypto.privateDecrypt(
      this.privateKey,
      Buffer.from(encryptedData, "base64")
    );
    return decrypted.toString("utf8");
  }

  getPublicKey(): string {
    return this.publicKey;
  }

  getPrivateKey(): string {
    return this.privateKey;
  }
}
