import { Component, inject, Input, input } from '@angular/core';
import { Proyecto } from '../../../interfaces/proyecto';
import { BotoneraComponent } from '../oferta/botonera/botonera.component';
import { Router, RouterLink } from '@angular/router';
import { IFavoritosCambiar } from '../../../interfaces/ifavoritos-cambiar';
import { ProyectosService } from '../../../services/proyectos.service';

@Component({
  selector: 'app-proyectos-usuario-card',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './proyectos-usuario-card.component.html',
  styleUrl: './proyectos-usuario-card.component.css',
})
export class ProyectosUsuarioCardComponent {
  @Input() proyectoUnico!: Proyecto;
  proyectoService = inject(ProyectosService);

  favorita: IFavoritosCambiar;

  constructor() {
    this.favorita = {} as IFavoritosCambiar;
  }
  toggleFavorita() {
    if (this.proyectoUnico.esFavorito) {
      this.favorita = {
        id: this.proyectoUnico.idProyecto,
        estado: false,
      };
    } else {
      this.favorita = {
        id: this.proyectoUnico.idProyecto,
        estado: true,
      };
    }
    this.proyectoService
      .cambiarEstadoFavorito(this.favorita)
      .subscribe((response: any) => {
        this.proyectoUnico.esFavorito = !this.proyectoUnico.esFavorito;
      });
  }
}
