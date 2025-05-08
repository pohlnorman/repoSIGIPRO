import { User } from "./user";

export interface AuthResponse{
    isAuthenticated?:boolean,
    message?:string,
    user?:User
}