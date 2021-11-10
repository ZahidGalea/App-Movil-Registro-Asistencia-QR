import {Injectable} from '@angular/core';
import {RegistroAsistenciaService} from './registro/registro-asistencia.service';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  constructor(private registroAsistenciaS: RegistroAsistenciaService) {
  }

  getAsistencias() {
    //  TODO: Agregar codigo de Extraer de Base de datos
    return [...this.registroAsistenciaS.getRegistrosAsistencias()];
  }

}
