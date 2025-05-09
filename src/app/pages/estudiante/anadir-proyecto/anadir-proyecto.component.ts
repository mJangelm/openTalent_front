import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
  submitted = false;

  constructor() {
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
          Validators.minLength(3),
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
  }

  onSubmit() {
    this.submitted = true;

    if (this.modelForm.invalid) {
      this.modelForm.markAllAsTouched();
      return;
    }

    const proyectoNuevo: ProyectoRequestI = {
      idProyecto: 0, // valor "dummy" para la creación
      nombre: this.modelForm.value.nombre!,
      descripcion: this.modelForm.value.descripcion!,
      fechaInicio: new Date(this.modelForm.value.fechaInicio!),
      fechaFin: new Date(this.modelForm.value.fechaFin!),
      foto: this.modelForm.value.foto!,
      fotoContenido: this.modelForm.value.fotoContenido!,
      plazas: this.modelForm.value.plazas!,
      activo: true, // siempre activo al crear
    };

    this.servicioProyectos.anadirNuevoProyecto(proyectoNuevo).subscribe({
      next: (resp) => {
        Swal.fire({
          title: '¡Proyecto creado!',
          text: 'El proyecto se ha creado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          this.router.navigate(['/usuario/home']);
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
    this.router.navigate(['/usuario/proyectos']);
  }
}
