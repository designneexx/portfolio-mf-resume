export interface UserResponse {
    email: string;
    id: string;
    username: string;
}

export interface Tokens {
    accessToken: string;
    refreshToken: string;
}
