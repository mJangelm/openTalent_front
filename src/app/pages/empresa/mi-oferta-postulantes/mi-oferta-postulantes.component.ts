import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertaService } from '../../../services/oferta.service';
import { PostulanteI } from '../../../interfaces/postulante';
import { PostulanteCardComponent } from "../postulante-card/postulante-card.component";

@Component({
  selector: 'app-mi-oferta-postulantes',
  imports: [PostulanteCardComponent],
  standalone:true,
  templateUrl: './mi-oferta-postulantes.component.html',
  styleUrl: './mi-oferta-postulantes.component.css'
})
export class MiOfertaPostulantesComponent {
  private activatedRouter = inject(ActivatedRoute);
  servicioOferta = inject(OfertaService);
  idOferta!: number;
  arrPostulantes!: PostulanteI[];
  
  ngOnInit() {
    const idParam = this.activatedRouter.snapshot.paramMap.get('idOferta');
    if (!idParam) {
      console.error('No vino idOferta en la ruta');
      return;
    }

    const id = Number(idParam);
    if (isNaN(id)) {
      console.error('idOferta no es un número válido:', idParam);
      return;
    }
    console.log('ID de oferta a cargar:', id);
    this.idOferta = id;
    
    this.servicioOferta.getPostulantes(id).subscribe((response: any) => {
      this.arrPostulantes = response;
      console.log(response);
    })
    
  }

}
