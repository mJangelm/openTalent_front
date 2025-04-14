import { Routes } from '@angular/router';
import { loginGuard } from './guards/login.guard';
import { HomeEstudianteComponent } from './pages/estudiante/home-estudiante/home-estudiante.component';
import { RegistroComponent } from './pages/estudiante/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroEmpresaComponent } from './pages/empresa/registro-empresa/registro-empresa.component';
import { OfertasComponent } from './pages/estudiante/ofertas/ofertas.component';
import { ListaEmpresasComponent } from './pages/estudiante/lista-empresas/lista-empresas.component';

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
    path: 'usuario/home',
    component: HomeEstudianteComponent,
    canActivate: [loginGuard],
    data: { roles: ['ADMIN', 'USUARIO'] },
    children:  [ 
      {     
      path: 'ofertas',
      component: OfertasComponent
      },
      {     
      path: '',
      component: ListaEmpresasComponent
      }
    ]
    },

  
  {
    path: '**',
    redirectTo: ''
  }
];
