import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/* Interfaces */
import { ClienteResponse } from '../interfaces/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint = 'http://localhost:8080/api';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  public getClientes(): Observable<ClienteResponse[]> {
    return this.http.get<ClienteResponse[]>(`${this.urlEndPoint}/clientes`)
      .pipe(
        tap(console.log),
      );
  }

  public create(cliente: ClienteResponse): Observable<ClienteResponse> {
    return this.http.post<ClienteResponse>(`${this.urlEndPoint}/cliente`, cliente, { headers: this.httpHeaders })
      .pipe(
        tap(console.log),
      );
  }

}
