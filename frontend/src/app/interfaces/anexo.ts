import { Contrato } from "./contrato";

export interface Anexo {
    id?: number;
    fechaAnexo: string;
    estado: number;
    contratoId: number;
    contrato: Contrato
}
