import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertaService } from '../../../services/oferta.service';
import { Oferta } from '../../../interfaces/oferta';
import { OfertaDetalle } from '../../../interfaces/oferta-detalle';

@Component({
  selector: 'app-oferta-view',
  imports: [],
  standalone: true,
  templateUrl: './oferta-view.component.html',
  styleUrl: './oferta-view.component.css',
})
export class OfertaViewComponent {
  activatedRouter = inject(ActivatedRoute);
  detallesOferta = inject(OfertaService);
  miOferta: OfertaDetalle;
  constructor() {
    this.miOferta = {} as OfertaDetalle;
  }

  ngOnInit() {
    this.loadOferta();
  }

  loadOferta() {
    this.activatedRouter.params.subscribe((response: any) => {
      const id: number = response._id as number;
      this.detallesOferta.getById(id).subscribe((data: OfertaDetalle) => {
        this.miOferta = data;
      });
    });
  }
}
