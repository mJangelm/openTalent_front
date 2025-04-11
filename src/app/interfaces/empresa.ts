export interface Empresa {
    cif: string;
    nombreEmpresa: string; // en lugar de nombre_empresa
    activo: boolean;
    email: string;
    foto: string;
    fotoContenido: string;  // en lugar de foto_contenido
    direccion: {
      idDireccion: number;
      calle: string;
      pais: string;
      codigoPostal: string;
      provincia: string;
      poblacion: string;
    };
    destacado: boolean;
    sectores: any[]; // Agregar propiedades adicionales si las necesitas
}
