import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarUsuarioComponent } from '../../../components/navbar-usuario/navbar-usuario.component';
import { MenuUsuarioComponent } from '../../../components/menu-usuario/menu-usuario.component';
import { EmpresaService } from '../../../services/empresa.service';
import { Router, RouterOutlet } from '@angular/router';
import { Empresa } from '../../../interfaces/empresa';
import { EmpresasUsuarioCardComponent } from '../../../components/empresas-usuario-card/empresas-usuario-card.component';

@Component({
  selector: 'app-home-estudiante',
  imports: [CommonModule, EmpresasUsuarioCardComponent],
  templateUrl: './home-estudiante.component.html',
  styleUrl: './home-estudiante.component.css',
})
export class HomeEstudianteComponent {
  servicioEmpresas = inject(EmpresaService);
  router = inject(Router);
  arrEmpresas!: Empresa[];
  isLoading = true;

  constructor() {
    this.arrEmpresas = [];
  }
  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.isLoading = true;
    Promise.all([this.loadEmpresas()]).finally(() => {
      this.isLoading = false;
    });
  }

  private loadEmpresas() {
    this.servicioEmpresas.getAllEmpresas().subscribe({
      next: (response: Empresa[]) => {
        this.arrEmpresas = response;
      },
      error: (error) => {
        console.error('Error al cargar empresas:', error);
      },
    });
  }
}
