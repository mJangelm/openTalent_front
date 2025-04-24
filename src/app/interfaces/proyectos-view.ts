export interface ProyectosView {
  idProyecto: number;
  nombreUsuario: string;
  apellidos: string;
  fotoUsuario: string;
  fechaInicio: string;
  titulo: string;
  foto: string;
  fotoContenido: string;
  plazasRestantes: number;
  esFavorito: boolean;
  descripcion: string;
  estadoAplicacion: string;
  participantes: Participante[];
}
export interface Participante {
  idUsuario: number;
  nombre: string;
  apellidos: string;
  fotoPerfil: string;
}
