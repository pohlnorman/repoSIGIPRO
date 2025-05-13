import { Contrato } from "./contrato";

export interface Anexo {
    id: number;
    fechaEmisionAnexo: Date | null;
    estado: number;
    contratoId: number;
    contrato?: Contrato;
    fechaVigenciaAnexo: Date | null;
    motivo: string;
}
