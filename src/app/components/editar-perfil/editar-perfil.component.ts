import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmpresaRegistroDto } from '../../interfaces/empresa-registro-dto';
import { EditUserService } from '../../services/edit-user.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Estudiante } from '../../interfaces/estudiante';
import { RegistroEstudianteDto } from '../../interfaces/registro-estudiante-dto';

@Component({
  selector: 'app-editar-perfil',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css',
})
export class EditarPerfilComponent {
  rol: string = localStorage.getItem('rol') || '';
  router = inject(Router);
  loading = false;
  editPerfilService = inject(EditUserService);

  userEstudiante!: Estudiante;
  modelForm = new FormGroup({
    nombre: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    apellidos: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    username: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
    fechaNacimiento: new FormControl(null, [Validators.required]),
    telefono: new FormControl(null, [Validators.required]),
    pais: new FormControl(null, [Validators.required]),
    calle: new FormControl(null, [Validators.required]),
    poblacion: new FormControl(null, [Validators.required]),
    codigoPostal: new FormControl(null, [Validators.required]),
    provincia: new FormControl(null, [Validators.required]),
    estudios: new FormControl(null, [Validators.required]),
    experiencia: new FormControl(null, [Validators.required]),
    cv: new FormControl(null),
    fotoPerfil: new FormControl(null),
  });

  userEmpresa!: EmpresaRegistroDto;

  registroForm = new FormGroup(
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
      // cif:               new FormControl('', Validators.required),
    },
    {
      validators: this.passwordsMatchValidator.bind(this),
    }
  );

  constructor() {}

  ngOnInit() {
    if (this.rol === 'EMPRESA') {
      const stored = localStorage.getItem('user');
      if (!stored) return;

      if (stored) {
        const user = JSON.parse(stored);

        this.registroForm.patchValue({
          // raiz
          nombre: user.nombre,
          apellido: user.apellidos, // de apellidos → apellido
          email: user.email,
          username: user.username,
          fotoPerfil: user.fotoPerfil,
          //   cif: user.cif ?? user.empresaCif ?? '',
          telefono: user.telefono ?? '',
          fechaNacimiento: user.fechaNacimiento
            ? new Date(user.fechaNacimiento).toISOString().substring(0, 10)
            : '',

          // campos de direccion
          calle: user.direccion?.calle ?? '',
          pais: user.direccion?.pais ?? '',
          provincia: user.direccion?.provincia ?? '',
          poblacion: user.direccion?.poblacion ?? '',
          codigoPostal: user.direccion?.codigoPostal ?? '',
        });
      }
    } else if (this.rol === 'USUARIO') {
      const stored = localStorage.getItem('user');
      if (!stored) return;

      if (stored) {
        const user = JSON.parse(stored);
        console.log(user);

        this.modelForm.patchValue({
          // raiz
          nombre: user.nombre,
          apellidos: user.apellidos, // de apellidos → apellido
          email: user.email,
          username: user.username,
          fotoPerfil: user.fotoPerfil,
          telefono: user.telefono ?? '',
          fechaNacimiento: user.fechaNacimiento,
          cv: user.cv,
          experiencia: user.experiencia,
          estudios: user.estudios,

          // campos de direccion
          calle: user.direccion?.calle ?? '',
          pais: user.direccion?.pais ?? '',
          provincia: user.direccion?.provincia ?? '',
          poblacion: user.direccion?.poblacion ?? '',
          codigoPostal: user.direccion?.codigoPostal ?? '',
        });
      }
    }
  }

  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmar = group.get('confirmarPassword')?.value;
    return password === confirmar ? null : { passwordsMismatch: true };
  }
  onSubmit() {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }
    const {
      nombre,
      apellido,
      email,
      password,
      fechaNacimiento,
      telefono,
      username,
      pais,
      provincia,
      poblacion,
      calle,
      codigoPostal,
      fotoPerfil,
      // cif
    } = this.registroForm.value;

    const edicionPerfilEmpresa: EmpresaRegistroDto = {
      nombre: nombre ?? '',
      apellido: apellido ?? '',
      email: email ?? '',
      password: password ?? '',
      // si no hay fecha, asigna hoy o lanza error según tu lógica
      fechaNacimiento: fechaNacimiento ? new Date(fechaNacimiento) : new Date(),
      telefono: telefono ?? '',
      username: username ?? '',
      pais: pais ?? '',
      provincia: provincia ?? '',
      poblacion: poblacion ?? '',
      calle: calle ?? '',
      codigoPostal: codigoPostal ?? '',
      fotoPerfil: fotoPerfil ?? '',
      // cif:               cif             ?? ''
    };

    this.editPerfilService
      .editarPerfilEmpresaUser(edicionPerfilEmpresa)
      .subscribe({
        next: (resp) => {
          Swal.fire({
            title: 'Usuario actualizado',
            text: 'Información actualizada con éxito',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          }).then(() => {
            this.router.navigate(['empresa/home']);
          });
        },
        error: (err) => {
          Swal.fire({
            title: 'Error',
            text: 'No se ha podido actualizar el usuario',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        },
      });
  }

  actualizarEstudiante() {
    console.log('hola');
    if (this.modelForm.invalid) {
      console.log('invalido');
      Object.keys(this.modelForm.controls).forEach((key) => {
        const control = this.modelForm.get(key)!;
        if (control.invalid) {
          console.log(`Control "${key}" inválido:`, control.errors);
        }
      });
      this.modelForm.markAllAsTouched();
      return;
    }

    const registroDeEstudiante: RegistroEstudianteDto = this.modelForm
      .value as unknown as RegistroEstudianteDto;

    this.editPerfilService
      .editarPerfilEstudiante(registroDeEstudiante)
      .subscribe({
        next: (resp) => {
          Swal.fire({
            title: 'Usuario actualizado',
            text: 'Información actualizada con éxito',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          }).then(() => {
            this.router.navigate(['usuario/home']);
          });
        },
        error: (err) => {
          Swal.fire({
            title: 'Error',
            text: 'No se ha podido actualizar el usuario',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        },
      });
  }

  volver() {
    this.router.navigate(['empresa/home']);
  }
}
