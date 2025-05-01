import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProyectosService } from '../../../services/proyectos.service';
import { ProyectoRequestI } from '../../../interfaces/proyecto-request-i';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-anadir-proyecto',
  imports: [ReactiveFormsModule],
  standalone:true,
  templateUrl: './anadir-proyecto.component.html',
  styleUrl: './anadir-proyecto.component.css'
})
export class AnadirProyectoComponent {
volver() {
  this.router.navigate(['/usuario/home']);
}


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



  onSubmit() {

    if (this.modelForm.invalid) {
      this.modelForm.markAllAsTouched();
      return;
    }

    const proyectoNuevo: ProyectoRequestI = {
      idProyecto:   0,                         // valor “dummy” para la creación
      nombre:       this.modelForm.value.nombre!,
      descripcion:  this.modelForm.value.descripcion!,
      fechaInicio:  new Date(this.modelForm.value.fechaInicio!),
      fechaFin:     new Date(this.modelForm.value.fechaFin!),
      foto:         this.modelForm.value.foto!,
      fotoContenido:this.modelForm.value.fotoContenido!,
      plazas:       this.modelForm.value.plazas!,
      activo:       true                       // siempre activo al crear
    };
      console.log('Enviando oferta:', proyectoNuevo)
      
          this.servicioProyectos.anadirNuevoProyecto(proyectoNuevo).subscribe( {
            next: resp => {
              Swal.fire( {
                title: '¡Proyecto creado!',
                text: 'El proyecto se ha creado correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              }).then(() => {
                this.router.navigate(['/usuario/home']);
              });
              },
              error: err => {
                Swal.fire({
                  title: 'Error',
                  text: 'No se ha podido crear el proyecto.',
                  icon: 'error',
                  confirmButtonText: 'Aceptar'
                });
              }
            });
          }
        }
        



