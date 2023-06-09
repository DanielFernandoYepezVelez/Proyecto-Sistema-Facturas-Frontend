import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Components */
import { FormComponent } from './components/form/form.component';

const routes: Routes = [
  // { path: 'clientes', component: ClientesComponent },
  // { path: 'directivas', component: DirectivaComponent },
  { path: 'clientes/form', component: FormComponent },
  { path: 'cliente/form/:id', component: FormComponent },
  // { path: 'clientes/page/:page', component: ClientesComponent },
  { path: '', redirectTo: '/clientes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
