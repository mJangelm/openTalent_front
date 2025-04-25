import { Component, inject, Input } from '@angular/core';
import { Oferta } from '../../../../../interfaces/oferta';
import { OfertaService } from '../../../../../services/oferta.service';
import { IFavoritosCambiar } from '../../../../../interfaces/ifavoritos-cambiar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-oferta-fav-card',
  imports: [RouterLink],
  standalone:true,
  templateUrl: './oferta-fav-card.component.html',
  styleUrl: './oferta-fav-card.component.css'
})
export class OfertaFavCardComponent {
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


