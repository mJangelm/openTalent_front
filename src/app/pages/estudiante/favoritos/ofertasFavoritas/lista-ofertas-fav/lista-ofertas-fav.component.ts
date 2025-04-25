import { Component, inject } from '@angular/core';
import { OfertaService } from '../../../../../services/oferta.service';
import { Router } from '@angular/router';
import { Oferta } from '../../../../../interfaces/oferta';
import { OfertaFavCardComponent } from '../oferta-fav-card/oferta-fav-card.component';

@Component({
  selector: 'app-lista-ofertas-fav',
  imports: [OfertaFavCardComponent],
  standalone:true,
  templateUrl: './lista-ofertas-fav.component.html',
  styleUrl: './lista-ofertas-fav.component.css'
})
export class ListaOfertasFavComponent {
  servicioOfertas = inject(OfertaService);
  router = inject(Router);
  arrOfertasFavoritas!: Oferta[];
  isMenuOpenHome: boolean = false;

  toggleMenuHome() {
    this.isMenuOpenHome = !this.isMenuOpenHome;
  }

  ngOnInit() {
    this.servicioOfertas.getAllOfertasFavoritas().subscribe((response: any) => {
      this.arrOfertasFavoritas = response;
    });
  }

}
