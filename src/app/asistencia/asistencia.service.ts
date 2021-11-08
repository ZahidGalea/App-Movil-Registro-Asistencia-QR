import {Injectable} from '@angular/core';
import {AsistenciaModel} from './asistencia.model';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  listaAsistencias: AsistenciaModel[] = [
    {
      carrera: 'Ing. Informática',
      fecha: '2021-01-01',
      hora: '21:00:00',
      qrId: 'Asdasd123asd',
      ramo: 'Programación Movil',
      semestre: '4'
    },
    {
      carrera: 'Ing. Informática',
      fecha: '2021-02-01',
      hora: '21:00:00',
      qrId: 'Asdasdasd123',
      ramo: 'Programación Movil',
      semestre: '4'
    },
    {
      carrera: 'Ing. Informática',
      fecha: '2021-03-01',
      hora: '21:00:00',
      qrId: 'Asdasdasd2',
      ramo: 'Programación Movil',
      semestre: '4'
    }
  ];

  constructor() {
  }


  getAsistencias() {
    //  TODO: Agregar codigo de Extraer de Base de datos
    return [...this.listaAsistencias];
  }

  addAsistencia(carrera: string, fecha: string, hora: string, qrId: string, ramo: string, semestre: string) {



    //  TODO: Agregar codigo de guardado en Base de datos
    return true;

  }

}
