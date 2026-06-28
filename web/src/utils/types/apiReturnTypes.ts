export interface UserSignInDto {
    accessToken: string;
    refreshToken: string;
    userId: string;
    lastPunch: string | null;
}

export interface Punch {
    id: string;
    time: string;
    inPunch: boolean;
    userId: string;
}