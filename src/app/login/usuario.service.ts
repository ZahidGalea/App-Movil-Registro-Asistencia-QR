import {Injectable} from '@angular/core';
import {Usuario} from './usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  listaUsuario: Usuario[] = [
    {
      usuario: 'zahid',
      password: '123456'
    },
  ];

  constructor() {
  }

  getUsuario(usuarioInput: string) {
    return {
      ...this.listaUsuario.find(usuario => usuario.usuario === usuarioInput)
    };
  }

}
