import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OfertaService } from '../../../services/oferta.service';
import { Oferta } from '../../../interfaces/oferta';
import { OfertaDetalle } from '../../../interfaces/oferta-detalle';
import { IFavoritosCambiar } from '../../../interfaces/ifavoritos-cambiar';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-oferta-view',
  imports: [RouterLink, CommonModule],
  templateUrl: './oferta-view.component.html',
  styleUrl: './oferta-view.component.css',
})
export class OfertaViewComponent {
  activatedRouter = inject(ActivatedRoute);
  detallesOferta = inject(OfertaService);
  miOferta: OfertaDetalle;
  favorita: IFavoritosCambiar;
  solicitando: boolean = false;

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
    // Verificar si hay vacantes disponibles
    if (this.miOferta.vacantesDisponibles <= 0) {
      Swal.fire({
        title: 'No hay vacantes',
        text: 'Esta oferta no tiene plazas disponibles actualmente.',
        icon: 'warning',
        confirmButtonColor: '#535AA6',
      });
      return;
    }

    // Verificar estados previos
    if (this.miOferta.estadoAplicacion === 'PENDIENTE') {
      Swal.fire({
        title: 'Solicitud pendiente',
        text: 'Tu solicitud ya está en proceso de revisión.',
        icon: 'info',
        confirmButtonColor: '#535AA6',
      });
      return;
    }

    if (this.miOferta.estadoAplicacion === 'ACEPTADO') {
      Swal.fire({
        title: '¡Felicidades!',
        text: 'Ya has sido aceptado en esta oferta.',
        icon: 'success',
        confirmButtonColor: '#535AA6',
      });
      return;
    }

    // Mostrar confirmación antes de solicitar
    Swal.fire({
      title: '¿Solicitar participación?',
      text: '¿Estás seguro de que quieres solicitar esta oferta?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, solicitar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#535AA6',
      cancelButtonColor: '#535AA6',
    }).then((result) => {
      if (result.isConfirmed) {
        // Mostrar indicador de carga
        this.solicitando = true;
        Swal.fire({
          title: 'Enviando solicitud...',
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
        });

        this.detallesOferta
          .inscribirseOferta(this.miOferta.idOferta)
          .subscribe({
            next: (response) => {
              this.solicitando = false;

              // Actualizar estado y decrementar vacantes
              this.miOferta.estadoAplicacion = 'PENDIENTE';
              this.miOferta.vacantesDisponibles--;

              Swal.fire({
                title: '¡Solicitud enviada!',
                text: 'Te has inscrito correctamente. Ahora tu solicitud está pendiente.',
                icon: 'success',
                confirmButtonColor: '#535AA6',
              });
            },
            error: (error: HttpErrorResponse) => {
              this.solicitando = false;

              if (error.status === 404) {
                Swal.fire({
                  title: 'Error',
                  text: 'Usuario u oferta no encontrada.',
                  icon: 'error',
                  confirmButtonColor: '#535AA6',
                });
              } else if (error.status === 409) {
                Swal.fire({
                  title: 'Ya inscrito',
                  text: 'Ya estás inscrito en esta oferta.',
                  icon: 'info',
                  confirmButtonColor: '#535AA6',
                });
                this.miOferta.estadoAplicacion = 'PENDIENTE';
              } else {
                Swal.fire({
                  title: 'Error inesperado',
                  text: 'Ocurrió un error al intentar inscribirse.',
                  icon: 'error',
                  confirmButtonColor: '#535AA6',
                });
              }
            },
          });
      }
    });
  }
}
