import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

import Swal from 'sweetalert2';
import { Oferta } from '../../interfaces/iempresa-detalle';
import { OfertaService } from '../../services/oferta.service';

@Component({
  selector: 'app-mis-ofertas-card',
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
  ],
  templateUrl: './mis-ofertas-card.component.html',
  styleUrls: ['./mis-ofertas-card.component.css'],
})
export class MisOfertasCardComponent {
  @Input() OfertaUnica!: Oferta;
  @Output() deleted = new EventEmitter<number>();

  router = inject(Router);

  servicioOferta = inject(OfertaService);

  editarOferta(id: number): void {
    // Usando un array de segmentos de ruta
    this.router.navigate(['/ofertas/edit', id]);
  }
  eliminarOferta(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la oferta.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí,  eliminar oferta',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('onCerrarOferta() id →', id);
        this.servicioOferta.cerrarOferta(id).subscribe({
          next: (oferta) => {
            Swal.fire(
              'Oferta eliminada',
              'La oferta se ha eliminado correctamente',
              'success'
            );
            // Avisamos al padre para que la borre del array
            this.deleted.emit(id);
          },
          error: (err) => {
            console.error('CerrarOferta subscription error →', err);
            Swal.fire('Error', 'No se pudo eliminar la oferta', 'error');
          },
        });
      }
    });
  }

  verPostulantes(arg0: number) {
    throw new Error('Method not implemented.');
  }
  toggleFavorita() {
    throw new Error('Method not implemented.');
  }
}
