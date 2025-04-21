import { Component, Input } from '@angular/core';
import { Oferta } from '../../../interfaces/oferta';
import { OfertaViewComponent } from "../../../pages/estudiante/oferta-view/oferta-view.component";
import { BotoneraComponent } from "../oferta/botonera/botonera.component";

@Component({
  selector: 'app-ofertas-usuario-card',
  imports: [ BotoneraComponent],
  standalone:true,
  templateUrl: './ofertas-usuario-card.component.html',
  styleUrl: './ofertas-usuario-card.component.css'
})
export class OfertasUsuarioCardComponent {

  
  @Input() OfertaUnica!: Oferta;
}
