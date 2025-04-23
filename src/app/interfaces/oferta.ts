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
  titulo: string;
  descripcion: string;
  modalidad: string;
  imagenOferta: string;
  nombreEmpresa: string;
  fotoEmpresa: string;
  direccionEmpresa: Direccion;
  estadoAplicacion: string;
  esFavorita: boolean;
  vacantesDisponibles: number;
}
