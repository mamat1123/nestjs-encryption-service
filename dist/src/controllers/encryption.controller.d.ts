import { EncryptionService } from '../services/encryption.service';
import { EncryptRequestDto } from '../dto/encrypt-request.dto';
import { EncryptResponseDto } from '../dto/encrypt-response.dto';
import { DecryptRequestDto } from '../dto/decrypt-request.dto';
import { DecryptResponseDto } from '../dto/decrypt-response.dto';
export declare class EncryptionController {
    private readonly encryptionService;
    constructor(encryptionService: EncryptionService);
    encryptData(encryptRequest: EncryptRequestDto): Promise<EncryptResponseDto>;
    decryptData(decryptRequest: DecryptRequestDto): Promise<DecryptResponseDto>;
}
