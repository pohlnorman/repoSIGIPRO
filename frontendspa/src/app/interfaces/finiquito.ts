import { Contrato } from "./contrato";

export interface Finiquito {
    id: number;
    fechaFiniquito: string;
    estado: number;
    contratoId: number;
    contrato?: Contrato
}
