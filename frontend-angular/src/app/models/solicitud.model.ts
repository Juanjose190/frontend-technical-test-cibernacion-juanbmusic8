// src/app/models/solicitud.model.ts
export enum CreditType {
    PERSONAL = 'PERSONAL',
    BUSINESS = 'BUSINESS'
}
export enum CreditStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED'
}

export interface Solicitud {
    customerName: string;
    amount: number;
    type: CreditType;
}

export interface SolicitudResponse {
    id: number;
    customerName: string;
    amount: number;
    type: CreditType;
    status: CreditStatus;
    createdAt: string;
    mensajeExito?: string;
    motivoRechazo?: string;
}
