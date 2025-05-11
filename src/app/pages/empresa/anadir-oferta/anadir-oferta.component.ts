import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { OfertaService } from '../../../services/oferta.service';
import { IanadirOferta } from '../../../interfaces/ianadir-oferta';
import Swal from 'sweetalert2';
import { EmpresaService } from '../../../services/empresa.service';
import { SectorI } from '../../../interfaces/sector-i';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-anadir-oferta',
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './anadir-oferta.component.html',
  styleUrl: './anadir-oferta.component.css',
})
export class AnadirOfertaComponent {
  modelForm!: FormGroup;
  router = inject(Router);
  servicioOfertas = inject(OfertaService);
  servicioEmpresa = inject(EmpresaService);
  public arrSectores: SectorI[] = [];
  constructor() {
    // Se crea el FormGroup con los controles y validadores, incluyendo el validador de contraseñas
    this.modelForm = new FormGroup({
      titulo: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      descripcion: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      nombreSector: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      fotoContenido: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      numeroPlazas: new FormControl(null, [
        Validators.required,
        Validators.min(1),
      ]),
      tipoOferta: new FormControl(null, [Validators.required]),
      modalidad: new FormControl(null, [Validators.required]),
      fechaFin: new FormControl(null, [
        Validators.required /*, fechaPosteriorAHoyValidator */,
      ]),
    });
  }

  volver() {
    this.router.navigate(['/empresa/home']);
  }

  registro() {
    const ofertaNueva: IanadirOferta = {
      ...this.modelForm.value,
      fechaFin: new Date(this.modelForm.value.fechaFin),
    };
    console.log('Enviando oferta:', ofertaNueva);

    this.servicioOfertas.anadirOferta(ofertaNueva).subscribe({
      next: (resp) => {
        Swal.fire({
          title: '¡Oferta creada!',
          text: 'La oferta se ha creado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          this.router.navigate(['/empresa/home']);
        });
      },
      error: (err) => {
        Swal.fire({
          title: 'Error',
          text: 'No se ha podido crear la oferta.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      },
    });
  }
  ngOnInit() {
    this.servicioEmpresa.getSectores().subscribe({
      next: (sector) => {
        this.arrSectores = sector;
      },
    });
  }
}
