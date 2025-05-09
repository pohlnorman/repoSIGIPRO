export interface AuthRequest{
    username:string,
    password:string,
    rolId?:number,
    empresaId?:number|null,
    personaId?:number|null
}