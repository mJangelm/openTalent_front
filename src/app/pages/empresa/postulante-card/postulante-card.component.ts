import { Component, inject, Input } from '@angular/core';
import { PostulanteI } from '../../../interfaces/postulante';
import { RouterLink } from '@angular/router';
import { OfertaService } from '../../../services/oferta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-postulante-card',
  imports: [RouterLink],
  standalone:true,
  templateUrl: './postulante-card.component.html',
  styleUrl: './postulante-card.component.css'
})
export class PostulanteCardComponent {

  servicioOfertas = inject(OfertaService);
  @Input() postulanteUnico! : PostulanteI;
  @Input() idOferta!: number;


acceptPostulante(idUsuario: number): void {
  this.servicioOfertas
    .aceptarPostulante(this.idOferta, idUsuario)
    .subscribe({
      next: () => {
        Swal.fire({
          title: '¡ACEPTADO!',
          
          icon: 'success',
          confirmButtonText: 'OK'
        });
        // aquí podrías emitir un evento o eliminar la tarjeta
      },
      error: (err) => {
        console.error('Error al aceptar postulante:', err);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo aceptar al postulante.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      }
    });
}

rejectPostulante(idUsuario: number): void {
  this.servicioOfertas
    .rechazarPostulante(this.idOferta, idUsuario)
    .subscribe({
      next: () => {
        Swal.fire({
          title: '¡DESCARTADO!',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
        // aquí podrías emitir un evento o eliminar la tarjeta
      },
      error: (err) => {
        console.error('Error al rechazar postulante:', err);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo descartar al postulante.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      }
    });
}






getCvUrl(arg0: string) {
throw new Error('Method not implemented.');
}
sendMessage(arg0: number) {
throw new Error('Method not implemented.');
}
toggleFavorita() {
throw new Error('Method not implemented.');
}


}
