import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProyectosUsuarioCardComponent } from '../../../components/proyectos-usuario-card/proyectos-usuario-card.component';
import { ProyectosService } from '../../../services/proyectos.service';
import { Proyecto } from '../../../interfaces/proyecto';

@Component({
  selector: 'app-proyectos',
  imports: [CommonModule, ProyectosUsuarioCardComponent],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css',
})
export class ProyectosComponent {
  servicioProyectos = inject(ProyectosService);
  router = inject(Router);
  arrProyectos: Proyecto[] = [];
  isLoading = true;

  ngOnInit() {
    this.loadProyectos();
  }
  private loadProyectos() {
    this.isLoading = true;
    this.servicioProyectos.getAllProyectos().subscribe({
      next: (response: Proyecto[]) => {
        this.arrProyectos = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar proyectos:', error);
        this.isLoading = false;
      },
    });
  }
}
