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
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.css'],
})
export class RegistroEmpresaComponent {
  registroForm: FormGroup;
  loginService = inject(LoginServiceService);
  router = inject(Router);
  loading = false;

  constructor() {
    this.registroForm = new FormGroup(
      {
        nombre: new FormControl('', Validators.required),
        apellido: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmarPassword: new FormControl('', Validators.required),
        fechaNacimiento: new FormControl('', Validators.required),
        telefono: new FormControl('', Validators.required),
        username: new FormControl('', Validators.required),
        pais: new FormControl('', Validators.required),
        provincia: new FormControl('', Validators.required),
        poblacion: new FormControl('', Validators.required),
        calle: new FormControl('', Validators.required),
        codigoPostal: new FormControl('', Validators.required),
        fotoPerfil: new FormControl('', Validators.required),
        cif: new FormControl('', Validators.required),
      },
      { validators: [this.passwordsMatchValidator] }
    );
  }

  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmar = group.get('confirmarPassword')?.value;
    return password === confirmar ? null : { passwordsMismatch: true };
  }

  onSubmit(): void {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const { confirmarPassword, ...empresaData } = this.registroForm.value;

    this.loginService.loginEmpresa(empresaData).subscribe({
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
