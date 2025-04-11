import { Component, inject, OnInit } from '@angular/core';
import { NavbarUsuarioComponent } from '../../../components/usuario/navbar-usuario/navbar-usuario.component';
import { MenuUsuarioComponent } from '../../../components/usuario/menu-usuario/menu-usuario.component';
import { EmpresaService } from '../../../services/empresa.service';
import { Router } from '@angular/router';
import { Empresa } from '../../../interfaces/empresa';
import { EmpresasUsuarioCardComponent } from "../../../components/usuario/empresas-usuario-card/empresas-usuario-card.component";

@Component({
  selector: 'app-home-estudiante',
  imports: [NavbarUsuarioComponent, MenuUsuarioComponent, EmpresasUsuarioCardComponent],
  standalone:true,
  templateUrl: './home-estudiante.component.html',
  styleUrl: './home-estudiante.component.css'
})
export class HomeEstudianteComponent implements OnInit {

servicioEmpresas = inject(EmpresaService);
router = inject(Router);
arrEmpresas! : Empresa[];
isMenuOpenHome: boolean = false;
toggleMenuHome() {
  this.isMenuOpenHome = !this.isMenuOpenHome;
}


ngOnInit() {
  this.servicioEmpresas.getAllEmpresas().subscribe((response:any) =>{
    this.arrEmpresas = response;
    console.log(response)
  })
}
}
