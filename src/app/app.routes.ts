import { Routes } from '@angular/router';
import { loginGuard } from './guards/login.guard';
import { HomeEstudianteComponent } from './pages/estudiante/home-estudiante/home-estudiante.component';
import { RegistroComponent } from './pages/estudiante/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroEmpresaComponent } from './pages/empresa/registro-empresa/registro-empresa.component';
import { OfertasComponent } from './pages/estudiante/ofertas/ofertas.component';
import { OfertaViewComponent } from './pages/estudiante/oferta-view/oferta-view.component';
import { ProyectosComponent } from './pages/estudiante/proyectos/proyectos.component';
import { ProyectoViewComponent } from './pages/estudiante/proyecto-view/proyecto-view.component';
import { ListaOfertasFavComponent } from './pages/estudiante/favoritos/ofertasFavoritas/lista-ofertas-fav/lista-ofertas-fav.component';
import { EmpresaViewComponent } from './pages/estudiante/empresa-view/empresa-view.component';
import { EmpresaVistaPrincipalComponent } from './pages/empresa/empresa-vista-principal/empresa-vista-principal.component';
import { AnadirOfertaComponent } from './pages/empresa/anadir-oferta/anadir-oferta.component';
import { MisOfertasComponent } from './pages/empresa/mis-ofertas/mis-ofertas.component';
import { EditarPerfilComponent } from './components/usuario/editar-perfil/editar-perfil.component';
import { AnadirProyectoComponent } from './pages/estudiante/anadir-proyecto/anadir-proyecto.component';

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
        path: 'home',
        component: HomeEstudianteComponent,
        canActivate: [loginGuard],
        data: { roles: ['USUARIO'] },
      },
      {
        path: 'ofertas',
        data: { roles: ['USUARIO'] },
        canActivate: [loginGuard],
        children: [
          { path: '', component: OfertasComponent },
          { path: 'favoritas', component: ListaOfertasFavComponent },
          { path: ':_id', component: OfertaViewComponent },
        ],
      },
      {
        path: 'proyectos',
        data: { roles: ['USUARIO'] },
        canActivate: [loginGuard],
        children: [
          { path: '', component: ProyectosComponent },
          { path: ':_id', component: ProyectoViewComponent },
        ],
      },
      {
        path: 'anadirproyecto',
        data: { roles: ['USUARIO'] },
        canActivate: [loginGuard],
        component: AnadirProyectoComponent
      },
      {
        path: 'empresas',
        data: { roles: ['USUARIO'] },
        canActivate: [loginGuard],
        children: [{ path: ':cif', component: EmpresaViewComponent }],
      },
      {
        path: 'configuracion',
        data: { roles: ['USUARIO'] },
        canActivate: [loginGuard],
        component: EditarPerfilComponent,
      },
    ],
  },
  {
    path: 'empresa',
    data: { roles: ['EMPRESA'] },
    canActivate: [loginGuard],
    children: [
      {
        path: 'home',
        component: EmpresaVistaPrincipalComponent,
        data: { roles: ['EMPRESA'] },
        canActivate: [loginGuard],
      },
      {
        path: 'add',
        component: AnadirOfertaComponent,
        data: { roles: ['EMPRESA'] },
        canActivate: [loginGuard],
      },
      {
        path: 'ofertas',
        data: { roles: ['EMPRESA'] },
        canActivate: [loginGuard],
        component: MisOfertasComponent,
      },
      {
        path: 'configuracion',
        data: { roles: ['EMPRESA'] },
        canActivate: [loginGuard],
        component: EditarPerfilComponent,
      },
    ],
  },

  {
    path: '**',
    redirectTo: '',
  },
];
