import { Component, inject } from '@angular/core';
import { OfertaService } from '../../../services/oferta.service';
import { Router } from '@angular/router';
import { Oferta } from '../../../interfaces/oferta';
import { OfertasUsuarioCardComponent } from '../../../components/usuario/ofertas-usuario-card/ofertas-usuario-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ofertas',
  imports: [OfertasUsuarioCardComponent, CommonModule],
  templateUrl: './ofertas.component.html',
  styleUrl: './ofertas.component.css',
})
export class OfertasComponent {
  servicioOfertas = inject(OfertaService);
  router = inject(Router);
  arrOfertas: Oferta[] = [];
  isLoading = true;

  ngOnInit() {
    this.loadOfertas();
  }
  private loadOfertas() {
    this.isLoading = true;
    this.servicioOfertas.getAllOfertas().subscribe({
      next: (response: Oferta[]) => {
        this.arrOfertas = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar ofertas:', error);
        this.isLoading = false;
      },
    });
  }
}
