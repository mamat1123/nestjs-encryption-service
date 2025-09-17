import { CryptoService } from './crypto.service';
import { EncryptResponseDto } from '../dto/encrypt-response.dto';
import { DecryptResponseDto } from '../dto/decrypt-response.dto';
export declare class EncryptionService {
    private readonly cryptoService;
    constructor(cryptoService: CryptoService);
    encryptData(payload: string): Promise<EncryptResponseDto>;
    decryptData(data1: string, data2: string): Promise<DecryptResponseDto>;
}
