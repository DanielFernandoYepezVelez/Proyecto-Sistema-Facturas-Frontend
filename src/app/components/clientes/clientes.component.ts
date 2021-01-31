import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/* Services */
import { ClienteService } from '../../services/cliente.service';

/* Models(Client) */
import { Cliente } from 'src/app/models/Cliente';

/* Interfaces */
import { ResponseServerPages } from 'src/app/interfaces/paginacion.interface';
// import { ClienteResponse } from '../../interfaces/cliente.interface';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  public clientes: Cliente[] = [];
  public paginador: ResponseServerPages;

  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>  {
      let page = +params.get('page'); // Operador De Suma Me Parsea De Un String A Number

      if (!page) {
        page = 0;
      }

      this.clienteService.getClientes(page).subscribe((res: ResponseServerPages) => {
        this.paginador = res;
        this.clientes = res.content;
      });
    });
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
