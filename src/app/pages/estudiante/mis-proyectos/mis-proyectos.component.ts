import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectosUsuarioCardComponent } from '../../../components/usuario/proyectos-usuario-card/proyectos-usuario-card.component';
import { ProyectosService } from '../../../services/proyectos.service';
import { Router, RouterModule } from '@angular/router';
import { Proyecto } from '../../../interfaces/proyecto';

@Component({
  selector: 'app-mis-proyectos',
  imports: [CommonModule, ProyectosUsuarioCardComponent, RouterModule],
  templateUrl: './mis-proyectos.component.html',
  styleUrl: './mis-proyectos.component.css',
})
export class MisProyectosComponent {
  private servicioProyectos = inject(ProyectosService);
  private router = inject(Router);

  arrProyectos!: Proyecto[];
  editable = true;

  ngOnInit() {
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

  handleProjectDeleted(idProyecto: number) {
    const elementToRemove = document.querySelector(`[data-id="${idProyecto}"]`);

    if (elementToRemove) {
      // Añadir clase para iniciar la animación
      elementToRemove.classList.add('fade-out');

      // Esperar a que termine la animación antes de eliminar
      setTimeout(() => {
        this.arrProyectos = this.arrProyectos.filter(
          (proyecto) => proyecto.idProyecto !== idProyecto
        );
      }, 500); // Mismo tiempo que la transición CSS
    }
  }
}
