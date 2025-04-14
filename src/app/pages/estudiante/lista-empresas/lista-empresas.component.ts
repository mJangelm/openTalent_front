import { Component, inject } from '@angular/core';
import { Empresa } from '../../../interfaces/empresa';
import { EmpresasUsuarioCardComponent } from '../../../components/usuario/empresas-usuario-card/empresas-usuario-card.component';
import { EmpresaService } from '../../../services/empresa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-empresas',
  imports: [EmpresasUsuarioCardComponent],
  standalone: true,
  templateUrl: './lista-empresas.component.html',
  styleUrl: './lista-empresas.component.css'
})
export class ListaEmpresasComponent {
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
