import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { Oferta } from '../../../interfaces/oferta';
import { IanadirOferta } from '../../../interfaces/ianadir-oferta';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OfertaService } from '../../../services/oferta.service';
import { SectorI } from '../../../interfaces/sector-i';
import { EmpresaService } from '../../../services/empresa.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-oferta',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-oferta.component.html',
  styleUrl: './edit-oferta.component.css',
})
export class EditOfertaComponent {
  private activatedRouter = inject(ActivatedRoute);
  private router = inject(Router);
  private servicioOfertas = inject(OfertaService);
  private servicioEmpresa = inject(EmpresaService);

  modelForm: FormGroup;
  private idOferta!: number;
  public arrSectores: SectorI[] = [];

  constructor() {
    this.modelForm = new FormGroup({
      titulo: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      nombreSector: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      tipoOferta: new FormControl('', [Validators.required]),
      modalidad: new FormControl('', [Validators.required]),
      numeroPlazas: new FormControl(null, [
        Validators.required,
        Validators.min(1),
      ]),
      fotoContenido: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      fechaFin: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    // Primero cargamos los sectores
    this.servicioEmpresa.getSectores().subscribe({
      next: (sectores) => {
        this.arrSectores = sectores;

        // Una vez tengamos los sectores, cargamos la oferta
        const idParam: any =
          this.activatedRouter.snapshot.paramMap.get('idOferta');
        this.idOferta = +idParam;

        this.servicioOfertas.getOfertaParaEditar(this.idOferta).subscribe({
          next: (oferta: IanadirOferta) => {
            // Formateamos la fecha a YYYY-MM-DD
            const fechaIso = oferta.fechaFin
              ? new Date(oferta.fechaFin).toISOString().split('T')[0]
              : '';
            // Actualizamos todos los campos del formulario
            this.modelForm.patchValue({
              titulo: oferta.titulo,
              descripcion: oferta.descripcion,
              nombreSector: oferta.nombreSector,
              tipoOferta: oferta.tipoOferta,
              modalidad: oferta.modalidad,
              numeroPlazas: oferta.numeroPlazas,
              fotoContenido: oferta.fotoContenido,
              fechaFin: fechaIso,
            });

            // Marcamos el formulario como pristine para evitar validaciones innecesarias
            this.modelForm.markAsPristine();
          },
          error: () => {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo cargar la oferta',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            }).then(() => {
              this.router.navigate(['/empresa/ofertas']);
            });
          },
        });
      },
      error: (error) => {
        console.error('Error al cargar sectores:', error);
      },
    });
  }

  onSubmit(): void {
    if (this.modelForm.invalid) {
      this.modelForm.markAllAsTouched();
      return;
    }

    const ofertaEditada: IanadirOferta = {
      titulo: this.modelForm.value.titulo,
      descripcion: this.modelForm.value.descripcion,
      nombreSector: this.modelForm.value.nombreSector,
      tipoOferta: this.modelForm.value.tipoOferta,
      modalidad: this.modelForm.value.modalidad,
      numeroPlazas: this.modelForm.value.numeroPlazas,
      fotoContenido: this.modelForm.value.fotoContenido,
      fechaFin: new Date(this.modelForm.value.fechaFin),
    };

    this.servicioOfertas.editarOferta(this.idOferta, ofertaEditada).subscribe({
      next: () => {
        Swal.fire({
          title: '¡Oferta editada!',
          text: 'La oferta se ha modificado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          this.router.navigate(['/empresa/ofertas']);
        });
      },

      error: (err) => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo modificar la oferta. Revisa la consola para más detalles.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      },
    });
  }

  volver(): void {
    this.router.navigate(['/empresa/ofertas']);
  }
}
