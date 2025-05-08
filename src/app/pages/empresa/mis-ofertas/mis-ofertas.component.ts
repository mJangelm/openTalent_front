import { Component, inject } from '@angular/core';
import { OfertaService } from '../../../services/oferta.service';
import { Router } from '@angular/router';
import { Oferta } from '../../../interfaces/oferta';
import { OfertasUsuarioCardComponent } from "../../../components/usuario/ofertas-usuario-card/ofertas-usuario-card.component";
import { MisOfertasCardComponent } from '../mis-ofertas-card/mis-ofertas-card.component';

@Component({
  selector: 'app-mis-ofertas',
  imports: [MisOfertasCardComponent],
  standalone:true,
  templateUrl: './mis-ofertas.component.html',
  styleUrl: './mis-ofertas.component.css'
})
export class MisOfertasComponent {
  servicioOfertas = inject(OfertaService);
  router = inject(Router);
  arrOfertas!: Oferta[];
  isMenuOpenHome: boolean = false;
  editable: boolean = true;

  ngOnInit() {
    this.servicioOfertas.getMiofertas().subscribe((response: any) => {
      this.arrOfertas = response;
      console.log(response);
    });
  }

  
  onOfferDeleted(id: number) {
    // filtramos el array para eliminar la oferta cerrada
    this.arrOfertas = this.arrOfertas.filter(o => o.idOferta !== id);
  }

  trackByOferta(index: number, oferta: any) {
    return oferta.idOferta;
  }

}
