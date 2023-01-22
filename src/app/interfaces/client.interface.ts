export interface ClientResponse {
    id: number;
    name: string;
    lastName: string;
    email: string;
    createdAt: string;
}

export interface ResponseServer {
    client: ClientResponse;
    message: string;
}