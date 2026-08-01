export interface UserSignInDto {
    accessToken: string;
    refreshToken: string;
    userId: string;
    lastPunch: string | null;
}

export interface PunchDto {
    id: string;
    time: string;
    inPunch: boolean;
    userId: string;
}

export interface Punch {
    id: string;
    time: Date;
    inPunch: boolean;
    userId: string;
}

export interface DailyPunchesDto {
    day: string;
    punches: PunchDto[];
}

export interface DailyPunches {
    day: Date;
    punches: Punch[];
}