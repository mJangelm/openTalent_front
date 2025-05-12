import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertaService } from '../../../services/oferta.service';
import { PostulanteI } from '../../../interfaces/postulante';
import { PostulanteCardComponent } from '../../../components/postulante-card/postulante-card.component';
import Swal from 'sweetalert2';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-mi-oferta-postulantes',
  imports: [PostulanteCardComponent, CommonModule, MatProgressSpinnerModule],
  templateUrl: './mi-oferta-postulantes.component.html',
  styleUrls: ['./mi-oferta-postulantes.component.css'],
})
export class MiOfertaPostulantesComponent {
  private activatedRouter = inject(ActivatedRoute);
  servicioOferta = inject(OfertaService);
  idOferta!: number;
  arrPostulantes: PostulanteI[] = []; // Inicializamos como array vacío
  isLoading = true; // Añadir esta propiedad

  ngOnInit() {
    const idParam = this.activatedRouter.snapshot.paramMap.get('idOferta');
    if (!idParam) {
      console.error('No vino idOferta en la ruta');
      this.isLoading = false; // Desactivar loader en caso de error
      return;
    }

    const id = Number(idParam);
    if (isNaN(id)) {
      console.error('idOferta no es un número válido:', idParam);
      this.isLoading = false; // Desactivar loader en caso de error
      return;
    }
    this.idOferta = id;

    this.servicioOferta.getPostulantes(id).subscribe({
      next: (response: any) => {
        this.arrPostulantes = response;
        this.isLoading = false; // Desactivar loader cuando los datos llegan
      },
      error: (error) => {
        console.error('Error:', error);
        this.isLoading = false; // Desactivar loader en caso de error
      },
    });
  }

  handleAcceptPostulante(idUsuario: number) {
    const elementToRemove = document.querySelector(`[data-id="${idUsuario}"]`);
    if (elementToRemove) {
      elementToRemove.classList.add('fade-out');
    }

    this.servicioOferta.aceptarPostulante(this.idOferta, idUsuario).subscribe({
      next: () => {
        Swal.fire({
          title: 'Postulante aceptado',
          text: 'El postulante ha sido aceptado correctamente',
          icon: 'success',
          confirmButtonColor: '#535AA6',
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(() => {
          this.arrPostulantes = this.arrPostulantes.filter(
            (p) => p.idUsuario !== idUsuario
          );
        }, 400);
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
    const elementToRemove = document.querySelector(`[data-id="${idUsuario}"]`);
    if (elementToRemove) {
      elementToRemove.classList.add('fade-out');
    }

    this.servicioOferta.rechazarPostulante(this.idOferta, idUsuario).subscribe({
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
          this.arrPostulantes = this.arrPostulantes.filter(
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
