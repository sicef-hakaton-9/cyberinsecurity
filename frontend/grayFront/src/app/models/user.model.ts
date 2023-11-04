import { Role } from "./role.enum";

export interface User {
    id: string;
    name?: string;
    username: string;
    email: string;
    password: string;
    role: Role
}