import { Component, inject, OnInit } from '@angular/core';
import { NavbarUsuarioComponent } from '../../../components/usuario/navbar-usuario/navbar-usuario.component';
import { MenuUsuarioComponent } from '../../../components/usuario/menu-usuario/menu-usuario.component';
import { EmpresaService } from '../../../services/empresa.service';
import { Router, RouterOutlet } from '@angular/router';
import { Empresa } from '../../../interfaces/empresa';
import { EmpresasUsuarioCardComponent } from '../../../components/usuario/empresas-usuario-card/empresas-usuario-card.component';

@Component({
  selector: 'app-home-estudiante',
  imports: [EmpresasUsuarioCardComponent],
  standalone: true,
  templateUrl: './home-estudiante.component.html',
  styleUrl: './home-estudiante.component.css',
})
export class HomeEstudianteComponent {
  servicioEmpresas = inject(EmpresaService);
  router = inject(Router);
  arrEmpresas!: Empresa[];

  ngOnInit() {
    this.servicioEmpresas.getAllEmpresas().subscribe((response: any) => {
      this.arrEmpresas = response;
      console.log(response);
    });
  }
}
