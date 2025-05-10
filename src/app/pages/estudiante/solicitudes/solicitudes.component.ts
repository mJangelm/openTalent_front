import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProyectosService } from '../../../services/proyectos.service';
import { PostulanteI } from '../../../interfaces/postulante';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PostulanteCardComponent } from '../../../components/postulante-card/postulante-card.component';
import Swal from 'sweetalert2';
import { IEstadoSolicitud } from '../../../interfaces/iestado-solicitud';

@Component({
  selector: 'app-solicitudes',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    PostulanteCardComponent,
  ],
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.css',
})
export class SolicitudesComponent {
  private proyectosService = inject(ProyectosService);
  private route = inject(ActivatedRoute);

  postulantes: PostulanteI[] = [];
  idProyecto!: number;
  isLoading = true;
  error: string | null = null;

  ngOnInit() {
    this.initializeComponent();
  }

  private initializeComponent() {
    const idParam = this.route.snapshot.paramMap.get('_id');

    if (!this.validateProjectId(idParam)) return;

    this.idProyecto = Number(idParam);

    this.cargarPostulantes();
  }

  private validateProjectId(idParam: string | null): boolean {
    if (!idParam) {
      this.error = 'ID de proyecto no válido';
      this.isLoading = false;
      return false;
    }
    return true;
  }

  private cargarPostulantes() {
    this.isLoading = true;

    this.proyectosService.verPostulantes(this.idProyecto).subscribe({
      next: (response) => {
        this.postulantes = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error:', error);
        this.error = 'Error al cargar los postulantes';
        this.isLoading = false;
      },
    });
  }

  handleAcceptPostulante(idUsuario: number) {
    const estado: IEstadoSolicitud = {
      idProyecto: this.idProyecto,
      idUsuario: idUsuario,
      estado: 'ACEPTADO',
    };

    const elementToRemove = document.querySelector(`[data-id="${idUsuario}"]`);
    if (elementToRemove) {
      elementToRemove.classList.add('fade-out');
    }

    this.proyectosService.modificarEstadoPostulante(estado).subscribe({
      next: () => {
        Swal.fire({
          title: 'Postulante aceptado',
          text: 'El postulante ha sido aceptado correctamente',
          icon: 'success',
          confirmButtonColor: '#535AA6',
          showConfirmButton: false,
          timer: 1500,
        });

        // Esperar a que termine la animación antes de eliminar
        setTimeout(() => {
          this.postulantes = this.postulantes.filter(
            (p) => p.idUsuario !== idUsuario
          );
        }, 400); // Mismo tiempo que la transición CSS
      },
      error: (error) => {
        console.error('Error:', error);
        Swal.fire({
          title: 'Error',
          text: 'Error al aceptar al postulante',
          icon: 'error',
          confirmButtonColor: '#d33',
        });
      },
    });
  }

  handleRejectPostulante(idUsuario: number) {
    const estado: IEstadoSolicitud = {
      idProyecto: this.idProyecto,
      idUsuario: idUsuario,
      estado: 'RECHAZADO',
    };

    const elementToRemove = document.querySelector(`[data-id="${idUsuario}"]`);
    if (elementToRemove) {
      elementToRemove.classList.add('fade-out');
    }

    this.proyectosService.modificarEstadoPostulante(estado).subscribe({
      next: () => {
        Swal.fire({
          title: 'Postulante rechazado',
          text: 'El postulante ha sido rechazado correctamente',
          icon: 'success',
          confirmButtonColor: '#535AA6',
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(() => {
          this.postulantes = this.postulantes.filter(
            (p) => p.idUsuario !== idUsuario
          );
        }, 400);
      },
      error: (error) => {
        console.error('Error:', error);
        Swal.fire({
          title: 'Error',
          text: 'Error al rechazar al postulante',
          icon: 'error',
          confirmButtonColor: '#d33',
        });
      },
    });
  }
}
