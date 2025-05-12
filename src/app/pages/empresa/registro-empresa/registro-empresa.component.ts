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
import { EditUserService } from '../../../services/edit-user.service';

@Component({
  selector: 'app-registro-empresa',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.css'],
})
export class RegistroEmpresaComponent {
  modelForm!: FormGroup;
  private loginService = inject(LoginServiceService);
  private editUserService = inject(EditUserService);
  private router = inject(Router);

  loading = false;
  maxDate = new Date().toISOString().split('T')[0];
  isEditMode = false;

  constructor() {
    this.initForm();
    this.checkEditMode();
  }

  private initForm() {
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
          ...(!this.isEditMode
            ? [Validators.required, Validators.minLength(6)]
            : []),
        ]),
        confirmarPassword: new FormControl('', [
          ...(!this.isEditMode ? [Validators.required] : []),
        ]),
        fechaNacimiento: new FormControl('', {
          validators: [Validators.required, this.fechaNacimientoValidator()],
        }),
        telefono: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\d{9}$/),
        ]),
        cif: new FormControl({ value: '', disabled: this.isEditMode }, [
          ...(!this.isEditMode
            ? [Validators.required, Validators.minLength(5)]
            : []),
        ]),
        pais: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        provincia: new FormControl('', [Validators.minLength(3)]),
        poblacion: new FormControl('', [Validators.minLength(2)]),
        codigoPostal: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\d{5}$/),
        ]),
        calle: new FormControl('', [Validators.minLength(3)]),
        fotoPerfil: new FormControl('', [
          Validators.required,
          Validators.pattern(/^https?:\/\/.+/),
        ]),
      },
      { validators: this.passwordsMatchValidator() }
    );
  }

  private checkEditMode() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.isEditMode = true;
      const user = JSON.parse(userData);
      const fechaIso = user.fechaNacimiento
        ? new Date(user.fechaNacimiento).toISOString().split('T')[0]
        : '';

      this.modelForm.patchValue({
        nombre: user.nombre,
        apellidos: user.apellidos,
        email: user.email,
        username: user.username,
        fotoPerfil: user.fotoPerfil,
        telefono: user.telefono,
        fechaNacimiento: fechaIso,
        calle: user.direccion?.calle,
        pais: user.direccion?.pais,
        provincia: user.direccion?.provincia,
        poblacion: user.direccion?.poblacion,
        codigoPostal: user.direccion?.codigoPostal,
      });
    }
  }

  onSubmit() {
    if (!this.isFormValid()) {
      this.modelForm.markAllAsTouched();
      this.mostrarErrorFormulario();
      return;
    }

    this.loading = true;
    const formData = { ...this.modelForm.value };

    if (this.isEditMode && !formData.password?.trim()) {
      delete formData.password;
      delete formData.confirmarPassword;
    }

    const empresaData = {
      ...formData,
      fechaNacimiento: new Date(formData.fechaNacimiento),
    };

    const action$ = this.isEditMode
      ? this.editUserService.editarPerfilEmpresaUser(empresaData)
      : this.loginService.registroEmpresa(empresaData);

    action$.subscribe({
      next: () => {
        this.loading = false;

        if (this.isEditMode) {
          const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
          const updatedUser = {
            ...currentUser,
            ...empresaData,
            rol: currentUser.rol,
            activo: currentUser.activo,
            fechaAlta: currentUser.fechaAlta,
            direccion: {
              calle: empresaData.calle,
              pais: empresaData.pais,
              provincia: empresaData.provincia,
              poblacion: empresaData.poblacion,
              codigoPostal: empresaData.codigoPostal,
            },
          };
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }

        Swal.fire({
          icon: 'success',
          title: this.isEditMode ? 'Perfil actualizado' : '¡Registro exitoso!',
          text: this.isEditMode
            ? 'Los datos se han actualizado correctamente'
            : 'Empresa registrada correctamente.',
          confirmButtonText: this.isEditMode ? 'Aceptar' : 'Ir al login',
        }).then(() => {
          this.router.navigate([this.isEditMode ? '/empresa/home' : '/login']);
        });
      },
      error: (err) => {
        this.loading = false;
        let mensaje = 'Error en el proceso. Por favor, inténtalo de nuevo.';

        if (err.status === 404) {
          mensaje = 'Empresa con el CIF indicado no fue encontrada.';
        } else if (err.status === 409) {
          mensaje =
            err.error.mensaje ||
            'Ya existe un usuario con ese correo o la empresa ya está asignada.';
        }

        this.mostrarError(mensaje);
      },
    });
  }

  private isFormValid(): boolean {
    if (this.isEditMode) {
      const formValues = this.modelForm.value;
      const requiredFields = [
        'nombre',
        'apellidos',
        'email',
        'username',
        'fechaNacimiento',
        'telefono',
        'pais',
        'provincia',
        'poblacion',
        'codigoPostal',
        'calle',
        'fotoPerfil',
      ];

      const allRequiredFieldsValid = requiredFields.every(
        (field) => this.modelForm.get(field)?.valid
      );

      if (formValues.password?.trim() || formValues.confirmarPassword?.trim()) {
        return (
          allRequiredFieldsValid &&
          formValues.password === formValues.confirmarPassword &&
          formValues.password.length >= 6
        );
      }

      return allRequiredFieldsValid;
    }

    return this.modelForm.valid;
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

  private passwordsMatchValidator() {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get('password');
      const confirmPassword = formGroup.get('confirmarPassword');

      if (
        this.isEditMode &&
        !password?.value?.trim() &&
        !confirmPassword?.value?.trim()
      ) {
        return null;
      }

      if (password?.value?.trim() || confirmPassword?.value?.trim()) {
        if (password?.value !== confirmPassword?.value) {
          confirmPassword?.setErrors({ passwordMismatch: true });
          return { passwordMismatch: true };
        }
      }

      confirmPassword?.setErrors(null);
      return null;
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

  private mostrarErrorFormulario(): void {
    Swal.fire({
      icon: 'error',
      title: 'Formulario inválido',
      text: 'Por favor, revisa los campos y corrige los errores.',
      confirmButtonText: 'Aceptar',
      customClass: {
        confirmButton: 'btn btn-secondary',
      },
      buttonsStyling: false,
    });
  }
}
