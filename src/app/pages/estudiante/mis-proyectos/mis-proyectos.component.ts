import { Component, inject } from '@angular/core';
import { ProyectosUsuarioCardComponent } from "../../../components/usuario/proyectos-usuario-card/proyectos-usuario-card.component";
import { ProyectosService } from '../../../services/proyectos.service';
import { Router, RouterModule } from '@angular/router';
import { Proyecto } from '../../../interfaces/proyecto';

@Component({
  selector: 'app-mis-proyectos',
  imports: [ProyectosUsuarioCardComponent, RouterModule],
  standalone:true,
  templateUrl: './mis-proyectos.component.html',
  styleUrl: './mis-proyectos.component.css'
})
export class MisProyectosComponent {
  
  servicioProyectos = inject(ProyectosService);
  router = inject(Router);
  arrProyectos!: Proyecto[];
  isMenuOpenHome: boolean = false;
  editable: boolean = true;

  ngOnInit() {
    this.servicioProyectos.getMisProyectos().subscribe((response: any) => {
      this.arrProyectos = response;
      console.log(response);
    });
  }
}