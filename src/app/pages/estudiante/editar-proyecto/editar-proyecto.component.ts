import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectoRequestI } from '../../../interfaces/proyecto-request-i';
import { ProyectosService } from '../../../services/proyectos.service';
import Swal from 'sweetalert2';
import { ProyectosView } from '../../../interfaces/proyectos-view';

@Component({
  selector: 'app-editar-proyecto',
  imports: [ReactiveFormsModule],
  standalone:true,
  templateUrl: './editar-proyecto.component.html',
  styleUrl: './editar-proyecto.component.css'
})
export class EditarProyectoComponent {
volver() {
throw new Error('Method not implemented.');
}
  activatedRouter = inject(ActivatedRoute);
  private idProyecto!: number;
  private activoOriginal!: boolean;
  private proyectoaEditar!: ProyectoRequestI

  
  modelForm!: FormGroup;
  router = inject(Router);
  servicioProyectos = inject(ProyectosService);

constructor() {
  // Se crea el FormGroup con los controles y validadores, incluyendo el validador de contraseñas
  this.modelForm = new FormGroup({
    nombre: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    descripcion: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    fechaFin: new FormControl(null, [ Validators.required /*, fechaPosteriorAHoyValidator */ ]),
    fechaInicio: new FormControl(null, [ Validators.required /*, fechaPosteriorAHoyValidator */ ]),
    foto: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    fotoContenido: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    plazas: new FormControl(null, [Validators.required]),
  });
}
ngOnInit(): void {
  const idParam = this.activatedRouter.snapshot.paramMap.get('_id');
  console.log('ID de ruta =', idParam);
  if (!idParam) {
    this.router.navigate(['/usuario/misproyectos']);
    return;
  }
  this.idProyecto = +idParam;

  this.servicioProyectos
    .getProyectoAEditarById(this.idProyecto)
    .subscribe(
      proj => {
        console.log('Proyecto recibido del servicio →', proj);

        // antes de parchear:
        console.log('Antes patchValue, form.value =', this.modelForm.value);

        const dI = new Date(proj.fechaInicio);
        const dF = new Date(proj.fechaFin);
        const inicioStr = isNaN(dI.getTime())
          ? ''
          : dI.toISOString().slice(0,10);
        const finStr    = isNaN(dF.getTime())
          ? ''
          : dF.toISOString().slice(0,10);

        this.modelForm.patchValue({
          nombre:        proj.nombre,
          descripcion:   proj.descripcion,
          fechaInicio:   inicioStr,
          fechaFin:      finStr,
          foto:          proj.foto,
          fotoContenido: proj.fotoContenido,
          plazas:        proj.plazas
        });

        // después de parchear:
        console.log('Después patchValue, form.value =', this.modelForm.value);
      },
      err => {
        console.error('¡Falló la carga del proyecto!', err);
      }
    );
}



  onSubmit() {

    if (this.modelForm.invalid) {
      this.modelForm.markAllAsTouched();
      return;
    }

    const proyectoNuevo: ProyectoRequestI = {
      idProyecto:   this.idProyecto,                         // valor “dummy” para la creación
      nombre:       this.modelForm.value.nombre!,
      descripcion:  this.modelForm.value.descripcion!,
      fechaInicio:  new Date(this.modelForm.value.fechaInicio!),
      fechaFin:     new Date(this.modelForm.value.fechaFin!),
      foto:         this.modelForm.value.foto!,
      fotoContenido:this.modelForm.value.fotoContenido!,
      plazas:       this.modelForm.value.plazas!,
      activo:       this.activoOriginal                      // siempre activo al crear
    };
console.log('Enviando oferta:', proyectoNuevo)

    this.servicioProyectos.editarProyecto(proyectoNuevo).subscribe( {
      next: resp => {
        Swal.fire( {
          title: '¡Proyecto editado!',
          text: 'El proyecto se ha modificado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.router.navigate(['/usuario/home']);
        });
        },
        error: err => {
          Swal.fire({
            title: 'Error',
            text: 'No se ha podido modificar el proyecto.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    }


    
    }
          
  







