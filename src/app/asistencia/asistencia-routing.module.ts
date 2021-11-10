import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AsistenciaPage} from './asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: AsistenciaPage
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsistenciaRoutingModule {
}
