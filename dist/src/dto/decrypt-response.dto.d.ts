export declare class DecryptDataDto {
    payload: string;
}
export declare class DecryptResponseDto {
    successful: boolean;
    error_code: string | null;
    data: DecryptDataDto | null;
}
