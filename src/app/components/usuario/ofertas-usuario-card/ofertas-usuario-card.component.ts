import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Oferta } from '../../../interfaces/oferta';
import { RouterLink } from '@angular/router';
import { OfertaService } from '../../../services/oferta.service';
import { IFavoritosCambiar } from '../../../interfaces/ifavoritos-cambiar';
import { CommonModule } from '@angular/common';
import { ImageLoaderComponent } from '../../image-loader/image-loader.component';

@Component({
  selector: 'app-ofertas-usuario-card',
  imports: [RouterLink, CommonModule, ImageLoaderComponent],
  templateUrl: './ofertas-usuario-card.component.html',
  styleUrl: './ofertas-usuario-card.component.css',
})
export class OfertasUsuarioCardComponent {
  @Input() OfertaUnica!: Oferta;
  @Output() quitarFavoritoOferta = new EventEmitter<Oferta>();

  ofertaService = inject(OfertaService);
  favorita: IFavoritosCambiar;
  constructor() {
    this.favorita = {} as IFavoritosCambiar;
  }
  toggleFavorita() {
    const nuevaEsFavorita = !this.OfertaUnica.esFavorita;

    this.favorita = {
      id: this.OfertaUnica.idOferta,
      estado: nuevaEsFavorita,
    };

    this.ofertaService.cambiarEstadoFavorito(this.favorita).subscribe(() => {
      this.OfertaUnica.esFavorita = nuevaEsFavorita;

      // Emitir solo si se ha quitado de favoritos
      if (!nuevaEsFavorita) {
        this.quitarFavoritoOferta.emit(this.OfertaUnica);
      }
    });
  }
}
