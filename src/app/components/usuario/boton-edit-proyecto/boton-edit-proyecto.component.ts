import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

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
  styleUrl: './boton-edit-proyecto.component.css',
})
export class BotonEditProyectoComponent {
  @Input() proyectoId!: number;
  @Output() onDelete = new EventEmitter<number>();
  @Output() onViewApplicants = new EventEmitter<number>();

  handleDelete() {
    this.onDelete.emit(this.proyectoId);
  }

  handleViewApplicants() {
    this.onViewApplicants.emit(this.proyectoId);
  }
}
