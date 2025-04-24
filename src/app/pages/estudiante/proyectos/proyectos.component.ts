import { Component, inject } from '@angular/core';
import { ProyectosService } from '../../../services/proyectos.service';
import { Router } from '@angular/router';
import { Proyecto } from '../../../interfaces/proyecto';
import { ProyectosUsuarioCardComponent } from "../../../components/usuario/proyectos-usuario-card/proyectos-usuario-card.component";

@Component({
  selector: 'app-proyectos',
  imports: [ProyectosUsuarioCardComponent],
  standalone:true,
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css'
})
export class ProyectosComponent {
  servicioProyectos = inject(ProyectosService);
  router = inject(Router);
  arrProyectos! : Proyecto[];
  isMenuOpenHome: boolean = false;

toggleMenuHome() {
  this.isMenuOpenHome = !this.isMenuOpenHome;
}

ngOnInit() {
  
  
  this.servicioProyectos.getAllProyectos().subscribe((response:any) =>{
    this.arrProyectos = response;
    console.log(response)
  })
}

}
