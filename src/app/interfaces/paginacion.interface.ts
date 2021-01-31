import { ClienteResponse } from './cliente.interface';

export interface ResponseServerPages {
    content: ClienteResponse[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export interface Content {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    createdAt: Date;
}

export interface Pageable {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
}

export interface Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}