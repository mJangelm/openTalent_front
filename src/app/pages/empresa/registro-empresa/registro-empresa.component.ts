import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginServiceService } from '../../../services/login-service.service';

@Component({
  selector: 'app-registro-empresa',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.css'],
})
export class RegistroEmpresaComponent {
  modelForm: FormGroup;
  loginService = inject(LoginServiceService);
  router = inject(Router);
  loading = false;
  maxDate = new Date().toISOString().split('T')[0]; // Para el input de fecha
  constructor() {
    this.modelForm = new FormGroup(
      {
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
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
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
        confirmarPassword: new FormControl('', [Validators.required]),
        fechaNacimiento: new FormControl('', {
          validators: [Validators.required, this.fechaNacimientoValidator()],
        }),
        telefono: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\d{6,}$/),
        ]),
        pais: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/),
        ]),
        provincia: new FormControl('', [
          Validators.minLength(3),
          Validators.maxLength(30),
        ]),
        poblacion: new FormControl('', [
          Validators.minLength(2),
          Validators.maxLength(30),
        ]),
        codigoPostal: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
        ]),
        calle: new FormControl('', [
          Validators.minLength(3),
          Validators.maxLength(30),
        ]),
        fotoPerfil: new FormControl('', [
          Validators.required,
          Validators.pattern(/^https?:\/\/.+/),
        ]),
        cif: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
      },
      { validators: [this.passwordsMatchValidator()] }
    );
  }

  // Modificar el validador de contraseñas
  private passwordsMatchValidator() {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const passwordControl = formGroup.get('password');
      const confirmPasswordControl = formGroup.get('confirmarPassword');

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors['passwordMismatch']
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }

  private fechaNacimientoValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const fecha = new Date(control.value);
      const hoy = new Date();
      const edad = hoy.getFullYear() - fecha.getFullYear();

      if (edad < 18) {
        return { menorDeEdad: true };
      }
      return null;
    };
  }

  onSubmit(): void {
    if (this.modelForm.invalid) {
      this.modelForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const { confirmarPassword, ...empresaData } = this.modelForm.value;
    console.log(empresaData);
    this.loginService.registroEmpresa(empresaData).subscribe({
      next: () => {
        this.loading = false;
        this.mostrarExito('Empresa registrada correctamente.', () => {
          this.router.navigate(['/login']);
        });
      },
      error: (err) => {
        this.loading = false;

        let mensaje = 'Error al registrar empresa.';

        if (err.status === 404) {
          mensaje = 'Empresa con el CIF indicado no fue encontrada.';
        } else if (err.status === 409) {
          mensaje =
            'Ya existe un usuario con ese correo o la empresa ya está asignada.';
        }

        this.mostrarError(mensaje);
      },
    });
  }

  mostrarError(mensaje: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: mensaje,
      confirmButtonText: 'Aceptar',
      customClass: {
        confirmButton: 'btn btn-secondary',
      },
      buttonsStyling: false,
    });
  }

  mostrarExito(mensaje: string, callback?: () => void): void {
    Swal.fire({
      icon: 'success',
      title: '¡Registro exitoso!',
      text: mensaje,
      confirmButtonText: 'Ir al login',
      customClass: {
        confirmButton: 'btn btn-secondary',
      },
      buttonsStyling: false,
    }).then((res: any) => {
      if (res.isConfirmed && callback) callback();
    });
  }
}
