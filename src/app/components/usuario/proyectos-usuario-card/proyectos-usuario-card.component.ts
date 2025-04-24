import { Component, Input, input } from '@angular/core';
import { Proyecto } from '../../../interfaces/proyecto';
import { BotoneraComponent } from "../oferta/botonera/botonera.component";

@Component({
  selector: 'app-proyectos-usuario-card',
  imports: [BotoneraComponent],
  standalone:true,
  templateUrl: './proyectos-usuario-card.component.html',
  styleUrl: './proyectos-usuario-card.component.css'
})
export class ProyectosUsuarioCardComponent {

  @Input() proyectoUnico!: Proyecto;

}
