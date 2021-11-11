import {Platform} from '@ionic/angular';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';
import {SQLitePorter} from '@ionic-native/sqlite-porter/ngx';
import {BehaviorSubject, Observable} from 'rxjs';


export interface Asistencia {
  fecha: string;
  hora: string;
  semestre: string;
  carrera: string;
  ramo: string;
  qrId: string;
}


export interface Usuario {
  usuario: string;
  password: string;
  nombre: string;
  correo: string;
  rut: string;
}


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  usuarios = new BehaviorSubject([]);
  asistencias = new BehaviorSubject([]);

  private database: SQLiteObject;
  private dbReady = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient, private platform: Platform, private sqlite: SQLite, private sqlPorter: SQLitePorter) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'registraApp.db',
        location: 'default',
        createFromLocation: 1
      })
        .then((db: SQLiteObject) => {
            this.database = db;
            this.seedDatabase();
          }
        );
    });


  }

  seedDatabase() {
    // Obtener el archivo que contiene las sentencias SQL
    this.http.get('../assets/db/seed.sql', {responseType: 'text'})
      .subscribe(sql => {
        // Ejecutar las sentencias SQL del archivo
        this.sqlPorter.importSqlToDb(this.database, sql)
          .then(async _ => {
            this.dbReady.next(true);
            this.loadAsistencias();
            this.loadUsuarios();
            console.log('Base de datos lista.');
            console.log('Tablas creadas.');
          }).catch(e => {
          console.error('Error al importar la base de datos', e.message);
        });
      });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getAsistencias(): Observable<Asistencia[]> {
    return this.asistencias.asObservable();
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.usuarios.asObservable();
  }

  loadAsistencias() {
    return this.database.executeSql('SELECT * FROM ASISTENCIA', []).then(data => {
        let asistencias: Asistencia[] = [];
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            asistencias.push({
              qrId: data.rows.item(i).qrId,
              fecha: data.rows.item(i).fecha,
              hora: data.rows.item(i).hora,
              carrera: data.rows.item(i).carrera,
              semestre: data.rows.item(i).semestre,
              ramo: data.rows.item(i).ramo
            });
          }
        }
        this.asistencias.next(asistencias);
      }
    );
  }

  loadUsuarios() {
    return this.database.executeSql('SELECT * FROM USUARIO', []).then(data => {
        let usuarios: Usuario[] = [];
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            usuarios.push({
              rut: data.rows.item(i).rut,
              nombre: data.rows.item(i).nombre,
              usuario: data.rows.item(i).usuario,
              correo: data.rows.item(i).correo,
              password: data.rows.item(i).password
            });
          }
        }
        this.usuarios.next(usuarios);
      }
    );
  }

  addAsistencia(carrera: string, fecha: string, hora: string, qrId: string, ramo: string, semestre: string) {
    this.database.executeSql('INSERT INTO ASISTENCIA (carrera,qrId,semestre,fecha,hora,usuario, ramo) ' +
      'VALUES (?,?,?,?,?,?,?)', [carrera, qrId, semestre, fecha, hora, 'zahid', ramo])
      .then(data => {
        this.loadAsistencias();
      });

  }

  getUsuario(usuario: string) {
    return this.database.executeSql('SELECT * FROM USUARIO WHERE usuario = ?', [usuario]).then(data => {
      return {
        usuario: data.rows.item(0).usuario,
        password: data.rows.item(0).password
      };
    });

  }


}
