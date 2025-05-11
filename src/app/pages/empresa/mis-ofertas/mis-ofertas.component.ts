import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { OfertaService } from '../../../services/oferta.service';
import { Oferta } from '../../../interfaces/oferta';
import { MisOfertasCardComponent } from '../mis-ofertas-card/mis-ofertas-card.component';

@Component({
  selector: 'app-mis-ofertas',
  imports: [CommonModule, MisOfertasCardComponent],
  templateUrl: './mis-ofertas.component.html',
  styleUrls: ['./mis-ofertas.component.css'],
})
export class MisOfertasComponent {
  private servicioOfertas = inject(OfertaService);
  private router = inject(Router);

  arrOfertas: Oferta[] = [];
  isLoading = true; // arranca en true
  editable = true;

  ngOnInit() {
    this.loadOfertas();
  }

  private loadOfertas() {
    this.isLoading = true;
    this.servicioOfertas.getMiofertas().subscribe({
      next: (response: Oferta[]) => {
        this.arrOfertas = response;
        this.isLoading = false; // ocultar spinner
      },
      error: (err) => {
        console.error('Error al cargar mis ofertas:', err);
        this.arrOfertas = [];
        this.isLoading = false; // ocultar spinner aun en error
      },
    });
  }

  onOfferDeleted(id: number) {
    const elementToRemove = document.querySelector(`[data-id="${id}"]`);

    if (elementToRemove) {
      // Añadir clase para iniciar la animación
      elementToRemove.classList.add('fade-out');

      // Esperar a que termine la animación antes de eliminar
      setTimeout(() => {
        this.arrOfertas = this.arrOfertas.filter((o) => o.idOferta !== id);
      }, 400); // Mismo tiempo que la transición CSS
    }
  }

  trackByOferta(_idx: number, oferta: Oferta) {
    return oferta.idOferta;
  }
}
