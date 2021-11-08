import {Component, OnInit} from '@angular/core';
import { AsistenciaService } from './asistencia.service';

@Component({
  selector: 'app-home',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  listaAsistencias = [];

  constructor(private asistenciaService: AsistenciaService) {


  }

  ngOnInit() {
    this.listaAsistencias = this.asistenciaService.getAsistencias();

  }

}
