export interface ClienteResponse {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    createdAt: string;
}

export interface ResponseServer {
    cliente: ClienteResponse;
    mensaje: string;
}