import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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

  constructor(private clienteService: ClienteService, private router: Router) { }

  ngOnInit(): void {
  }

  public create(): void {
    this.clienteService.create(this.cliente).subscribe((res) => {
      Swal.fire('Nuevo Cliente', `Cliente ${res.nombre} Creado Con Exito!`, 'success');
      this.router.navigateByUrl('/clientes');
    });
  }

}
