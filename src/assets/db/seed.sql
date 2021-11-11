CREATE TABLE IF NOT EXISTS USUARIO
(
  usuario  TEXT PRIMARY KEY,
  password TEXT,
  nombre   TEXT,
  correo   TEXT,
  rut      TEXT
);

CREATE TABLE IF NOT EXISTS ASISTENCIA
(
  carrera  TEXT,
  qrId     TEXT PRIMARY KEY,
  semestre TEXT,
  fecha    TEXT,
  hora     TEXT,
  usuario  TEXT,
  ramo     TEXT,
  FOREIGN KEY (usuario) REFERENCES USUARIO (usuario)
);

INSERT INTO USUARIO (usuario, password, nombre, correo, rut)
VALUES ('zahid', '123', 'Zahid Galea', 'zahidale.zg@gmail.com', '261093456');

INSERT INTO ASISTENCIA (carrera, qrId, semestre, fecha, hora, usuario, ramo)
VALUES ('Ing. Informática', '1231das321', '4', '2021-01-01', '21:00', 'zahid', 'Programacion Móvil');
