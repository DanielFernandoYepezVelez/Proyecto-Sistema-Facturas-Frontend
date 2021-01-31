import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { /* tap, */ catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/* Interfaces */
import { ResponseServerErrorID } from '../interfaces/error.interface';
import { ClienteResponse, ResponseServer } from '../interfaces/cliente.interface';
import { ResponseServerPages } from '../interfaces/paginacion.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint = 'http://localhost:8080/api';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }

  /* Clientes Sin Paginación
  public getClientes(): Observable<ClienteResponse[]> {
    return this.http.get<ClienteResponse[]>(`${this.urlEndPoint}/clientes`)
      .pipe(
        // tap(console.log),
      );
  } */

  /* Clientes Con Paginación */
  public getClientes(page: number): Observable<ResponseServerPages> {
    return this.http.get<ResponseServerPages>(`${this.urlEndPoint}/clientes/page/${page}`)
      .pipe(
        // tap(console.log),
        map(res =>  res)
      );
  }

  /* Validando En Caso De Que Al ID No Exista */
  public getCliente(id: number): Observable<ClienteResponse> {
    return this.http.get<ClienteResponse>(`${this.urlEndPoint}/cliente/${id}`)
      .pipe(
        // tap(console.log),
        catchError((res: ResponseServerErrorID) => {
          this.router.navigate(['/clientes']);
          Swal.fire('Error Al Editar', res.error.mensaje, 'error');
          return throwError(res);
        })
      );
  }

  /* Validando En Caso De Que El Email Exista O Un Dato Falte En El Formulario */
  public create(cliente: ClienteResponse): Observable<ClienteResponse> {
    return this.http.post<ResponseServer>(`${this.urlEndPoint}/cliente`, cliente, { headers: this.httpHeaders })
      .pipe(
        // tap(console.log),
        map(res => res.cliente),
        catchError((res: any) => {

          if (res?.status !== 400) {
            Swal.fire('Error Al Crear El Cliente', res?.error?.mensaje, 'error');
          }

          return throwError(res);
        })
      );
  }

  /* Validando En Caso De Que Al ID No Exista */
  public update(cliente: ClienteResponse): Observable<ClienteResponse> {
    return this.http.put<ResponseServer>(`${this.urlEndPoint}/cliente/${cliente.id}`, cliente, { headers: this.httpHeaders })
      .pipe(
        // tap(console.log),
        map(res => res.cliente),
        catchError((res: any) => {

          if (res?.status !== 400) {
            Swal.fire('Error Al Actulizar El Cliente', res?.error?.mensaje, 'error');
          }

          return throwError(res);
        })
      );
  }

  /* No Hay Error Visible Por El Momento */
  public delete(id: number): Observable<ClienteResponse> {
    return this.http.delete<ClienteResponse>(`${this.urlEndPoint}/cliente/${id}`, { headers: this.httpHeaders })
      .pipe(
        // tap(console.log),
      );
  }

}
