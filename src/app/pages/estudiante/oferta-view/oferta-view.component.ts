import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertaService } from '../../../services/oferta.service';
import { Oferta } from '../../../interfaces/oferta';
import { OfertaDetalle } from '../../../interfaces/oferta-view-interface';
import { DetallesOfertaService } from '../../../services/detalles-oferta.service';

@Component({
  selector: 'app-oferta-view',
  imports: [],
  standalone:true,
  templateUrl: './oferta-view.component.html',
  styleUrl: './oferta-view.component.css'
})
export class OfertaViewComponent {

  activatedRouter = inject(ActivatedRoute)
  detallesOferta = inject(DetallesOfertaService);
  miOferta! : Oferta;

  ngOnInit() {
    this.activatedRouter.params.subscribe((response: any) =>
    {
      let id: number = response._id as number;
       try {
        this.detallesOferta.getById(id).subscribe((data: Oferta) =>
        {
          this.miOferta = data;
        })
       }catch(error) {
        console.log("Ha habido un error, " +error)
       }
    })
  }

}
