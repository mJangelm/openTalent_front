import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertaService } from '../../../services/oferta.service';

@Component({
  selector: 'app-mi-oferta-postulantes',
  imports: [],
  standalone:true,
  templateUrl: './mi-oferta-postulantes.component.html',
  styleUrl: './mi-oferta-postulantes.component.css'
})
export class MiOfertaPostulantesComponent {
  private activatedRouter = inject(ActivatedRoute);
  servicioOferta = inject(OfertaService);
  private idOferta!: number;
  
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
    
    this.servicioOferta.getPostulantes(id).subscribe( {
      next: (postulante) => {
        console.log('Postulantes:', postulante)
      }
    })
    
  }

}
