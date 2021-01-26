import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/* Services */
import { ClienteService } from '../../services/cliente.service';

/* Models (Instancias) */
import { Cliente } from 'src/app/models/Cliente';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public titulo = 'Crear Cliente';

  /* En Este Atributo Objeto Esta Mapeado-Enlazado(Data-Binding) El Formulario Gracias Al [(ngModel)] */
  public cliente: Cliente = new Cliente();

  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  public cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;

      if (id) {
        this.clienteService.getCliente(id).subscribe(client => {
          this.cliente = client;
        });
      }
    });
  }

  public create(): void {
    this.clienteService.create(this.cliente).subscribe(res => {
      Swal.fire('Nuevo Cliente', `Cliente ${res.nombre} Creado Con Exito!`, 'success');
      this.router.navigateByUrl('/clientes');
    });
  }

  public update(): void {
    this.clienteService.update(this.cliente).subscribe(res => {
      this.cliente = res;
      this.router.navigateByUrl('clientes');
      Swal.fire('Cliente Actualizado', `Cliente ${res.nombre} Actualizado Correctamente`, 'success');
    });
  }

}
