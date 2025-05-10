import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { PostulanteI } from '../../interfaces/postulante';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-postulante-card',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './postulante-card.component.html',
  styleUrls: ['./postulante-card.component.css'],
})
export class PostulanteCardComponent {
  @Input() postulanteUnico!: PostulanteI;
  @Input() idProyecto!: number;
  @Input() tipo: 'oferta' | 'proyecto' = 'proyecto';
  @Output() onAccept = new EventEmitter<number>();
  @Output() onReject = new EventEmitter<number>();
  @Input() idOferta!: number;

  acceptPostulante(idUsuario: number) {
    Swal.fire({
      title: '¿Aceptar postulante?',
      text: '¿Estás seguro de que deseas aceptar a este postulante?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#535AA6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.onAccept.emit(idUsuario);
      }
    });
  }

  rejectPostulante(idUsuario: number) {
    Swal.fire({
      title: '¿Rechazar postulante?',
      text: '¿Estás seguro de que deseas rechazar a este postulante?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, rechazar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#535AA6',
    }).then((result) => {
      if (result.isConfirmed) {
        this.onReject.emit(idUsuario);
      }
    });
  }
}
