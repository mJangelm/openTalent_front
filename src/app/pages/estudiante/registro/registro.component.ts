import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HeaderRegistroComponent } from '../../../layout/header-registro/header-registro.component';
import { RegistroEstudianteService } from '../../../services/registro-estudiante.service';
import { Estudiante } from '../../../interfaces/estudiante';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'], // Se corrigió "styleUrl" a "styleUrls"
})
export class RegistroComponent {
  modelForm: FormGroup;
  router = inject(Router);
  registroEstudiante = inject(RegistroEstudianteService);

  constructor() {
    // Se crea el FormGroup con los controles y validadores, incluyendo el validador de contraseñas
    this.modelForm = new FormGroup({
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
  }

  onFileChangePdf($event: Event) {
    const input = event?.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];

      //validamos que el archivo sea PDF
      if (file.type !== 'application/pdf') {
        this.modelForm.get('pdfFile')?.setErrors({ invalidFileType: true });
        return;
      }

      this.modelForm.patchValue({
        pdfFile: file,
      });
      this.modelForm.get('pdfFile')?.updateValueAndValidity();
    }
  }

  //La función onFileChange recibe un parámetro event de tipo Event. Este objeto contiene información
  //sobre el evento que se dispara cuando el usuario selecciona un archivo.
  //Se hace un casting a HTMLINputElement porque sabemos que el target del evento es un tipo input de tipo
  //file.
  //Esta línea obtiene el elemento input que disparó el evento.

  //Después verificamos que input exista y que tenga la propiedad files (una lista de archivos
  //seleccionados). Además se comprueba que al menos haya un archivo seleccionado.

  //el const file igual a input.files 0 quiere decir que el usuario solo selecciona un archivo,
  //por lo que se toma el primero de la lista (files[0]).
  //Si el archivo seleccionado no es un PDF, se establece un error.

  //El patchvalue se utiliza para actualizar el valor del control pdfFile.
  //el updatevalue hace que se reevalue los validadores del control pdfFile y actualice
  //su estado, por ejempo, para eliminar errores si el archivo es correcto.
  onFileChangeJpg(event: Event) {
    const input = event?.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];

      // Validamos que el archivo sea JPG, JPEG o PNG
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        this.modelForm.get('jpgFile')?.setErrors({ invalidFileType: true });
        return;
      }

      this.modelForm.patchValue({
        jpgFile: file,
      });
      this.modelForm.get('jpgFile')?.updateValueAndValidity();
    }
  }
  registro() {
    const registroDeEstudiante: Estudiante = this.modelForm.value as Estudiante;

    try {
      this.registroEstudiante.registro(registroDeEstudiante);
      console.log('Usuario registrado');
      this.router.navigate(['/login']);
    } catch (error) {
      alert('No se ha podido registrar');
    }
  }
}
