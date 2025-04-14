import { Component, inject } from '@angular/core';
import { OfertaService } from '../../../services/oferta.service';
import { Router } from '@angular/router';
import { Oferta } from '../../../interfaces/oferta';
import { OfertasUsuarioCardComponent } from '../../../components/usuario/ofertas-usuario-card/ofertas-usuario-card.component';

@Component({
  selector: 'app-ofertas',
  imports: [OfertasUsuarioCardComponent],
  standalone:true,
  templateUrl: './ofertas.component.html',
  styleUrl: './ofertas.component.css'
})
export class OfertasComponent {
  servicioOfertas = inject(OfertaService);
  router = inject(Router);
  arrOfertas! : Oferta[];
  isMenuOpenHome: boolean = false;

  toggleMenuHome() {
    this.isMenuOpenHome = !this.isMenuOpenHome;
  }

  ngOnInit() {
  
  
    this.servicioOfertas.getAllOfertas().subscribe((response:any) =>{
      this.arrOfertas = response;
      console.log(response)
    })
}
}
