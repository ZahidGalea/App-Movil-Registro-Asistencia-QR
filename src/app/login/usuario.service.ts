import {Injectable} from '@angular/core';
import {Usuario} from './usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  listaUsuario: Usuario[] = [
    {
      usuario: 'zahid',
      password: '123',
      nombre: 'Zahid Galea',
      correo: 'z.galea@duocuc.cl'
    },
  ];

  constructor() {
  }

  getUsuario(usuarioInput: string) {
    // TODO: Hay que cambiar esto a extraccion de BD
    return {
      ...this.listaUsuario.find(usuario => usuario.usuario === usuarioInput)
    };
  }

}
