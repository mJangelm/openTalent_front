import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OfertaService } from '../../../services/oferta.service';
import { Oferta } from '../../../interfaces/oferta';
import { OfertaDetalle } from '../../../interfaces/oferta-detalle';
import { IFavoritosCambiar } from '../../../interfaces/ifavoritos-cambiar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-oferta-view',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './oferta-view.component.html',
  styleUrl: './oferta-view.component.css',
})
export class OfertaViewComponent {
  activatedRouter = inject(ActivatedRoute);
  detallesOferta = inject(OfertaService);
  miOferta: OfertaDetalle;
  favorita: IFavoritosCambiar;

  constructor() {
    this.miOferta = {} as OfertaDetalle;
    this.favorita = {} as IFavoritosCambiar;
  }

  ngOnInit() {
    this.loadOferta();
  }

  loadOferta() {
    this.activatedRouter.params.subscribe((response: any) => {
      const id: number = response._id as number;
      this.detallesOferta.getById(id).subscribe((data: OfertaDetalle) => {
        console.log(data);
        this.miOferta = data;
      });
    });
  }

  toggleFavorita() {
    if (this.miOferta.esFavorita) {
      this.favorita = {
        id: this.miOferta.idOferta,
        estado: false,
      };
    } else {
      this.favorita = {
        id: this.miOferta.idOferta,
        estado: true,
      };
    }
    this.detallesOferta
      .cambiarEstadoFavorito(this.favorita)
      .subscribe((response: any) => {
        this.miOferta.esFavorita = !this.miOferta.esFavorita;
      });
  }

  solicitarOferta() {
    if (this.miOferta.estadoAplicacion === 'PENDIENTE') {
      this.mostrarInfo(
        'Solicitud pendiente',
        'Tu solicitud ya está en proceso de revisión.'
      );
      return;
    }

    if (this.miOferta.estadoAplicacion === 'ACEPTADO') {
      this.mostrarExito(
        '¡Felicidades!',
        'Ya has sido aceptado en esta oferta.'
      );
      return;
    }

    if (this.miOferta.vacantesDisponibles <= 0) {
      this.mostrarError(
        'Sin vacantes',
        'No hay vacantes disponibles para esta oferta.'
      );
      return;
    }
    // Si es FAVORITO o RECHAZADO, dejamos inscribir

    this.detallesOferta.inscribirseOferta(this.miOferta.idOferta).subscribe({
      next: (response) => {
        this.mostrarExito(
          '¡Solicitud enviada!',
          'Te has inscrito correctamente. Ahora tu solicitud está pendiente.'
        );
        this.miOferta.estadoAplicacion = 'PENDIENTE'; // actualizamos
      },
      error: (error) => {
        if (error.status === 404) {
          this.mostrarError('Error', 'Usuario u oferta no encontrada.');
        } else if (error.status === 409) {
          this.mostrarInfo('Ya inscrito', 'Ya estás inscrito en esta oferta.');
          this.miOferta.estadoAplicacion = 'PENDIENTE';
        } else {
          this.mostrarError(
            'Error inesperado',
            'Ocurrió un error al intentar inscribirse.'
          );
        }
      },
    });
  }
  private mostrarError(titulo: string, texto: string) {
    Swal.fire({
      icon: 'error',
      title: titulo,
      text: texto,
      confirmButtonColor: '#4a4ea8',
    });
  }

  private mostrarInfo(titulo: string, texto: string) {
    Swal.fire({
      icon: 'info',
      title: titulo,
      text: texto,
      confirmButtonColor: '#4a4ea8',
    });
  }

  private mostrarExito(titulo: string, texto: string) {
    Swal.fire({
      icon: 'success',
      title: titulo,
      text: texto,
      confirmButtonColor: '#4a4ea8',
    });
  }
}
