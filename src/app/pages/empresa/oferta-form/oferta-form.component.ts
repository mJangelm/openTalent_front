import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OfertaService } from '../../../services/oferta.service';
import { EmpresaService } from '../../../services/empresa.service';
import { IanadirOferta } from '../../../interfaces/ianadir-oferta';
import { SectorI } from '../../../interfaces/sector-i';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-oferta-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './oferta-form.component.html',
  styleUrls: ['./oferta-form.component.css'],
})
export class OfertaFormComponent {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private servicioOfertas = inject(OfertaService);
  private servicioEmpresa = inject(EmpresaService);

  modelForm!: FormGroup;
  arrSectores: SectorI[] = [];
  isEditMode: boolean = false;
  private idOferta?: number;

  constructor() {
    this.initForm();
    this.checkEditMode();
  }

  private initForm() {
    this.modelForm = new FormGroup({
      titulo: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      nombreSector: new FormControl('', [Validators.required]),
      tipoOferta: new FormControl('', [Validators.required]),
      modalidad: new FormControl('', [Validators.required]),
      numeroPlazas: new FormControl(null, [
        Validators.required,
        Validators.min(1),
      ]),
      fotoContenido: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$'
        ),
      ]),
      fechaFin: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.loadSectores();
    if (this.isEditMode && this.idOferta) {
      this.loadOferta(this.idOferta);
    }
  }
  private checkEditMode() {
    const idParam = this.activatedRoute.snapshot.paramMap.get('idOferta');
    if (idParam) {
      this.isEditMode = true;
      this.idOferta = +idParam;
    }
  }

  private loadSectores() {
    this.servicioEmpresa.getSectores().subscribe({
      next: (sectores) => {
        this.arrSectores = sectores;
      },
      error: (error) => {
        console.error('Error al cargar sectores:', error);
      },
    });
  }

  private loadOferta(id: number) {
    this.servicioOfertas.getOfertaParaEditar(id).subscribe({
      next: (oferta: IanadirOferta) => {
        // Formateamos la fecha a YYYY-MM-DD

        const fechaIso = oferta.fechaFin
          ? new Date(oferta.fechaFin).toISOString().split('T')[0]
          : '';

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
      },
      error: (error) => {
        console.error('Error al cargar oferta:', error);
        this.mostrarError('No se pudo cargar la oferta');
      },
    });
  }

  onSubmit() {
    if (this.modelForm.invalid) {
      this.modelForm.markAllAsTouched();
      return;
    }

    const ofertaData: IanadirOferta = {
      ...this.modelForm.value,
      fechaFin: new Date(this.modelForm.value.fechaFin),
    };

    // Separamos la lógica para cada caso
    if (this.isEditMode) {
      this.servicioOfertas.editarOferta(this.idOferta!, ofertaData).subscribe({
        next: () => this.handleSuccess('actualizada'),
        error: (error) => this.handleError('actualizar', error),
      });
    } else {
      this.servicioOfertas.anadirOferta(ofertaData).subscribe({
        next: () => this.handleSuccess('creada'),
        error: (error) => this.handleError('crear', error),
      });
    }
  }

  // Métodos auxiliares para manejar respuestas
  private handleSuccess(action: string) {
    Swal.fire({
      title: `¡Oferta ${action}!`,
      text: `La oferta se ha ${action} correctamente.`,
      icon: 'success',
      confirmButtonText: 'Aceptar',
    }).then(() => this.volver());
  }

  private handleError(action: string, error: any) {
    console.error('Error:', error);
    this.mostrarError(`No se pudo ${action} la oferta.`);
  }

  private mostrarError(mensaje: string) {
    Swal.fire({
      title: 'Error',
      text: mensaje,
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
  }

  volver() {
    this.router.navigate(['/empresa/ofertas']);
  }

  // Métodos para validaciones
  isInvalid(field: string): boolean {
    return (
      (this.modelForm.get(field)?.invalid &&
        this.modelForm.get(field)?.touched) ||
      false
    );
  }

  isValid(field: string): boolean {
    return (
      (this.modelForm.get(field)?.valid &&
        this.modelForm.get(field)?.touched) ||
      false
    );
  }

  getErrorMessage(field: string): string {
    const control = this.modelForm.get(field);

    if (!control?.errors || !control?.touched) return '';

    if (control.errors['required']) {
      return 'Este campo es obligatorio';
    }

    if (control.errors['minlength']) {
      const minLength = control.errors['minlength'].requiredLength;
      return `Debe tener al menos ${minLength} caracteres`;
    }

    if (control.errors['min']) {
      return 'El número debe ser mayor que 0';
    }

    if (control.errors['pattern']) {
      if (field === 'fotoContenido') {
        return 'Debe ser una URL válida (ejemplo: https://ejemplo.com/imagen.jpg)';
      }
      return 'Formato no válido';
    }

    return '';
  }
}
