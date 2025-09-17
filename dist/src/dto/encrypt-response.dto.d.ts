export declare class EncryptDataDto {
    data1: string;
    data2: string;
}
export declare class EncryptResponseDto {
    successful: boolean;
    error_code: string | null;
    data: EncryptDataDto | null;
}
