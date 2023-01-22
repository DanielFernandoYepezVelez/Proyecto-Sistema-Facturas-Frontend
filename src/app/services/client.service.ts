import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/* Interfaces */
import { ResponseServerErrorID } from '../interfaces/error.interface';
import { ClientResponse, ResponseServer } from '../interfaces/client.interface';
import { ResponseServerPages } from '../interfaces/paginacion.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private urlEndPoint = 'http://localhost:8080/api';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }

/* ===================================================================================================== */
  /* Clientes Sin Paginación */
  /* public getClients(): Observable<ClientResponse[]> {
    return this.http.get<ClientResponse[]>(`${this.urlEndPoint}/clients`)
      .pipe(
        // tap(console.log),
      );
  } */
/* ===================================================================================================== */

/* ===================================================================================================== */
  /* Clientes Con Paginación */
  public getClients(page: number): Observable<ResponseServerPages> {
    return this.http.get<ResponseServerPages>(`${this.urlEndPoint}/clients/page/${page}`)
      .pipe(
        // tap(console.log),
        map(res => res)
      );
  }
/* ===================================================================================================== */

  /* ===================================================================================================== */
  /* Validando En Caso De Que Al ID No Exista */
  public getClient(id: number): Observable<ClientResponse> {
    return this.http.get<ClientResponse>(`${this.urlEndPoint}/client/${id}`)
      .pipe(
        /* tap(console.log), */
        catchError((res: ResponseServerErrorID) => {
          this.router.navigate(['/clients']);
          Swal.fire('Error Al Editar', res.error.message, 'error');
          return throwError(res);
        })
      );
  }
/* ===================================================================================================== */

/* ===================================================================================================== */
  /* Validando En Caso De Que El Email Exista O Un Dato Falte En El Formulario */
  public create(client: ClientResponse): Observable<ClientResponse> {
    return this.http.post<ResponseServer>(`${this.urlEndPoint}/client`, client, { headers: this.httpHeaders })
      .pipe(
        /* tap(console.log) */
        map(res => res.client),
        catchError((res: any) => {
          if (res?.status === 400) {
            Swal.fire('Error Al Crear El Cliente', res?.error?.errors, 'error');
          }
          return throwError(res);
        })
      );
  }
/* ===================================================================================================== */

/* ===================================================================================================== */
  /* Validando En Caso De Que Al ID No Exista */
  public update(client: ClientResponse): Observable<ClientResponse> {
    return this.http.put<ResponseServer>(`${this.urlEndPoint}/clients/${client.id}`, client, { headers: this.httpHeaders })
      .pipe(
        // tap(console.log),
        map(res => res.client),
        catchError((res: any) => {
          if (res?.status !== 400) {
            Swal.fire('Error Al Actulizar El Cliente', res?.error?.message, 'error');
          }
          return throwError(res);
        })
      );
  }
/* ===================================================================================================== */

/* ===================================================================================================== */
  /* No Hay Error Visible Por El Momento */
  public delete(id: number): Observable<ClientResponse> {
    return this.http.delete<ClientResponse>(`${this.urlEndPoint}/clients/${id}`, { headers: this.httpHeaders })
      .pipe(
        // tap(console.log),
      );
  }
}
/* ===================================================================================================== */