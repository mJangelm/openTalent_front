import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmpresaService } from '../../../services/empresa.service';
import { IEmpresaDetalle } from '../../../interfaces/iempresa-detalle';

@Component({
  selector: 'app-empresa-view',
  imports: [RouterLink],
  templateUrl: './empresa-view.component.html',
  styleUrl: './empresa-view.component.css',
})
export class EmpresaViewComponent {
  activatedRoute = inject(ActivatedRoute);
  empresaService = inject(EmpresaService);
  miEmpresa: IEmpresaDetalle;

  constructor() {
    this.miEmpresa = {} as IEmpresaDetalle;
  }
  ngOnInit() {
    this.loadEmpresa();
  }
  loadEmpresa() {
    this.activatedRoute.params.subscribe((response: any) => {
      const cif: string = response.cif as string;
      console.log(cif);
      this.empresaService
        .getEmpresaById(cif)
        .subscribe((data: IEmpresaDetalle) => {
          this.miEmpresa = data;
          console.log(this.miEmpresa);
        });
    });
  }
  // Método nuevo para estrellas
  getEstrellasArray(puntuacion: number): number[] {
    return Array.from({ length: puntuacion });
  }
}
