export declare class CryptoService {
    private readonly privateKey;
    private readonly publicKey;
    constructor();
    generateAESKey(): string;
    encryptAES(data: string, key: string): string;
    decryptAES(encryptedData: string, key: string): string;
    encryptRSA(data: string): string;
    decryptRSA(encryptedData: string): string;
    getPublicKey(): string;
    getPrivateKey(): string;
}
