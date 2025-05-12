import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IReview } from '../../interfaces/ireview';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-add-resenna',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-resenna.component.html',
  styleUrl: './add-resenna.component.css',
})
export class AddResennaComponent {
  resennaForm!: FormGroup;
  empresaCif: string = '';
  empresaNombre: string = '';
  puntuacion: number = 0;
  previewPuntuacion: number = 0;
  empresaService = inject(EmpresaService);

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    // Obtener parámetros de la URL
    this.route.queryParams.subscribe((params) => {
      this.empresaCif = params['empresaCif'] || '';
      this.empresaNombre = params['empresaNombre'] || '';

      if (!this.empresaCif) {
        // Si no hay CIF, redirigir a la página anterior
        this.router.navigate(['/usuario/home']);
      }
    });

    // Inicializar formulario
    this.resennaForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      comentario: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  // Método para previsualizar la puntuación al pasar el ratón
  previewRating(valor: number): void {
    this.previewPuntuacion = valor;
    this.updateStarsVisual();
  }

  // Método para restablecer la previsualización al quitar el ratón
  resetPreview(): void {
    this.previewPuntuacion = 0;
    this.updateStarsVisual();
  }

  // Método para establecer la puntuación
  setPuntuacion(valor: number): void {
    this.puntuacion = valor;
    this.updateStarsVisual();
  }

  // Método para actualizar visualmente las estrellas
  private updateStarsVisual(): void {
    const estrellas = document.querySelectorAll('.estrella');
    const valorActual =
      this.previewPuntuacion > 0 ? this.previewPuntuacion : this.puntuacion;

    estrellas.forEach((estrella, index) => {
      if (index < valorActual) {
        estrella.classList.add('seleccionada');
      } else {
        estrella.classList.remove('seleccionada');
      }
    });
  }

  // Método para enviar la reseña
  enviarResenna(): void {
    if (this.resennaForm.invalid) {
      this.resennaForm.markAllAsTouched();
      return;
    }

    if (this.puntuacion === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Puntuación requerida',
        text: 'Por favor, selecciona una puntuación para la empresa',
        confirmButtonColor: '#535AA6',
      });
      return;
    }

    // Datos de la reseña
    const resennaData: IReview = {
      titulo: this.resennaForm.get('titulo')?.value,
      comentario: this.resennaForm.get('comentario')?.value,
      puntuacion: this.puntuacion,
      cif: this.empresaCif,
    };

    this.empresaService.ponerResena(resennaData).subscribe();

    Swal.fire({
      icon: 'success',
      title: '¡Reseña enviada!',
      text: 'Tu reseña ha sido enviada correctamente.',
      confirmButtonColor: '#535AA6',
    }).then(() => {
      // Redirigir a la página de la empresa
      this.router.navigate(['/usuario/empresas', this.empresaCif]);
    });
  }

  // Método para volver a la página anterior
  volver(): void {
    this.router.navigate(['/usuario/empresas', this.empresaCif]);
  }
}
