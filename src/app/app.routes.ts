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
import { ListaOfertasFavComponent } from './pages/estudiante/ofertasFavoritas/lista-ofertas-fav.component';
import { EmpresaViewComponent } from './pages/estudiante/empresa-view/empresa-view.component';
import { EmpresaVistaPrincipalComponent } from './pages/empresa/empresa-vista-principal/empresa-vista-principal.component';
import { MisOfertasComponent } from './pages/empresa/mis-ofertas/mis-ofertas.component';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';
import { MisProyectosComponent } from './pages/estudiante/mis-proyectos/mis-proyectos.component';
import { MiOfertaPostulantesComponent } from './pages/empresa/mi-oferta-postulantes/mi-oferta-postulantes.component';
import { AddResennaComponent } from './pages/add-resenna/add-resenna.component';
import { SolicitudesComponent } from './pages/estudiante/solicitudes/solicitudes.component';
import { OfertaFormComponent } from './pages/empresa/oferta-form/oferta-form.component';
import { ProyectoFormComponent } from './pages/estudiante/proyecto-form/proyecto-form.component';

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
        path: 'review',
        component: AddResennaComponent,
        canActivate: [loginGuard],
        data: { roles: ['USUARIO'] },
      },

      {
        path: 'ofertas',
        data: { roles: ['USUARIO'] },
        canActivate: [loginGuard],
        children: [
          {
            path: '',
            component: OfertasComponent,
            data: { roles: ['USUARIO'] },
            canActivate: [loginGuard],
          },
          {
            path: 'favoritas',
            component: ListaOfertasFavComponent,
            data: { roles: ['USUARIO'] },
            canActivate: [loginGuard],
          },
          {
            path: ':_id',
            component: OfertaViewComponent,
            data: { roles: ['USUARIO'] },
            canActivate: [loginGuard],
          },
        ],
      },
      {
        path: 'proyectos',
        data: { roles: ['USUARIO'] },
        canActivate: [loginGuard],
        children: [
          {
            path: '',
            component: ProyectosComponent,
            data: { roles: ['USUARIO'] },
            canActivate: [loginGuard],
          },
          {
            path: 'add',
            data: { roles: ['USUARIO'] },
            canActivate: [loginGuard],
            component: ProyectoFormComponent,
          },
          {
            path: ':_id',
            component: ProyectoViewComponent,
            data: { roles: ['USUARIO'] },
            canActivate: [loginGuard],
          },
        ],
      },
      {
        path: 'misproyectos',
        data: { roles: ['USUARIO'] },
        canActivate: [loginGuard],
        children: [
          {
            path: '',
            component: MisProyectosComponent,
            data: { roles: ['USUARIO'] },
            canActivate: [loginGuard],
          },
          {
            path: 'edit/:_id',
            component: ProyectoFormComponent,
            data: { roles: ['USUARIO'] },
            canActivate: [loginGuard],
          },
          {
            path: 'postulantes/:_id',
            data: { roles: ['USUARIO'] },
            canActivate: [loginGuard],
            component: SolicitudesComponent,
          },
        ],
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
        component: RegistroComponent,
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
        component: OfertaFormComponent,
        data: { roles: ['EMPRESA'] },
        canActivate: [loginGuard],
      },
      {
        path: 'ofertas',
        data: { roles: ['EMPRESA'] },
        canActivate: [loginGuard],
        children: [
          {
            path: '',
            data: { roles: ['EMPRESA'] },
            canActivate: [loginGuard],
            component: MisOfertasComponent,
          },
          {
            path: 'verpostulantes/:idOferta',
            data: { roles: ['EMPRESA'] },
            canActivate: [loginGuard],
            component: MiOfertaPostulantesComponent,
          },
          {
            path: 'edit/:idOferta',
            data: { roles: ['EMPRESA'] },
            canActivate: [loginGuard],
            component: OfertaFormComponent,
          },
        ],
      },

      {
        path: 'configuracion',
        data: { roles: ['EMPRESA'] },
        canActivate: [loginGuard],
        component: RegistroEmpresaComponent,
      },
    ],
  },

  {
    path: '**',
    redirectTo: '',
  },
];
