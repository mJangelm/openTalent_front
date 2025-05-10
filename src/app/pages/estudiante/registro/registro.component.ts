// registro.component.ts
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

import { RegistroEstudianteService } from '../../../services/registro-estudiante.service';
import { RegistroEstudianteDto } from '../../../interfaces/registro-estudiante-dto';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  private router = inject(Router);
  private registroEstudiante = inject(RegistroEstudianteService);

  loading = false;

  modelForm = new FormGroup({
    nombre:            new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    apellidos:         new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    email:             new FormControl<string>('', [Validators.required, Validators.email]),
    username:          new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    password:          new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
    fechaNacimiento:   new FormControl<string>('', [Validators.required]),
    telefono:          new FormControl<string>('', [Validators.required]),
    pais:              new FormControl<string>('', [Validators.required]),
    calle:             new FormControl<string>('', [Validators.required]),
    poblacion:         new FormControl<string>('', [Validators.required]),
    codigoPostal:      new FormControl<string>('', [Validators.required]),
    provincia:         new FormControl<string>('', [Validators.required]),
    estudios:          new FormControl<string>('', [Validators.required]),
    experiencia:       new FormControl<string>('', [Validators.required]),
    cv:                new FormControl<string>(''),
    fotoPerfil:        new FormControl<string>(''),
    pdfFile:           new FormControl<File|null>(null),
    jpgFile:           new FormControl<File|null>(null),
  });

  registro(): void {
    if (this.modelForm.invalid) {
      this.modelForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const payload = this.modelForm.value as unknown as RegistroEstudianteDto;

    this.registroEstudiante.registro(payload).subscribe({
      next: () => {
        this.loading = false;
        this.mostrarExito(
          'Te has registrado correctamente.',
          () => this.router.navigate(['/login'])
        );
      },
      error: err => {
        this.loading = false;
        let mensaje = 'Error en el registro.';
        if (err.status === 400) {
          mensaje = 'Datos inválidos. Por favor verifica los campos.';
        } else if (err.status === 409) {
          mensaje = 'Este correo o nombre de usuario ya está en uso.';
        }
        this.mostrarError(mensaje);
      }
    });
  }

  onFileChangePdf(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    if (file.type !== 'application/pdf') {
      this.modelForm.get('pdfFile')?.setErrors({ invalidFileType: true });
      return;
    }
    this.modelForm.patchValue({ pdfFile: file });
  }

  onFileChangeJpg(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      this.modelForm.get('jpgFile')?.setErrors({ invalidFileType: true });
      return;
    }
    this.modelForm.patchValue({ jpgFile: file });
  }

  private mostrarError(msg: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: msg,
      confirmButtonText: 'Aceptar',
      customClass: { confirmButton: 'btn btn-secondary' },
      buttonsStyling: false
    });
  }

  private mostrarExito(msg: string, cb?: () => void): void {
    Swal.fire({
      icon: 'success',
      title: '¡Registro exitoso!',
      text: msg,
      confirmButtonText: 'Ir al login',
      customClass: { confirmButton: 'btn btn-secondary' },
      buttonsStyling: false
    }).then(res => {
      if (res.isConfirmed && cb) cb();
    });
  }
}
