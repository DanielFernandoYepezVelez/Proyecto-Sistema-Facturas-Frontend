import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';

/* Services */
import { ClienteService } from '../../services/cliente.service';

/* Models(Client) */
import { Cliente } from 'src/app/models/Cliente';

/* Interfaces */
// import { ClienteResponse } from '../../interfaces/cliente.interface';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  public clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(res => this.clientes = res);
  }

  public delete(cliente: Cliente): void {
    Swal.fire({
      title: 'Estas Seguro?',
      text: `Seguro Que Desea Eliminar El Cliente ${cliente.nombre} ${cliente.apellido}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar Definitivamente!',
      cancelButtonText: 'Cancelar',
      // buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(() => {
          this.clientes = this.clientes.filter(cli => cli !== cliente);
          Swal.fire('Eliminado!', `Cliente ${cliente.nombre} Eliminado Exitosamente`, 'success');
        });
      }
    });
  }

}
