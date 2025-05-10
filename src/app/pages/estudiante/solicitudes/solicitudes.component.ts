import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProyectosService } from '../../../services/proyectos.service';
import { PostulanteI } from '../../../interfaces/postulante';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PostulanteCardComponent } from '../../../components/postulante-card/postulante-card.component';

@Component({
  selector: 'app-solicitudes',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    PostulanteCardComponent,
  ],
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.css',
})
export class SolicitudesComponent {
  private proyectosService = inject(ProyectosService);
  private route = inject(ActivatedRoute);

  postulantes: PostulanteI[] = [];
  idProyecto!: number;
  isLoading = true;
  error: string | null = null;

  ngOnInit() {
    this.initializeComponent();
  }

  private initializeComponent() {
    const idParam = this.route.snapshot.paramMap.get('_id');

    if (!this.validateProjectId(idParam)) return;

    this.idProyecto = Number(idParam);
    console.log('ID del proyecto:', this.idProyecto);
    this.cargarPostulantes();
  }

  private validateProjectId(idParam: string | null): boolean {
    if (!idParam) {
      this.error = 'ID de proyecto no válido';
      this.isLoading = false;
      return false;
    }
    return true;
  }

  private cargarPostulantes() {
    this.isLoading = true;

    this.proyectosService.verPostulantes(this.idProyecto).subscribe({
      next: (response) => {
        this.postulantes = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error:', error);
        this.error = 'Error al cargar los postulantes';
        this.isLoading = false;
      },
    });
  }
}
