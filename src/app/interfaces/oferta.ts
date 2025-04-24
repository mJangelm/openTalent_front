export interface Direccion {
  idDireccion: number;
  calle: string;
  pais: string;
  codigoPostal: string;
  provincia: string;
  poblacion: string;
}

export interface Oferta {
  idOferta: number;
  fotoContenido: string;
  titulo: string;
  descripcion: string;
  foto: string;
  direccion?: Direccion;
  esFavorita: boolean;
}
