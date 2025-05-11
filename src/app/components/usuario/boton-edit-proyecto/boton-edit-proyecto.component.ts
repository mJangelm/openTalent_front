import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProyectosService } from '../../../services/proyectos.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-boton-edit-proyecto',
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
  ],
  templateUrl: './boton-edit-proyecto.component.html',
  styleUrls: ['./boton-edit-proyecto.component.css'],
})
export class BotonEditProyectoComponent {
  @Input() proyectoId!: number;
  @Output() onDelete = new EventEmitter<number>();
  @Output() onViewApplicants = new EventEmitter<number>();

  proyectoService = inject(ProyectosService);

  handleDelete() {
    this.onDelete.emit(this.proyectoId);
  }

  handleViewApplicants() {
    this.onViewApplicants.emit(this.proyectoId);
  }
}
