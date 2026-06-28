export interface UserSignInDto {
    accessToken: string;
    refreshToken: string;
    userId: string;
    lastPunch: string | null;
}