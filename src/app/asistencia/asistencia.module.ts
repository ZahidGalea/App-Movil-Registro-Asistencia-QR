import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistenciaRoutingModule } from './asistencia-routing.module';

import { AsistenciaPage } from './asistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistenciaRoutingModule
  ],
  declarations: [AsistenciaPage]
})
export class AsistenciaModule {}
