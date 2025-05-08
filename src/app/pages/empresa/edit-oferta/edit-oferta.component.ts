import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { Oferta } from '../../../interfaces/oferta';
import { IanadirOferta } from '../../../interfaces/ianadir-oferta';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OfertaService } from '../../../services/oferta.service';

@Component({
  selector: 'app-edit-oferta',
  imports: [ReactiveFormsModule],
  standalone:true,
  templateUrl: './edit-oferta.component.html',
  styleUrl: './edit-oferta.component.css'
})
export class EditOfertaComponent {
  private activatedRouter = inject(ActivatedRoute);
  private router = inject(Router);
  private servicioOfertas = inject(OfertaService);

  modelForm: FormGroup;
  private idOferta!: number;

  constructor() {
    this.modelForm = new FormGroup({
      titulo:      new FormControl('', [Validators.required, Validators.minLength(3)]),
      descripcion: new FormControl('', [Validators.required, Validators.minLength(3)]),
      nombreSector:new FormControl('', [Validators.required, Validators.minLength(3)]),
      tipoOferta:  new FormControl('', [Validators.required]),
      modalidad:   new FormControl('', [Validators.required]),
      numeroPlazas:new FormControl(null, [Validators.required, Validators.min(1)]),
      fotoContenido:new FormControl('', [Validators.required, Validators.minLength(3)]),
      fechaFin:    new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    const idParam : any = this.activatedRouter.snapshot.paramMap.get('idOferta');

    this.idOferta = +idParam;

    this.servicioOfertas.getOfertaParaEditar(this.idOferta).subscribe({
      next: (oferta) => {
        const fechaIso = oferta.fechaFin
          ? new Date(oferta.fechaFin).toISOString().slice(0, 10)
          : '';
        this.modelForm.patchValue({ 
          titulo:        oferta.titulo,
          descripcion:   oferta.descripcion,
          nombreSector:  oferta.nombreSector,
          tipoOferta:    oferta.tipoOferta,
          modalidad:     oferta.modalidad,
          numeroPlazas:  oferta.numeroPlazas,
          fotoContenido: oferta.fotoContenido,
          fechaFin:      fechaIso,
        });
      },
      error: () => this.router.navigate(['/empresa/ofertas'])
    });
  }

  onSubmit(): void {
    if (this.modelForm.invalid) {
      this.modelForm.markAllAsTouched();
      return;
    }

    const ofertaEditada: IanadirOferta = {
      titulo:       this.modelForm.value.titulo,
      descripcion:  this.modelForm.value.descripcion,
      nombreSector: this.modelForm.value.nombreSector,
      tipoOferta:   this.modelForm.value.tipoOferta,
      modalidad:    this.modelForm.value.modalidad,
      numeroPlazas: this.modelForm.value.numeroPlazas,
      fotoContenido:this.modelForm.value.fotoContenido,
      fechaFin:     new Date(this.modelForm.value.fechaFin),
    };
    console.log('Payload a enviar:', {
      titulo:        this.modelForm.value.titulo,
      descripcion:   this.modelForm.value.descripcion,
      nombreSector:  this.modelForm.value.nombreSector,
      fotoContenido: this.modelForm.value.fotoContenido,
      numeroPlazas:  this.modelForm.value.numeroPlazas,
      tipoOferta:    this.modelForm.value.tipoOferta,
      modalidad:     this.modelForm.value.modalidad,
      // ojo: cadena YYYY-MM-DD, igual que Postman
      fechaFin:      this.modelForm.value.fechaFin
    });

    this.servicioOfertas
    .editarOferta(this.idOferta, ofertaEditada)
    .subscribe({
      next: () => {
        Swal.fire({
          title: '¡Oferta editada!',
          text:  'La oferta se ha modificado correctamente.',
          icon:  'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.router.navigate(['/empresa/ofertas']);
        });
      },

      error: (err) => {
 console.error('Error al editar oferta:', err);
        console.log(`Status: ${err.status} ${err.statusText}`);
        console.log('Errores devueltos por API:', err.error);
        // 3) Y tal vez el status HTTP:
        console.log(`Status: ${err.status} ${err.statusText}`);

        Swal.fire({
          title: 'Error',
          text:  'No se pudo modificar la oferta. Revisa la consola para más detalles.',
          icon:  'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  volver(): void {
    this.router.navigate(['/empresa/ofertas']);
  }
}