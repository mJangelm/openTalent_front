import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-boton-edit-proyecto',
  imports: [RouterLink],
  standalone:true,
  templateUrl: './boton-edit-proyecto.component.html',
  styleUrl: './boton-edit-proyecto.component.css'
})
export class BotonEditProyectoComponent {
    @Input() _id! : number;

}
