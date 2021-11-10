import {Injectable} from '@angular/core';
import {RegistroAsistenciaModel} from './registro-asistencia.model';

@Injectable({
  providedIn: 'root'
})
export class RegistroAsistenciaService {

  listaAsistencias: RegistroAsistenciaModel[] = [
    {
      carrera: 'Ing. Informática',
      qrId: 'asd231fasd',
      ramo: 'Progra Movil',
      semestre: '4',
      fecha: '2021-01-01',
      hora: '10:00:00'
    }
  ];

  constructor() {
  }

  addRegistroAsistencia(carrera: string, fecha: string, hora: string, qrId: string, ramo: string, semestre: string) {

    //  TODO: Agregar codigo de guardado en Base de datos
    this.listaAsistencias.push({
      carrera: carrera,
      fecha: fecha,
      qrId: qrId,
      semestre: semestre,
      hora: hora,
      ramo: ramo
    });
    return true;

  }

  getRegistrosAsistencias() {
    return [
      ...this.listaAsistencias
    ];
  };


}
