import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { PostulanteI } from '../../interfaces/postulante';
import { ProyectosService } from '../../services/proyectos.service';
import { OfertaService } from '../../services/oferta.service';
import { IEstadoSolicitud } from '../../interfaces/iestado-solicitud';
import { Router, RouterLink } from '@angular/router';
import { I } from '@angular/cdk/keycodes';

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
  @Input() tipo: 'oferta' | 'proyecto' | undefined;
  @Input() idOferta!: number;

  private ofertaService = inject(OfertaService);
  private proyectoService = inject(ProyectosService);

  sendMessage(idUsuario: number) {
    console.log('Enviar mensaje a:', idUsuario);
  }

  acceptPostulante(idUsuario: number) {
    if (this.tipo === 'proyecto') {
      const estado: IEstadoSolicitud = {
        idProyecto: this.idProyecto,
        idUsuario: idUsuario,
        estado: 'ACEPTADO',
      };
      this.procesarSolicitudProyecto(estado);
    } else {
      this.procesarSolicitudOferta(idUsuario, true);
    }
  }

  rejectPostulante(idUsuario: number) {
    console.log(this.idProyecto);
    if (this.tipo === 'proyecto') {
      const estado: IEstadoSolicitud = {
        idProyecto: this.idProyecto,
        idUsuario: idUsuario,
        estado: 'RECHAZADO',
      };
      this.procesarSolicitudProyecto(estado);
    } else {
      this.procesarSolicitudOferta(idUsuario, false);
    }
  }

  private procesarSolicitudProyecto(estado: IEstadoSolicitud) {
    this.proyectoService.modificarEstadoPostulante(estado).subscribe({
      next: (response) => {
        console.log('Estado de proyecto actualizado:', response);
      },
      error: (error) => {
        console.error('Error al modificar estado del proyecto:', error);
      },
    });
  }

  private procesarSolicitudOferta(idUsuario: number, aceptar: boolean) {
    const service = aceptar
      ? this.ofertaService.aceptarPostulante(this.idOferta, idUsuario)
      : this.ofertaService.rechazarPostulante(this.idOferta, idUsuario);

    service.subscribe({
      next: (response) => {
        console.log(
          `Postulante ${aceptar ? 'aceptado' : 'rechazado'} correctamente:`,
          response
        );
      },
      error: (error) => {
        console.error(
          `Error al ${aceptar ? 'aceptar' : 'rechazar'} postulante:`,
          error
        );
      },
    });
  }
}
