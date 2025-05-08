import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Oferta } from '../../../interfaces/iempresa-detalle';
import Swal from 'sweetalert2';
import { OfertaService } from '../../../services/oferta.service';

@Component({
  selector: 'app-mis-ofertas-card',
  imports: [RouterLink],
  standalone:true,
  templateUrl: './mis-ofertas-card.component.html',
  styleUrl: './mis-ofertas-card.component.css'
})
export class MisOfertasCardComponent {

  router = inject(Router)

servicioOferta = inject(OfertaService)

editarOferta(id: number): void {
  // Usando un array de segmentos de ruta
  this.router.navigate(['/ofertas/edit', id]);
}
eliminarOferta(id: number): void {
  console.log('onCerrarOferta() id →', id);
  this.servicioOferta.cerrarOferta(id)
    .subscribe({
      next: oferta => {
        console.log('CerrarOferta subscription next →', oferta);
        // aquí puedes, p.ej., actualizar la lista o mostrar un mensaje
      },
      error: err => {
        console.error('CerrarOferta subscription error →', err);
      }
    });
}

verPostulantes(arg0: number) {
throw new Error('Method not implemented.');
}
toggleFavorita() {
throw new Error('Method not implemented.');
}

  @Input() OfertaUnica!: Oferta;

}
