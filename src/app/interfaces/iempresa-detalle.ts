export interface IEmpresaDetalle {
  cif: string;
  nombreEmpresa: string;
  activo: boolean;
  email: string;
  foto: string;
  fotoContenido: string;
  destacado: boolean;
  direccion?: Direccion;
  numeroInscritos: number;
  descripcion: string;
  sectores?: Sector[];
  ofertas?: Oferta[];
  resennas?: Resenna[];
}
export interface Direccion {
  idDireccion: number;
  calle: string;
  pais: string;
  codigoPostal: string;
  provincia: string;
  poblacion: string;
}

export interface Sector {
  idSector: number;
  nombre: string;
  descripcion: string;
}

export interface Oferta {
  idOferta: number;
  titulo: string;
  descripcion: string;
  foto: string;
}

export interface Resenna {
  idResenna: number;
  titulo: string;
  comentario: string;
  puntuacion: number;
  valoracion: 'POSITIVA' | 'NEGATIVA';
  usuario: Usuario;
}

export interface Usuario {
  idUsuario: number;
  nombre: string;
  apellidos: string;
  fotoPerfil: string;
}
