import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProyectosService } from '../../../services/proyectos.service';
import { Proyecto } from '../../../interfaces/proyecto';
import { Empresa } from '../../../interfaces/empresa';
import { ProyectosView } from '../../../interfaces/proyectos-view';
import { IFavoritosCambiar } from '../../../interfaces/ifavoritos-cambiar';

@Component({
  selector: 'app-proyecto-view',
  imports: [],
  standalone: true,
  templateUrl: './proyecto-view.component.html',
  styleUrl: './proyecto-view.component.css',
})
export class ProyectoViewComponent {
  activatedRouter = inject(ActivatedRoute);
  servicioProyecto = inject(ProyectosService);
  miProyecto!: ProyectosView;
  favorita: IFavoritosCambiar;
  constructor() {
    this.miProyecto = {} as ProyectosView;
    this.favorita = {} as IFavoritosCambiar;
  }

  ngOnInit() {
    this.loadProyecto();
  }

  loadProyecto() {
    this.activatedRouter.params.subscribe((response: any) => {
      const id: number = response._id as number;
      console.log('ID recibido:', id); // Verifica si el ID es correcto

      this.servicioProyecto.getById(id).subscribe((data: ProyectosView) => {
        console.log('Proyecto recibido:', data); // Verifica los datos recibidos
        this.miProyecto = data;
      });
    });
  }

  toggleFavorita() {
    if (this.miProyecto.esFavorito) {
      this.favorita = {
        id: this.miProyecto.idProyecto,
        estado: false,
      };
    } else {
      this.favorita = {
        id: this.miProyecto.idProyecto,
        estado: true,
      };
    }
    this.servicioProyecto
      .cambiarEstadoFavorito(this.favorita)
      .subscribe((response: any) => {
        this.miProyecto.esFavorito = !this.miProyecto.esFavorito;
      });
  }
}
