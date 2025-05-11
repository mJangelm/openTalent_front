import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfertaService } from '../../../services/oferta.service';
import { Router } from '@angular/router';
import { Oferta } from '../../../interfaces/oferta';
import { OfertasUsuarioCardComponent } from '../../../components/usuario/ofertas-usuario-card/ofertas-usuario-card.component';
import { Proyecto } from '../../../interfaces/proyecto';
import { ProyectosService } from '../../../services/proyectos.service';
import { ProyectosUsuarioCardComponent } from '../../../components/usuario/proyectos-usuario-card/proyectos-usuario-card.component';

@Component({
  selector: 'app-lista-ofertas-fav',
  standalone: true,
  imports: [
    CommonModule,
    OfertasUsuarioCardComponent,
    ProyectosUsuarioCardComponent,
  ],
  templateUrl: './lista-ofertas-fav.component.html',
  styleUrls: ['./lista-ofertas-fav.component.css'],
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

  constructor() {
    this.arrOfertasFavoritas = [];
    this.arrProyectosFavortitos = [];
    this.loadOfertasFavoritas();
    this.loadProyectosFavoritos();
  }
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
