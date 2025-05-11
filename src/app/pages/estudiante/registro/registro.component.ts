// registro.component.ts
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
import Swal from 'sweetalert2';

import { RegistroEstudianteService } from '../../../services/registro-estudiante.service';
import { RegistroEstudianteDto } from '../../../interfaces/registro-estudiante-dto';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  private router = inject(Router);
  private registroEstudiante = inject(RegistroEstudianteService);

  loading = false;
  maxDate = new Date().toISOString().split('T')[0]; // Para el input de fecha
  modelForm = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/),
    ]),
    apellidos: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/^[a-zA-Z0-9_]+$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    fechaNacimiento: new FormControl<string>('', {
      validators: [Validators.required, this.fechaNacimientoValidator()],
    }),
    telefono: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(/^\d{6,}$/), // Solo números, mínimo 6 dígitos
    ]),
    pais: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/),
    ]),
    calle: new FormControl<string>('', [
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    poblacion: new FormControl<string>('', [
      Validators.minLength(2),
      Validators.maxLength(30),
    ]),
    codigoPostal: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    provincia: new FormControl<string>('', [
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    estudios: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(200),
    ]),
    experiencia: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(500),
    ]),
    cv: new FormControl(''),
    fotoPerfil: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(/^https?:\/\/.+/), // Valida que empiece con http:// o https://
    ]),
  });

  registro(): void {
    if (this.modelForm.invalid) {
      this.modelForm.markAllAsTouched();
      this.mostrarErrorFormulario();
      return;
    }

    this.loading = true;
    const payload = this.modelForm.value as unknown as RegistroEstudianteDto;

    this.registroEstudiante.registro(payload).subscribe({
      next: () => {
        this.loading = false;
        this.mostrarExito(
          'Te has registrado correctamente. Ya puedes iniciar sesión.',
          () => this.router.navigate(['/login'])
        );
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 409) {
          const mensaje =
            err.error.mensaje || 'Este usuario o email ya existe.';
          this.mostrarError(mensaje);
        } else {
          this.mostrarError(
            'Error en el registro. Por favor, inténtalo de nuevo.'
          );
        }
      },
    });
  }
  private fechaNacimientoValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const fecha = new Date(control.value);
      const hoy = new Date();
      const edad = hoy.getFullYear() - fecha.getFullYear();

      if (edad < 16) {
        return { menorDeEdad: true };
      }
      return null;
    };
  }

  private mostrarErrorFormulario(): void {
    Swal.fire({
      icon: 'error',
      title: 'Campos inválidos',
      text: 'Por favor, revisa los campos marcados en rojo.',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#535AA6',
    });
  }

  private mostrarError(msg: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: msg,
      confirmButtonText: 'Aceptar',
      customClass: { confirmButton: 'btn btn-secondary' },
      buttonsStyling: false,
    });
  }

  private mostrarExito(msg: string, cb?: () => void): void {
    Swal.fire({
      icon: 'success',
      title: '¡Registro exitoso!',
      text: msg,
      confirmButtonText: 'Ir al login',
      customClass: { confirmButton: 'btn btn-secondary' },
      buttonsStyling: false,
    }).then((res) => {
      if (res.isConfirmed && cb) cb();
    });
  }
}
