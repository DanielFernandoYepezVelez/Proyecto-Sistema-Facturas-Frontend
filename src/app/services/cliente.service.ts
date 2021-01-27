import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/* Interfaces */
import { ClienteResponse, ResponseServer } from '../interfaces/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint = 'http://localhost:8080/api';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }

  public getClientes(): Observable<ClienteResponse[]> {
    return this.http.get<ClienteResponse[]>(`${this.urlEndPoint}/clientes`)
      .pipe(
        // tap(console.log),
      );
  }

  /* Validando En Caso De Que Al ID No Exista */
  public getCliente(id: number): Observable<ClienteResponse> {
    return this.http.get<ClienteResponse>(`${this.urlEndPoint}/cliente/${id}`)
      .pipe(
        // tap(console.log),
        catchError(res => {
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
        catchError(res => {
          Swal.fire('Error Al Crear El Cliente', res.error.mensaje, 'error');
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
        catchError(res => {
          Swal.fire('Error Al Crear El Cliente', res.error.mensaje, 'error');
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
