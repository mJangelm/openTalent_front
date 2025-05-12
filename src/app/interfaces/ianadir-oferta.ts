export interface IanadirOferta {
  titulo: string;
  descripcion: string;
  nombreSector: string;
  fotoContenido: string;
  numeroPlazas: number;
  tipoOferta: 'PRACTICAS' | 'EMPLEO';
  modalidad: 'PRESENCIAL' | 'REMOTO' | 'HIBRIDO';
  fechaFin: Date;
}
