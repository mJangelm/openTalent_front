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
import { EditUserService } from '../../../services/edit-user.service';
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
  private editUserService = inject(EditUserService);

  modelForm!: FormGroup;
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
        pais: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        provincia: new FormControl('', [Validators.minLength(3)]),
        poblacion: new FormControl('', [Validators.minLength(3)]),
        codigoPostal: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\d{5}$/),
        ]),
        calle: new FormControl('', [Validators.minLength(3)]),
        estudios: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ]),
        experiencia: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
        ]),
        cv: new FormControl({ value: '', disabled: true }),
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
        estudios: user.estudios,
        experiencia: user.experiencia,
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

    const userData = {
      ...formData,
      fechaNacimiento: new Date(formData.fechaNacimiento),
    };

    const action$ = this.isEditMode
      ? this.editUserService.editarPerfilEstudiante(userData)
      : this.registroEstudiante.registro(userData);

    action$.subscribe({
      next: (response) => {
        this.loading = false;

        // Si estamos en modo edición, actualizamos los datos en localStorage
        if (this.isEditMode) {
          const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
          const updatedUser = {
            ...currentUser,
            ...userData,
            // Mantenemos los campos que no se pueden editar
            rol: currentUser.rol,
            activo: currentUser.activo,
            fechaAlta: currentUser.fechaAlta,
            // Estructura la dirección
            direccion: {
              calle: userData.calle,
              pais: userData.pais,
              provincia: userData.provincia,
              poblacion: userData.poblacion,
              codigoPostal: userData.codigoPostal,
            },
          };
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }

        Swal.fire({
          icon: 'success',
          title: this.isEditMode ? 'Perfil actualizado' : '¡Registro exitoso!',
          text: this.isEditMode
            ? 'Los datos se han actualizado correctamente'
            : 'Te has registrado correctamente. Ya puedes iniciar sesión.',
          confirmButtonText: this.isEditMode ? 'Aceptar' : 'Ir al login',
        }).then(() => {
          this.router.navigate([this.isEditMode ? '/usuario/home' : '/login']);
        });
      },
      error: (err) => {
        this.loading = false;
        let mensaje = 'Error en el proceso. Por favor, inténtalo de nuevo.';

        if (err.status === 409) {
          mensaje = err.error.mensaje || 'Este usuario o email ya existe.';
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
        'estudios',
        'experiencia',
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

  private passwordsMatchValidator() {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get('password');
      const confirmPassword = formGroup.get('confirmarPassword');

      // Si estamos en modo edición y ambos campos están vacíos, no validamos
      if (
        this.isEditMode &&
        !password?.value?.trim() &&
        !confirmPassword?.value?.trim()
      ) {
        return null;
      }

      // Si hay al menos un campo con valor, validamos que coincidan
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
