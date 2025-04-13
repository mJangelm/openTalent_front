import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/estudiante/registro/registro.component';
import { HomeEstudianteComponent } from './pages/estudiante/home-estudiante/home-estudiante.component';

export const routes: Routes = [
    
  // Ruta principal que muestra el login
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',  // Aseguramos que esta ruta sea la predeterminada
  },
  {
    path: 'registro',
    component: RegistroComponent,
  },

  // Ruta para el Home, solo accesible después de loguearse
  { 
    path: 'home',
    component: HomeComponent,
     // Aseguramos que solo accedan los usuarios autenticados
  },
  { 
    path: 'usuario/registro',
    component: RegistroComponent,
     // Aseguramos que solo accedan los usuarios autenticados
  },

  { 
    path: 'usuario/home',
    component: HomeEstudianteComponent,
     // Aseguramos que solo accedan los usuarios autenticados
  },

  // Redirigir cualquier ruta no válida al login
  { 
    path: '**',
    redirectTo: ''
  }
];
