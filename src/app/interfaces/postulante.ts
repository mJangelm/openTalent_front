export interface DireccionI {
    idDireccion: number;
    calle: string;
    pais: string;
    codigoPostal: string;
    provincia: string;
    poblacion: string;
  }
  
  export interface PostulanteI {
    idUsuario: number;
    nombre: string;
    apellidos: string;
    email: string;
    estudios: string;
    experiencia: string;
    cv: string;
    fotoPerfil: string;
    telefono: string;
    username: string;
    fechaAlta: Date;       
    fechaNacimiento: Date; 
    activo: boolean;
    empresa: string;
    direccion: DireccionI;
    rol: string;
  }