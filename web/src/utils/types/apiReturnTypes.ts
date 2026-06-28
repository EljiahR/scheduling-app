export interface UserSignInDto {
    accessToken: string;
    refreshToken: string;
    lastPunch: string | null;
}