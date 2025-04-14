export interface Direccion {
    idDireccion: number;
    calle: string;
    pais: string;
    codigoPostal: string;
    provincia: string;
    poblacion: string;
  }
  
  export interface Oferta {
    idOfeta: number;  // Parece un typo, ¿debería ser "idOferta"?
    fotoContenido: string;
    titulo: string;
    descripcion: string;
    foto: string;
    direccion: Direccion;
    esFavorita: boolean;
  }