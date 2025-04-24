import { Routes } from '@angular/router';
import { loginGuard } from './guards/login.guard';
import { HomeEstudianteComponent } from './pages/estudiante/home-estudiante/home-estudiante.component';
import { RegistroComponent } from './pages/estudiante/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroEmpresaComponent } from './pages/empresa/registro-empresa/registro-empresa.component';
import { OfertasComponent } from './pages/estudiante/ofertas/ofertas.component';
import { ListaEmpresasComponent } from './pages/estudiante/lista-empresas/lista-empresas.component';
import { OfertaViewComponent } from './pages/estudiante/oferta-view/oferta-view.component';
import { ProyectosComponent } from './pages/estudiante/proyectos/proyectos.component';
import { ProyectoViewComponent } from './pages/estudiante/proyecto-view/proyecto-view.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'registro',
    component: RegistroComponent,
  },
  {
    path: 'registroEmpresa',
    component: RegistroEmpresaComponent,
  },

  {
    path: 'usuario/registro',
    component: RegistroComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'usuario',
    canActivate: [loginGuard],
    data: { roles: ['USUARIO'] },
    children: [
      {
        path: 'ofertas',
        component: OfertasComponent,
        canActivate: [loginGuard], // Protege la ruta hija
        data: { roles: ['USUARIO'] },
      },
      {
        path: 'home',
        component: HomeEstudianteComponent,
        canActivate: [loginGuard], // Protege la ruta hija
        data: { roles: ['USUARIO'] },
      },
      {
        path: 'ofertas/:_id',
        component: OfertaViewComponent,
        canActivate: [loginGuard], // Protege la ruta hija
        data: { roles: ['USUARIO'] },
      },
      {
        path: 'proyectos',
        component: ProyectosComponent,
        canActivate: [loginGuard], 
        data: { roles: ['USUARIO'] },
      },
      {
        path: 'proyectos/:_id',
        component: ProyectoViewComponent,
        canActivate: [loginGuard], // Protege la ruta hija
        data: { roles: ['USUARIO'] },
      },
      
    ],
  },

  {
    path: '**',
    redirectTo: '',
  },
];
