export interface User {
    email: string;
    name: string;
    role: "USER" | "ADMIN";
}