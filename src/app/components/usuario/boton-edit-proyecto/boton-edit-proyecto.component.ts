import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';

@Component({
  selector: 'app-boton-edit-proyecto',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './boton-edit-proyecto.component.html',
  styleUrl: './boton-edit-proyecto.component.css',
})
export class BotonEditProyectoComponent {
  @Input() _id!: number;

  private router = inject(Router);

  editarProyecto() {
    this.router.navigate(['/usuario/misproyectos/edit', this._id]);
  }
}
