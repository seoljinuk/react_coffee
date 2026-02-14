export interface LoginResponse {
    accessToken: string;
    name: string;
    email: string;
    role: "USER" | "ADMIN";
}