import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmpresaService } from '../../../services/empresa.service';
import { IEmpresaDetalle } from '../../../interfaces/iempresa-detalle';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empresa-view',
  imports: [RouterLink, CommonModule],
  templateUrl: './empresa-view.component.html',
  styleUrl: './empresa-view.component.css',
})
export class EmpresaViewComponent {
  activatedRoute = inject(ActivatedRoute);
  empresaService = inject(EmpresaService);
  router = inject(Router);
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
      this.empresaService
        .getEmpresaById(cif)
        .subscribe((data: IEmpresaDetalle) => {
          this.miEmpresa = data;
        });
    });
  }
  // Método para obtener array de estrellas
  getEstrellasArray(puntuacion: number): number[] {
    return Array.from({ length: puntuacion });
  }

  // Método para navegar al componente de añadir reseña
  addReview(): void {
    // Navegar a la ruta de añadir reseña pasando el CIF de la empresa como parámetro de consulta
    this.router.navigate(['/usuario/review'], {
      queryParams: {
        empresaCif: this.miEmpresa.cif,
        empresaNombre: this.miEmpresa.nombreEmpresa,
      },
    });
  }
}
