export interface ProyectoRequestI {
  idProyecto: number;
  nombre: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
  foto: string;
  fotoContenido: string;
  plazas: number;
  activo: boolean;
}
