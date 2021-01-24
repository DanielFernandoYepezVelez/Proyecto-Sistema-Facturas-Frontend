import { Component, OnInit } from '@angular/core';

/* Services */
import { ClienteService } from '../../services/cliente.service';

/* Interfaces */
import { ClienteResponse } from '../../interfaces/cliente.interface';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  public clientes: ClienteResponse[] = [];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(res => this.clientes = res);
  }

}
