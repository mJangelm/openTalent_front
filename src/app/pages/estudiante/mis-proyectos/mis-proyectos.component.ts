import { Component, inject } from '@angular/core';
import { ProyectosUsuarioCardComponent } from '../../../components/usuario/proyectos-usuario-card/proyectos-usuario-card.component';
import { ProyectosService } from '../../../services/proyectos.service';
import { Router, RouterModule } from '@angular/router';
import { Proyecto } from '../../../interfaces/proyecto';

@Component({
  selector: 'app-mis-proyectos',
  imports: [ProyectosUsuarioCardComponent, RouterModule],
  templateUrl: './mis-proyectos.component.html',
  styleUrl: './mis-proyectos.component.css',
})
export class MisProyectosComponent {
  servicioProyectos = inject(ProyectosService);
  router = inject(Router);
  arrProyectos!: Proyecto[];
  isMenuOpenHome: boolean = false;
  editable: boolean = true;

  constructor() {
    this.loadProyectos();
  }

  private loadProyectos() {
    this.servicioProyectos.getMisProyectos().subscribe({
      next: (response: Proyecto[]) => {
        this.arrProyectos = response;
      },
      error: (error) => {
        console.error('Error al cargar proyectos:', error);
      },
    });
  }
}
