import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  public nombre: string;
  public apellido: string;
  public email: string;
  public createdAt: string;

  

  constructor() { }

  ngOnInit(): void {
  }

}
