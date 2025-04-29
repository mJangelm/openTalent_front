import { Component, inject } from '@angular/core';
import { OfertaService } from '../../../../../services/oferta.service';
import { Router } from '@angular/router';
import { Oferta } from '../../../../../interfaces/oferta';
import { OfertaFavCardComponent } from '../oferta-fav-card/oferta-fav-card.component';
import { OfertasUsuarioCardComponent } from '../../../../../components/usuario/ofertas-usuario-card/ofertas-usuario-card.component';
import { Proyecto } from '../../../../../interfaces/proyecto';
import { ProyectosService } from '../../../../../services/proyectos.service';
import { ProyectosUsuarioCardComponent } from '../../../../../components/usuario/proyectos-usuario-card/proyectos-usuario-card.component';

@Component({
  selector: 'app-lista-ofertas-fav',
  imports: [OfertasUsuarioCardComponent, ProyectosUsuarioCardComponent],
  standalone: true,
  templateUrl: './lista-ofertas-fav.component.html',
  styleUrl: './lista-ofertas-fav.component.css',
})
export class ListaOfertasFavComponent {
  servicioOfertas = inject(OfertaService);
  proyectoService = inject(ProyectosService);
  router = inject(Router);
  arrOfertasFavoritas!: Oferta[];
  arrProyectosFavortitos!: Proyecto[];
  isMenuOpenHome: boolean = false;

  toggleMenuHome() {
    this.isMenuOpenHome = !this.isMenuOpenHome;
  }

  ngOnInit() {
    this.loadOfertasFavoritas();
    this.loadProyectosFavoritos();
  }

  loadOfertasFavoritas() {
    this.servicioOfertas.getAllOfertasFavoritas().subscribe((response: any) => {
      this.arrOfertasFavoritas = response;
    });
  }

  loadProyectosFavoritos() {
    this.proyectoService.getFavoritos().subscribe((response: any) => {
      this.arrProyectosFavortitos = response;
    });
  }
}
