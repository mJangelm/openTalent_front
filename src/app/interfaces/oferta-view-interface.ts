export interface DireccionEmpresa {
    idDireccion: number;
    calle: string;
    pais: string;
    codigoPostal: string;
    provincia: string;
    poblacion: string;
  }
  
  export interface OfertaDetalle {
    idOferta: number;
    titulo: string;
    descripcion: string;
    modalidad: string;
    imagenOferta: string;
    nombreEmpresa: string;
    fotoEmpresa: string;
    direccionEmpresa: DireccionEmpresa;
    estadoAplicacion: 'NO_APLICADO' | 'APLICADO' | string;
    esFavorita: boolean;
    vacantesDisponibles: number;
  }