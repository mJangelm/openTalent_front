// app.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MenuUsuarioComponent } from './components/usuario/menu-usuario/menu-usuario.component';
import { NavbarUsuarioComponent } from './components/usuario/navbar-usuario/navbar-usuario.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuUsuarioComponent, NavbarUsuarioComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  localUser: string | null = null;
  isMenuOpenHome = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Cada vez que cambie la URL (p.ej. tras un login)
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        this.localUser = localStorage.getItem('rol');
      });
  }

  //this.router.events => En Angular, el Router expone un observable llamado events
  //que emite cada vez que ocurre un evento de navegación (inicio de ruta, fin de ruta, error)
  //pipe ordena las operaciones.
  //filter rechaza todos los eventos que no sea instancias de la clase NavigationEnd.

  toggleMenuHome() {
    this.isMenuOpenHome = !this.isMenuOpenHome;
  }

  showNavbar(): boolean {
    const url = this.router.url;
    return (
      url.startsWith('/usuario') ||
      url.startsWith('/admin') ||
      url.startsWith('/empresa')
    );
  }
}
