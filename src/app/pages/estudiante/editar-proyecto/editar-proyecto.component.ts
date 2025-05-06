import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectoRequestI } from '../../../interfaces/proyecto-request-i';
import { ProyectosService } from '../../../services/proyectos.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-proyecto',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './editar-proyecto.component.html',
  styleUrl: './editar-proyecto.component.css',
})
export class EditarProyectoComponent {
  private activatedRouter = inject(ActivatedRoute);
  private router = inject(Router);
  private servicioProyectos = inject(ProyectosService);

  modelForm: FormGroup;
  private idProyecto!: number;
  private activoOriginal: boolean = true;

  constructor() {
    this.modelForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      fechaInicio: new FormControl('', [Validators.required]),
      fechaFin: new FormControl('', [Validators.required]),
      foto: new FormControl('', [Validators.required, Validators.minLength(3)]),
      fotoContenido: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      plazas: new FormControl(null, [Validators.required, Validators.min(1)]),
    });
  }

  ngOnInit(): void {
    const idParam = this.activatedRouter.snapshot.paramMap.get('_id');
    if (!idParam) {
      this.router.navigate(['/usuario/misproyectos']);
      return;
    }

    this.idProyecto = +idParam;

    this.servicioProyectos.getProyectoAEditarById(this.idProyecto).subscribe({
      next: (proj) => {
        const inicioStr = new Date(proj.fechaInicio).toISOString().slice(0, 10);
        const finStr = new Date(proj.fechaFin).toISOString().slice(0, 10);

        this.modelForm.patchValue({
          nombre: proj.nombre,
          descripcion: proj.descripcion,
          fechaInicio: inicioStr,
          fechaFin: finStr,
          foto: proj.foto,
          fotoContenido: proj.fotoContenido,
          plazas: proj.plazas,
        });

        this.activoOriginal = proj.activo ?? true;
      },
      error: (err) => {
        console.error('Error cargando proyecto:', err);
        this.router.navigate(['/usuario/misproyectos']);
      },
    });
  }

  onSubmit(): void {
    if (this.modelForm.invalid) {
      this.modelForm.markAllAsTouched();
      return;
    }

    const proyectoEditado: ProyectoRequestI = {
      idProyecto: this.idProyecto,
      nombre: this.modelForm.value.nombre!,
      descripcion: this.modelForm.value.descripcion!,
      fechaInicio: new Date(this.modelForm.value.fechaInicio!),
      fechaFin: new Date(this.modelForm.value.fechaFin!),
      foto: this.modelForm.value.foto!,
      fotoContenido: this.modelForm.value.fotoContenido!,
      plazas: this.modelForm.value.plazas!,
      activo: this.activoOriginal,
    };

    this.servicioProyectos.editarProyecto(proyectoEditado).subscribe({
      next: () => {
        Swal.fire({
          title: '¡Proyecto editado!',
          text: 'El proyecto se ha modificado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          this.router.navigate(['/usuario/home']);
        });
      },
      error: () => {
        Swal.fire({
          title: 'Error',
          text: 'No se ha podido modificar el proyecto.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      },
    });
  }

  volver(): void {
    this.router.navigate(['/usuario/misproyectos']);
  }
}
