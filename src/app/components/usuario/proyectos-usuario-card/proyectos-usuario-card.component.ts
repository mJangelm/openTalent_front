import {
  Component,
  EventEmitter,
  inject,
  Input,
  input,
  Output,
} from '@angular/core';
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
  @Output() quitarFavoritoProyecto = new EventEmitter<Proyecto>();

  proyectoService = inject(ProyectosService);

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
}
