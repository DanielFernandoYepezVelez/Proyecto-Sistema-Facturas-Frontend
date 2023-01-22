import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/* Services */
import { ClientService } from '../../services/client.service';

/* Models(Client) */
import { Client } from 'src/app/models/Client';

/* Interfaces */
import { ResponseServerPages } from 'src/app/interfaces/paginacion.interface';
// import { ClienteResponse } from '../../interfaces/cliente.interface';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  public clients: Client[] = [];
  public paginator: ResponseServerPages;

  public constructor(private clientService: ClientService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>  {
      // Operador De Suma Me Parsea De Un String A Number
      let page = +params.get('pageNumber');

      if (!page) {
        page = 0;
      }

      this.clientService.getClients(page).subscribe((res: ResponseServerPages) => {
        this.paginator = res;
        this.clients = res.content;
      });
    });
  }

  public delete(client: Client): void {
    Swal.fire({
      title: 'Estas Seguro?',
      text: `Seguro Que Desea Eliminar El Cliente ${client.name} ${client.lastName}`,
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
        this.clientService.delete(client.id).subscribe(() => {
          this.clients = this.clients.filter(cli => cli !== client);
          Swal.fire('Eliminado!', `Cliente ${client.name} Eliminado Exitosamente`, 'success');
        });
      }
    });
  }

}
