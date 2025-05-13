import { Contrato } from "./contrato";

export interface Finiquito {
    id: number;
    fechaFiniquito: Date | null;
    estado: number;
    contratoId: number;
    contrato?: Contrato;
    causalTermino: string;
    indemnizacion: string;
    vacacionesProporcionales: string;
    sueldoPendiente: string;
    ratificacion: string;
}
