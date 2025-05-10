export interface IEstadoSolicitud {
  idUsuario: number;
  idProyecto: number;
  estado: 'PENDIENTE' | 'ACEPTADO' | 'RECHAZADO' | 'FAVORITO';
}
