import { Component, Input, OnInit } from '@angular/core';

/* Interfaces */
import { ResponseServerPages } from 'src/app/interfaces/paginacion.interface';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Input() paginadorChild: ResponseServerPages;
  public paginas: number[] = [];

  get numeroPaginas(): boolean {
    return this.paginas?.length > 0;
  }

  constructor() { }

  ngOnInit(): void {
    this.paginas = new Array(this.paginadorChild?.totalPages).fill(0).map((valor, indice) => indice + 1);
  }

}
