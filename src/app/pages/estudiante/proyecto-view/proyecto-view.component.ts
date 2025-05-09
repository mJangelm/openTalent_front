import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProyectosService } from '../../../services/proyectos.service';
import { Proyecto } from '../../../interfaces/proyecto';
import { Empresa } from '../../../interfaces/empresa';
import { ProyectosView } from '../../../interfaces/proyectos-view';
import { IFavoritosCambiar } from '../../../interfaces/ifavoritos-cambiar';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-proyecto-view',
  imports: [CommonModule, RouterLink],
  standalone: true,
  templateUrl: './proyecto-view.component.html',
  styleUrl: './proyecto-view.component.css',
})
export class ProyectoViewComponent {
  activatedRouter = inject(ActivatedRoute);
  servicioProyecto = inject(ProyectosService);
  miProyecto!: ProyectosView;
  favorita: IFavoritosCambiar;
  solicitando: boolean = false;

  constructor() {
    this.miProyecto = {} as ProyectosView;
    this.favorita = {} as IFavoritosCambiar;
  }

  ngOnInit() {
    this.loadProyecto();
  }

  loadProyecto() {
    this.activatedRouter.params.subscribe((response: any) => {
      const id: number = response._id as number;
      this.servicioProyecto.getById(id).subscribe((data: ProyectosView) => {
        this.miProyecto = data;
      });
    });
  }

  toggleFavorita() {
    if (this.miProyecto.esFavorito) {
      this.favorita = {
        id: this.miProyecto.idProyecto,
        estado: false,
      };
    } else {
      this.favorita = {
        id: this.miProyecto.idProyecto,
        estado: true,
      };
    }
    this.servicioProyecto
      .cambiarEstadoFavorito(this.favorita)
      .subscribe((response: any) => {
        this.miProyecto.esFavorito = !this.miProyecto.esFavorito;
      });
  }

  solicitarProyecto(idProyecto: number) {
    // Verificar si hay plazas disponibles
    if (this.miProyecto.plazasRestantes <= 0) {
      Swal.fire({
        title: 'No hay vacantes',
        text: 'Este proyecto no tiene plazas disponibles actualmente.',
        icon: 'warning',
        confirmButtonColor: '#535AA6',
      });
      return;
    }

    // Mostrar confirmación antes de solicitar
    Swal.fire({
      title: '¿Solicitar participación?',
      text: '¿Estás seguro de que quieres solicitar participar en este proyecto?',
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

        this.servicioProyecto.solicitarProyecto(idProyecto).subscribe({
          next: (response: any) => {
            this.solicitando = false;

            // Actualizar el estado de la aplicación en el componente
            this.miProyecto.estadoAplicacion = 'PENDIENTE';

            // Decrementar el número de plazas disponibles
            this.miProyecto.plazasRestantes--;

            // Mostrar mensaje de éxito
            Swal.fire({
              title: '¡Solicitud enviada!',
              text:
                response.mensaje ||
                'Solicitud enviada correctamente al proyecto.',
              icon: 'success',
              confirmButtonColor: '#535AA6',
            });
          },
          error: (error: HttpErrorResponse) => {
            this.solicitando = false;
            console.error('Error al solicitar proyecto:', error);

            // Manejar diferentes tipos de errores según el status code
            if (error.status === 409) {
              Swal.fire({
                title: 'Solicitud duplicada',
                text: 'Ya has solicitado participar en este proyecto.',
                icon: 'warning',
                confirmButtonColor: '#535AA6',
              });
            } else if (error.status === 404) {
              Swal.fire({
                title: 'No encontrado',
                text: 'Usuario o proyecto no encontrado.',
                icon: 'error',
                confirmButtonColor: '#535AA6',
              });
            } else {
              Swal.fire({
                title: 'Error',
                text: 'Ha ocurrido un error al enviar la solicitud. Inténtalo de nuevo más tarde.',
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
