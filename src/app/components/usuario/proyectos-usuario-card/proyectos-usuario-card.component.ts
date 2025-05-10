import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Proyecto } from '../../../interfaces/proyecto';
import { Router } from '@angular/router';
import { IFavoritosCambiar } from '../../../interfaces/ifavoritos-cambiar';
import { ProyectosService } from '../../../services/proyectos.service';
import { BotonEditProyectoComponent } from '../boton-edit-proyecto/boton-edit-proyecto.component';
import { CommonModule } from '@angular/common';
import { ImageLoaderComponent } from '../../image-loader/image-loader.component';

@Component({
  selector: 'app-proyectos-usuario-card',
  imports: [BotonEditProyectoComponent, CommonModule, ImageLoaderComponent],
  standalone: true,
  templateUrl: './proyectos-usuario-card.component.html',
  styleUrl: './proyectos-usuario-card.component.css',
})
export class ProyectosUsuarioCardComponent {
  @Input() proyectoUnico!: Proyecto;
  @Input() esEditable!: boolean;
  @Output() quitarFavoritoProyecto = new EventEmitter<Proyecto>();

  proyectoService = inject(ProyectosService);
  router = inject(Router);
  favorita: IFavoritosCambiar;

  constructor() {
    this.favorita = {} as IFavoritosCambiar;
  }
  toggleFavorita() {
    const nuevaEsFavorito = !this.proyectoUnico.esFavorito;

    this.favorita = {
      id: this.proyectoUnico.idProyecto,
      estado: nuevaEsFavorito,
    };

    this.proyectoService.cambiarEstadoFavorito(this.favorita).subscribe(() => {
      this.proyectoUnico.esFavorito = nuevaEsFavorito;
      //Notificamos al padre que se ha quitado de favoritos
      if (!nuevaEsFavorito) {
        this.quitarFavoritoProyecto.emit(this.proyectoUnico);
      }
    });
  }

  verProyecto() {
    if (!this.esEditable) {
      this.router.navigate([
        '/usuario/proyectos/' + this.proyectoUnico.idProyecto,
      ]);
    }
  }
}
