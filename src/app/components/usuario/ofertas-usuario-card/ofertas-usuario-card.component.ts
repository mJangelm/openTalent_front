import { Component, Input } from '@angular/core';
import { Oferta } from '../../../interfaces/oferta';

@Component({
  selector: 'app-ofertas-usuario-card',
  imports: [],
  standalone:true,
  templateUrl: './ofertas-usuario-card.component.html',
  styleUrl: './ofertas-usuario-card.component.css'
})
export class OfertasUsuarioCardComponent {
  @Input() OfertaUnica!: Oferta;
}
