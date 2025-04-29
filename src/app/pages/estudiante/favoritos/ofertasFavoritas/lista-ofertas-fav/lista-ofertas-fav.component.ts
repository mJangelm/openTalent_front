import { Component, inject } from '@angular/core';
import { OfertaService } from '../../../../../services/oferta.service';
import { Router } from '@angular/router';
import { Oferta } from '../../../../../interfaces/oferta';
import { OfertaFavCardComponent } from '../oferta-fav-card/oferta-fav-card.component';
import { OfertasUsuarioCardComponent } from '../../../../../components/usuario/ofertas-usuario-card/ofertas-usuario-card.component';
import { Proyecto } from '../../../../../interfaces/proyecto';
import { ProyectosService } from '../../../../../services/proyectos.service';
import { ProyectosUsuarioCardComponent } from '../../../../../components/usuario/proyectos-usuario-card/proyectos-usuario-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-ofertas-fav',
  imports: [
    OfertasUsuarioCardComponent,
    ProyectosUsuarioCardComponent,
    CommonModule,
  ],
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

  animatingOfertaIds: Set<number> = new Set();
  animatingProyectoIds: Set<number> = new Set();

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

  removeOferta(oferta: Oferta) {
    this.animatingOfertaIds.add(oferta.idOferta);

    setTimeout(() => {
      this.arrOfertasFavoritas = this.arrOfertasFavoritas.filter(
        (o) => o.idOferta !== oferta.idOferta
      );
      this.animatingOfertaIds.delete(oferta.idOferta);
    }, 500);
  }

  removeProyecto(proyecto: Proyecto) {
    this.animatingProyectoIds.add(proyecto.idProyecto);

    setTimeout(() => {
      this.arrProyectosFavortitos = this.arrProyectosFavortitos.filter(
        (p) => p.idProyecto !== proyecto.idProyecto
      );
      this.animatingProyectoIds.delete(proyecto.idProyecto);
    }, 500);
  }
}
