// app.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MenuUsuarioComponent } from './components/usuario/menu-usuario/menu-usuario.component';
import { NavbarUsuarioComponent } from './components/usuario/navbar-usuario/navbar-usuario.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuUsuarioComponent, NavbarUsuarioComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  localUser: string | null = null;
  isMenuOpenHome = false;
  router = inject(Router);

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
