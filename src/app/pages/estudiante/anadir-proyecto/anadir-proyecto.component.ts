import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProyectosService } from '../../../services/proyectos.service';
import { ProyectoRequestI } from '../../../interfaces/proyecto-request-i';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-anadir-proyecto',
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './anadir-proyecto.component.html',
  styleUrl: './anadir-proyecto.component.css',
})
export class AnadirProyectoComponent {
  modelForm!: FormGroup;
  router = inject(Router);
  servicioProyectos = inject(ProyectosService);
  activatedRoute = inject(ActivatedRoute);
  submitted = false;

  // Variables para modo edición
  modoEdicion = false;
  idProyecto = 0;
  activoOriginal = true;
  tituloFormulario = 'Crear nuevo proyecto';

  constructor() {
    // Verificar si estamos en modo edición comprobando la URL
    const url = this.router.url;
    this.modoEdicion = url.includes('/misproyectos/edit/');

    // Se crea el FormGroup con los controles y validadores
    this.modelForm = new FormGroup(
      {
        nombre: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
        descripcion: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(1000),
        ]),
        fechaInicio: new FormControl('', [
          Validators.required,
          this.fechaPosteriorAHoyValidator(),
        ]),
        fechaFin: new FormControl('', [
          Validators.required,
          this.fechaPosteriorAHoyValidator(),
        ]),
        foto: new FormControl('', [Validators.required, this.urlValidator()]),
        fotoContenido: new FormControl('', [
          Validators.required,
          this.urlValidator(),
        ]),
        plazas: new FormControl('', [
          Validators.required,
          Validators.min(1),
          Validators.max(100),
          Validators.pattern('^[0-9]*$'),
        ]),
      },
      { validators: this.fechaFinPosteriorAInicioValidator }
    );

    if (this.modoEdicion) {
      this.tituloFormulario = 'Editar proyecto';
      // Obtener el ID del proyecto de la URL
      const idParam = this.activatedRoute.snapshot.paramMap.get('_id');
      if (!idParam) {
        this.router.navigate(['/usuario/misproyectos']);
        return;
      }

      this.idProyecto = +idParam;

      // En modo edición, no validamos que las fechas sean posteriores a hoy
      this.modelForm.get('fechaInicio')?.clearValidators();
      this.modelForm.get('fechaInicio')?.setValidators([Validators.required]);
      this.modelForm.get('fechaInicio')?.updateValueAndValidity();

      this.modelForm.get('fechaFin')?.clearValidators();
      this.modelForm.get('fechaFin')?.setValidators([Validators.required]);
      this.modelForm.get('fechaFin')?.updateValueAndValidity();

      // Cargar los datos del proyecto
      this.cargarDatosProyecto();
    }
  }

  cargarDatosProyecto(): void {
    this.servicioProyectos.getProyectoAEditarById(this.idProyecto).subscribe({
      next: (proj) => {
        const inicioStr = new Date(proj.fechaInicio).toISOString().slice(0, 10);
        const finStr = new Date(proj.fechaFin).toISOString().slice(0, 10);

        this.modelForm.patchValue({
          nombre: proj.nombre,
          descripcion: proj.descripcion,
          fechaInicio: inicioStr,
          fechaFin: finStr,
          foto: proj.foto,
          fotoContenido: proj.fotoContenido,
          plazas: proj.plazas,
        });

        this.activoOriginal = proj.activo ?? true;
      },
      error: (err) => {
        console.error('Error cargando proyecto:', err);
        this.router.navigate(['/usuario/misproyectos']);
      },
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.modelForm.invalid) {
      this.modelForm.markAllAsTouched();
      return;
    }

    const proyectoData: ProyectoRequestI = {
      idProyecto: this.modoEdicion ? this.idProyecto : 0,
      nombre: this.modelForm.value.nombre!,
      descripcion: this.modelForm.value.descripcion!,
      fechaInicio: new Date(this.modelForm.value.fechaInicio!),
      fechaFin: new Date(this.modelForm.value.fechaFin!),
      foto: this.modelForm.value.foto!,
      fotoContenido: this.modelForm.value.fotoContenido!,
      plazas: this.modelForm.value.plazas!,
      activo: this.modoEdicion ? this.activoOriginal : true,
    };

    if (this.modoEdicion) {
      this.editarProyecto(proyectoData);
    } else {
      this.crearProyecto(proyectoData);
    }
  }

  crearProyecto(proyectoData: ProyectoRequestI): void {
    this.servicioProyectos.anadirNuevoProyecto(proyectoData).subscribe({
      next: (resp) => {
        Swal.fire({
          title: '¡Proyecto creado!',
          text: 'El proyecto se ha creado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          this.router.navigate(['/usuario/misproyectos']);
        });
      },
      error: (err) => {
        Swal.fire({
          title: 'Error',
          text: 'No se ha podido crear el proyecto.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      },
    });
  }

  editarProyecto(proyectoData: ProyectoRequestI): void {
    this.servicioProyectos.editarProyecto(proyectoData).subscribe({
      next: () => {
        Swal.fire({
          title: '¡Proyecto editado!',
          text: 'El proyecto se ha modificado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          this.router.navigate(['/usuario/misproyectos']);
        });
      },
      error: () => {
        Swal.fire({
          title: 'Error',
          text: 'No se ha podido modificar el proyecto.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      },
    });
  }

  // Validador personalizado para fechas posteriores a hoy
  fechaPosteriorAHoyValidator(): (
    control: AbstractControl
  ) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const fechaSeleccionada = new Date(control.value);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);

      return fechaSeleccionada < hoy ? { fechaInvalida: true } : null;
    };
  }

  // Validador personalizado para que la fecha fin sea posterior a la fecha inicio
  fechaFinPosteriorAInicioValidator(
    formGroup: AbstractControl
  ): ValidationErrors | null {
    const fechaInicio = formGroup.get('fechaInicio')?.value;
    const fechaFin = formGroup.get('fechaFin')?.value;

    if (!fechaInicio || !fechaFin) return null;

    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    return fin <= inicio ? { fechaFinInvalida: true } : null;
  }

  // Validador para URL (solo verifica http:// o https://)
  urlValidator(): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      // Solo verifica si comienza con http:// o https://
      const urlPattern = /^(https?:\/\/)/i;
      return urlPattern.test(control.value) ? null : { urlInvalida: true };
    };
  }

  // Métodos de ayuda para el manejo de errores en la plantilla
  isInvalid(controlName: string): boolean {
    const control = this.modelForm.get(controlName);
    return !!control && control.invalid && control.touched;
  }

  isValid(controlName: string): boolean {
    const control = this.modelForm.get(controlName);
    return !!control && control.valid && control.touched;
  }

  getErrorMessage(controlName: string): string {
    const control = this.modelForm.get(controlName);
    if (!control) return '';

    if (control.errors?.['required']) return 'Este campo es obligatorio';
    if (control.errors?.['minlength'])
      return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
    if (control.errors?.['maxlength'])
      return `Máximo ${control.errors['maxlength'].requiredLength} caracteres`;
    if (control.errors?.['min'])
      return `El valor mínimo es ${control.errors['min'].min}`;
    if (control.errors?.['max'])
      return `El valor máximo es ${control.errors['max'].max}`;
    if (control.errors?.['pattern']) return 'Solo se permiten números';
    if (control.errors?.['fechaInvalida'])
      return 'La fecha debe ser posterior a hoy';
    if (control.errors?.['urlInvalida'])
      return 'Debe comenzar con http:// o https://';

    return '';
  }

  hasFechaFinError(): boolean {
    return (
      this.modelForm.errors?.['fechaFinInvalida'] &&
      this.modelForm.get('fechaFin')?.touched
    );
  }

  volver(): void {
    if (this.modoEdicion) {
      this.router.navigate(['/usuario/misproyectos']);
    } else {
      this.router.navigate(['/usuario/proyectos']);
    }
  }
}
