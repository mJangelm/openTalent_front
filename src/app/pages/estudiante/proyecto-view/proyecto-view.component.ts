import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProyectosService } from '../../../services/proyectos.service';
import { Proyecto } from '../../../interfaces/proyecto';
import { Empresa } from '../../../interfaces/empresa';

@Component({
  selector: 'app-proyecto-view',
  imports: [],
  standalone:true,
  templateUrl: './proyecto-view.component.html',
  styleUrl: './proyecto-view.component.css'
})
export class ProyectoViewComponent {
  activatedRouter = inject(ActivatedRoute);
  servicioProyecto = inject(ProyectosService);
  miProyecto: Proyecto;
  constructor() {
    this.miProyecto = {} as Proyecto;
  }

  ngOnInit() {
    this.loadProyecto();
  }

  loadProyecto() {
    this.activatedRouter.params.subscribe((response: any) => {
      const id: number = response._id as number;
      console.log('ID recibido:', id);  // Verifica si el ID es correcto
  
      this.servicioProyecto.getById(id).subscribe((data: Proyecto) => {
        console.log('Proyecto recibido:', data);  // Verifica los datos recibidos
        this.miProyecto = data;
      });
    });
  }
  
}
