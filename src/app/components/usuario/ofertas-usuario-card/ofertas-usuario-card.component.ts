import { Component, inject, Input } from '@angular/core';
import { Oferta } from '../../../interfaces/oferta';
import { OfertaViewComponent } from '../../../pages/estudiante/oferta-view/oferta-view.component';
import { BotoneraComponent } from '../oferta/botonera/botonera.component';
import { RouterLink } from '@angular/router';
import { OfertaService } from '../../../services/oferta.service';
import { IFavoritosCambiar } from '../../../interfaces/ifavoritos-cambiar';

@Component({
  selector: 'app-ofertas-usuario-card',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './ofertas-usuario-card.component.html',
  styleUrl: './ofertas-usuario-card.component.css',
})
export class OfertasUsuarioCardComponent {
  @Input() OfertaUnica!: Oferta;
  ofertaService = inject(OfertaService);
  favorita: IFavoritosCambiar;
  constructor() {
    this.favorita = {} as IFavoritosCambiar;
  }
  toggleFavorita() {
    if (this.OfertaUnica.esFavorita) {
      this.favorita = {
        id: this.OfertaUnica.idOferta,
        estado: false,
      };
    } else {
      this.favorita = {
        id: this.OfertaUnica.idOferta,
        estado: true,
      };
    }
    this.ofertaService
      .cambiarEstadoFavorito(this.favorita)
      .subscribe((response: any) => {
        this.OfertaUnica.esFavorita = !this.OfertaUnica.esFavorita;
      });
  }
}
