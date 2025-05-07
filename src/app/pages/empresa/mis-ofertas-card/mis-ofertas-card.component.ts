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
  Swal.fire({
    title: 'Vas a eliminar esta oferta. ¿Está seguro?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'No'
  }).then(result => {
    if (result.isConfirmed) {
      Swal.fire(
        'Eliminada',
        'La oferta ha sido eliminada correctamente.',
        'success'
      );
    }
    // si pulsa "No", SweetAlert cierra automáticamente y no hacemos nada más
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
