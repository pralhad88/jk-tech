export interface JWTLoginPayload {
    username: string; 
    userId: number;
}

export interface LoginResponse {
    name: string;
    email: string;
    accessToken: string
    profilePicture: string | null
}